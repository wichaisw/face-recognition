const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '2359209e1dd240c5b8a1ad9a9c7c0dad'
});

const clarifaiApiCall = (req, res) => {
  app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input) //Clarifai.FACE_DETECT_MODEL
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

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
  updateEntries,
  clarifaiApiCall
}