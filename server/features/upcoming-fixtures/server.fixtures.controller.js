'use strict'

let rp = require('request-promise');

module.exports = {

  getFixtures: (req, res) => {
    let league = req.query.league;

    // UPDATE LEAGUE IDs for 2017/18 seasons (9.19.2017) //
    switch(league) {
      case '436': // la liga
        league = '455';
        break;
      case '430': // bundesliga
        league = '452';
        break;
      case '433':
        league = '449'; // eredivisie
        break;
      case '426': // premier league
        league = '445';
        break;
      case '438': // serie a
        league = '456';
        break;
      case '439': // portugal primeira
        league = '457';
        break;
      case '434': // ligue 1
        league = '450';
        break;
      case '440': // champions league
        league = '464';
        break;
    }

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