'use strict';

let rp      = require('request-promise');
let cheerio = require('cheerio');

module.exports = {

  getTopScorers: (req, res) => {
    let leagueCode = req.params.league;

    // SET URL TO GET DATA FROM //
    let leagueUrl;
    if (leagueCode === 'ce15ltey') {
      leagueUrl = 'http://www.bbc.com/sport/football/premier-league/top-scorers';
    } else if (leagueCode === 'daaqk8d0') {
      leagueUrl = 'http://www.bbc.com/sport/football/spanish-la-liga/top-scorers';
    } else if (leagueCode === '3vb8ywkg') {
      leagueUrl = 'http://www.bbc.com/sport/football/german-bundesliga/top-scorers';
    } else if (leagueCode === 'a71bgaeg') {
      leagueUrl = 'http://www.bbc.com/sport/football/dutch-eredivisie/top-scorers';
    } else if (leagueCode === 'dp2cqh4g') {
      leagueUrl = 'http://www.bbc.com/sport/football/italian-serie-a/top-scorers';
    } else if (leagueCode === 'adx5ccsw') {
      leagueUrl = 'http://www.bbc.com/sport/football/portuguese-primeira-liga/top-scorers';
    } else if (leagueCode === '4j8yjehk') {
      leagueUrl = 'http://www.bbc.com/sport/football/french-ligue-one/top-scorers';
    } else if (leagueCode === 'dirj8dru') {
      leagueUrl = 'http://www.bbc.com/sport/football/champions-league/top-scorers';
    }

    // ARRAYS FOR DATA //
    let teams         = [];
    let rankings      = [];
    let goals         = [];
    let matchesPlayed = [];
    let names         = [];


    let options = {
      uri: leagueUrl,
      transform: body => {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(($) => {

        let name, team, rank, g;

        // FIND PLAYER NAME //
        $('.top-player-stats__name').filter(function () {
          let data = $(this);
          name     = data.text();
          names.push(name);
        });

        // FIND TEAM //
        $('.team-short-name').filter(function () {
          let data = $(this);
          team     = data.text();
          teams.push(team);
        });

        // FIND NUMBER OF GOALS SCORED //
        $('.top-player-stats__goals-scored-number').filter(function () {
          let data = $(this);
          g        = data.text();
          goals.push(g);
        });

        // REMOVE 1ST ITEM FROM ARRAYS AND MERGE DATA INTO AN ARRAY OF OBJECTS//
        // rankings.splice(0, 1);
        // matchesPlayed.splice(0, 1);
        // goals.splice(0, 1);
        // // penalties.splice(0, 1);
        // teams.splice(0, 1);
        // names.splice(0, 1);

        let results = [];

        teams.forEach(e => {
          results.push({
            team: e
          })
        });

        for (let i = 0; i < rankings.length; i++) {
          results.forEach(e => {
            e['rank'] = rankings[i];
            rankings.splice(i, 1);
          })
        }

        for (let i = 0; i < matchesPlayed.length; i++) {
          results.forEach(e => {
            e['matchesPlayed'] = matchesPlayed[i];
            matchesPlayed.splice(i, 1);
          })
        }

        for (let i = 0; i < goals.length; i++) {
          results.forEach(e => {
            e['goals'] = goals[i];
            goals.splice(i, 1);
          })
        }

        for (let i = 0; i < names.length; i++) {
          results.forEach(e => {
            e['name'] = names[i];
            names.splice(i, 1);
          })
        }

        // for (let i = 0; i < penalties.length; i++) {
        //   results.forEach(e => {
        //     e['penalties'] = penalties[i];
        //     penalties.splice(i, 1);
        //   })
        // }
        // console.log(results);
        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })

  }

};