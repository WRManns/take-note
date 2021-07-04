const dbstore = require('../db/dbstore');

module.exports = (app) =>{
//GET '/api/notes' and gets all the notes stored within
app.get('/notes', (req,res) => {
    dbstore
        .getNotes()
        .then((note) => res.json(note))
        .catch((err) => res.status(300).json(err));
});

//POST notes to the dbstore
app.post('/notes', (req,res) => {
    dbstore
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//Deletes notes by id from database storage
app.delete('/notes/:id', (res,req) => {
    dbstore
    .removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});
};

