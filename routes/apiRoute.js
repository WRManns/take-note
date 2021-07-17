const dbstore = require('../db/dbstore');
const router = require('express').Router();


//GET '/api/notes' and gets all the notes stored within
router.get('/notes', (req,res) => {
    dbstore
        .getNote()
        .then((note) =>{
            return res.json(note);
        })
        .catch((err) => res.status(300).json(err));
});

//POST notes to the dbstore
router.post('/notes', (req,res) => {
    dbstore
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//Deletes notes by id from dbstorage
router.delete('/notes/:id', (req,res) => {
    dbstore
    .deleteNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

