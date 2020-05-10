const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'face_recognition'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', async (req, res) => {
  const users = await db.select('*').from('users');
  res.status(200).json(users);
})

app.post('/signin', (req, res) => {
  // ไม่ต้องทำ transaction เพราะแค่ เช็กข้อมูล ไม่ได้แก้ไขฐานข้อมูล
  db.select('email', 'hash').from('login')
    .where({email: req.body.email})                                            // เช็กอีเมล์
    // .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);    // เช็กพาสเวิร์ด
      console.log(isValid)
      if(isValid) {
        return db.select('*').from('users')
          .where({email: req.body.email})
          .then(user => {
            res.status(200).json(user[0]);
          })
          .catch(err => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('wrong credentials');      // กรณีพาสเวิร์ดผิด
      }

    })
    .catch(err => res.status(400).json('wrong credentials'));
});

/* send function sets the content type to text/Html which means that the client will now treat it as text. It then returns the response to the client. The res. json function, on the other hand, sets the content-type header to application/JSON so that the client treats the response string as a valid JSON object
*/

app.post('/register', (req,res) => {
  const { email, name, password } = req.body
  const hash = bcrypt.hashSync(password, 12);

  // ใช้ trx แทน db ใน transaction ถ้าอะไรผิดพลาดก็ rollback ทั้งหมด
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email, email
    })
    .into('login')
    .returning('email')  // คืน resolve promise ให้ .then(loginEmail)
    .then(loginEmail => { 
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.status(201).json(user[0]);  // there should only be one registering user at a time so we use index [0] to select object in the array instead of respond with a whole object
        }) 
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })

  .catch(err => {
    res.status(400).json('unable to register') // don't response with err becuz we shouldn't give user any information about our server
  });

});

app.get('/profile/:id', async (req, res) => {
  try {
    const selectedUser = await db.select('*').from('users').where({id: req.params.id});
    // db('users').where({id: req.params.id}).select('*');

    if(selectedUser.length) {
      found = true;
      return res.status(200).json(selectedUser[0]); // params id เลือก user เดียวอยู่แล้ว เลยใส่ [0] เพื่อเลือก array ใน obj
    } else {
      return res.status(404).send('Not Found');
    }
  } catch(err) {
    res.status(400).send('error getting user');
  }

});

app.put('/image', async (req, res) => {
  try {
    const updatedEntries = await db('users')
      .where( 'id', '=', req.body.id )
      .increment('entries', 1)
      .returning('entries')

    res.status(201).json(updatedEntries[0]);
  } catch(err) {
    res.status(400).send('unable to update entries');
  }
    
});


app.listen(8000, () => {
  console.log('server is running on port 8000');
});

/*
/ --> res = this is working
/sigin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET user
/image --> PUT --> user (rank will go up when upload photo)


*/