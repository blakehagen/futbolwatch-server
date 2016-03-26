'use strict';

// REQUIRES //
let babel      = require('babel-core');
let express    = require('express');
let bodyParser = require('body-parser');
let cors       = require('cors');

// EXPRESS //
let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ROUTES //
require('./server/router/server.routes.js')(app);

// CONNECT TO FRONT //
app.use(express.static(__dirname + '/public'));

// PORT //
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('The party is at port ' + port);
});

