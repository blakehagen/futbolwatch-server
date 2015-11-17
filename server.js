var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var cors = require('cors');
var parseString = require('xml2js')

var MainCtrl = require('./controllers/mainCtrl');

var app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(function(req, res, next) {
    res.header({'Access-Control-Allow-Origin': '*'});
    next();
});

app.get('/data', MainCtrl.getData);


app.listen(3000, function () {
    console.log('Listening on port 3000!');
});