'use strict';

let rp = require('request-promise');

module.exports = {

  getLeagueStandings: (req, res) => {

    let league = req.params.league;

    let options = {
      uri: 'http://api.football-data.org/alpha/soccerseasons/' + league + '/leagueTable',
      headers: {'X-Auth-Token': '57d24f023e8247aea4badd00e37328dc'},
      json: true
    };
    rp(options).then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
      });
  }

};

