const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const registerController = require('./controllers/register');
const signInController = require('./controllers/signIn');
const profileController = require('./controllers/profile');
const imageController = require('./controllers/image');

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
/* send function sets the content type to text/Html which means that the client will now treat it as text. It then returns the response to the client. The res. json function, on the other hand, sets the content-type header to application/JSON so that the client treats the response string as a valid JSON object
*/

// dependency injection ใส่เป็น argument หลัง req, res ทำให้ไม่ต้อง import ในไฟล์ register.js
app.post('/signin', (req, res) => signInController.handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => registerController.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profileController.getProfile(req, res, db));
app.put('/image', (req, res) => imageController.updateEntries(req, res, db));
app.post('/imageurl', (req, res) => imageController.clarifaiApiCall(req, res))

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