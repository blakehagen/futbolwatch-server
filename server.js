var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var cors = require('cors');
var parseString = require('xml2js');

var MainCtrl = require('./controllers/mainCtrl');

var app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));


app.get('/data', MainCtrl.getData);

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listening on port ' + port);
});