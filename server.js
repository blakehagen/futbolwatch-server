var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var cors = require('cors');
var parseString = require('xml2js');

var MainCtrl = require('./controllers/mainCtrl');

var app = express();

app.use(bodyParser.json());

// app.use(cors());
var corsOptions = {
  origin: 'https://blakehagen.github.io'
};

app.use(express.static(__dirname + '/public'));


app.get('/test', function(req, res, next){
    res.status(200).send('Server is good to go!')
});

app.get('/results', cors(corsOptions), MainCtrl.getResults);
app.get('/fixtures', cors(corsOptions), MainCtrl.getFixtures);

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listening on port ' + port);
});