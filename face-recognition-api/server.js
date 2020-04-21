const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const db = {
  users: [
    {
      id: '01',
      name: 'Josh',
      email: 'josh@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '02',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'banana',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.status(200).json('this is working\n' + JSON.stringify(db.users, null , '\t'))
})

app.post('/signin', (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare("kokonut", '$2a$10$nb138ZDYLlXuWcZkzDz9z.kfHyIa6Qw5LGswbbNYEnhudcLdpJ6HG', function(err, res) {
    console.log('first guess', res)
    // res === true
  });
  bcrypt.compare("not_bacon", '$2a$10$nb138ZDYLlXuWcZkzDz9z.kfHyIa6Qw5LGswbbNYEnhudcLdpJ6HG', function(err, res) {
    console.log('second guess', res)
    // res === false
  });


  if (req.body.email === db.users[0].email && 
    req.body.password === db.users[0].password) {
      res.status(200).json('signin success');
    } else {
      console.log(db.users)
      res.status(400).json('email or password is wrong');
    }
});

/* send function sets the content type to text/Html which means that the client will now treat it as text. It then returns the response to the client. The res. json function on the other handsets the content-type header to application/JSON so that the client treats the response string as a valid JSON object
*/

app.post('/register', (req,res) => {
  const { email, name, password } = req.body
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        console.log(hash)
    });
  });
  db.users.push(
    {
      id: '05',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    }
  );
  console.log(db.users)
  console.log(db)
  res.json(db.users[db.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
  let found = false;
  db.users.forEach(user => {
    if(user.id === req.params.id) {
      found = true;
      return res.status(200).json(user);
    } 
  });
  if (!found) {
    res.status(404).send('not found');
  }
});

app.put('/image', (req, res) => {
  let found = false;
  db.users.forEach(user => {
    if(user.id === req.body.id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).send('not found');
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