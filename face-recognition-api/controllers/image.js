const updateEntries = async (req, res, db) => {
  try {
    const updatedEntries = await db('users')
      .where( 'id', '=', req.body.id )
      .increment('entries', 1)
      .returning('entries')

    res.status(201).json(updatedEntries[0]);
  } catch(err) {
    res.status(400).send('unable to update entries');
  }
    
}

module.exports = {
  updateEntries
}