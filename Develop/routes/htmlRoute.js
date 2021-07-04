//Listing dependencies
const path = require('path');


module.exports = (app) => {
    // => HTML GET Requests
    app.get('/tables', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
    // If no matching route is found default to home
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  };
  