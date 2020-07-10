const Clarifai = require('clarifai');


// Clarifai API key
const app = new Clarifai.App({
    apiKey: '52178bdd052b404bacc099f514b720ec'
   });

const handleApiCall = (req, res) => { // no req.body.input generated?
    res.json("no value");
    app.models
        .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

   

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