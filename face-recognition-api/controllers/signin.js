const handleSignIn = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if(!email || !name || !password) {
    return res.status(400).json('username or password is incorrect');
  }

  // ไม่ต้องทำ transaction เพราะแค่ เช็กข้อมูล ไม่ได้แก้ไขฐานข้อมูล
  db.select('email', 'hash').from('login')
    .where({email: email})                                            // เช็กอีเมล์
    // .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);    // เช็กพาสเวิร์ด
      console.log(isValid)
      if(isValid) {
        return db.select('*').from('users')
          .where({email: email})
          .then(user => {
            res.status(200).json(user[0]);
          })
          .catch(err => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('wrong credentials');      // กรณีพาสเวิร์ดผิด
      }

    })
    .catch(err => res.status(400).json('wrong credentials'));
}

module.exports = {
  handleSignIn: handleSignIn
}