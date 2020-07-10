const Clarifai = require('clarifai');


// Clarifai API key
const app = new Clarifai.App({
    apiKey: '6fa4f342bf3b495fa4d94417d789d5c4'
   });

const handleApiCall = (req, res) => { 
    // app.models
    //     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => res.status(400).json('unable to work with API'))
    app.models
        .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json(err));
}

// I can access server and database.
// 

   

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id) // SQL
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}