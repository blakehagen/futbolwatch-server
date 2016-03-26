'use strict'

let rp = require('request-promise');

module.exports = {

  getFixtures: (req, res) => {
    let league = req.query.league;

    let options = {
      uri: 'http://api.football-data.org/alpha/soccerseasons/' + league + '/fixtures/?timeFrame=n21',
      headers: {'X-Auth-Token': '57d24f023e8247aea4badd00e37328dc'},
      json: true
    };
    rp(options).then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log('GET Request Failed!');
      });
  }
};