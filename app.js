const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-Parser');
const app = express();
const path = require('path');
const config = require('./config/config');
const ProductRoutes = require('./router/product');

app.use(express.static(__dirname));

// connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection opened');
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//route Product
app.use('/api', ProductRoutes);

var port = config.port;
//Start the server
app.listen(port, () => {
    console.log('Server Started on port ', port);
 });

 module.exports = {
    express: express
};
