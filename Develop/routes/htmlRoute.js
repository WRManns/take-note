//Listing dependencies
const path = require('path');
const router = require('express').Router();


    // => HTML GET Requests
    router.get('/tables', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
    // If no matching route is found default to home
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

module.exports = router;
  