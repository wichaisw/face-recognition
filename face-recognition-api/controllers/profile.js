const getProfile = async (req, res, db) => {
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

}

module.exports = {
  getProfile
}