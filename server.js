'use strict';

// REQUIRES //
let babel      = require('babel-core');
let express    = require('express');
let bodyParser = require('body-parser');
let rp         = require('request-promise');
let cors       = require('cors');

let MainCtrl = require('./controllers/mainCtrl');

// EXPRESS //
let app = express();

app.use(cors());
let corsOptions = {
  origin: 'https://blakehagen.github.io'
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CONNECT TO FRONT //
app.use(express.static(__dirname + '/public'));


// ROUTES //
app.get('/test', (req, res, next) => {
  res.status(200).send('Server is good to go!')
});

app.get('/results', cors(corsOptions), MainCtrl.getResults);
app.get('/fixtures', cors(corsOptions), MainCtrl.getFixtures);

// PORT //
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('The party is starting on port ' + port);
});

