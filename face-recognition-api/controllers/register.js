const handleRegister = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body
  const hash = bcrypt.hashSync(password, 12);

  const existedEmail = await db.select('*').from('users').where({email: req.body.email})
  console.log(existedEmail[0])
  if (existedEmail[0]) {
    res.status(400).json('This email is already existed.')
  } else {
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
  }
}

module.exports = {
  handleRegister: handleRegister
}