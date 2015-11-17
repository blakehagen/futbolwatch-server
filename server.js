var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
// var cors = require('cors');
var parseString = require('xml2js')

var MainCtrl = require('./controllers/mainCtrl');

var app = express();

app.use(bodyParser.json());

// app.use(cors());
var cors = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
}


app.get('/data', MainCtrl.getData);


app.listen(3000, function () {
    console.log('Listening on port 3000!');
});