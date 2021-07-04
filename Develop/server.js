const express = require('express');
const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use('/api', apiRoute);
app.use('/html', htmlRoute);


//Makes the server listen to the port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));