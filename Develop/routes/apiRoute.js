const router = require('express').Router();
const dbstore = require('../db/dbstore');

//GET '/api/notes' and gets all the notes stored within
router.get('/notes', (req,res) => {
    dbstore
        .getNotes()
        .then((note) => res.json(note))
        .catch((err) => res.status(300).json(err));
});

//POST notes to the dbstore
router.post('/notes', (req,res) => {
    dbstore
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//Deletes notes by id from database storage
router.delete('/notes/:id', (res,req) => {
    dbstore
    .removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;