'use strict'

let resultsCtrl   = require('../features/match-results/server.results.controller');
let fixturesCtrl  = require('../features/upcoming-fixtures/server.fixtures.controller');
let standingsCtrl = require('../features/league-standings/server.standings.controller');

// let scorersCtrl   = require('../features/top-scorers/server.scorers.controller');


module.exports = (app) => {

  // TEST ROUTE //
  app.get('/test', (req, res) => {
    res.status(200).send('Server is good to go!')
  });

  // REAL ROUTES //
  app.route('/results')
    .get(resultsCtrl.getResults); // GET PREVIOUS MATCH RESULTS

  app.route('/fixtures')
    .get(fixturesCtrl.getFixtures); // GET UPCOMING FIXTURES

  app.route('/standings/:league')
    .get(standingsCtrl.getLeagueStandings); // GET LEAGUE STANDINGS

};