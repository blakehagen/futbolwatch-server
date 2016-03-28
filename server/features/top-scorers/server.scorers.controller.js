'use strict';

let rp      = require('request-promise');
let cheerio = require('cheerio');

module.exports = {

  getTopScorers: (req, res) => {
    let leagueCode = req.params.league;

    // SET URL TO GET DATA FROM //
    let leagueUrl;
    if (leagueCode === 'ce15ltey') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=england-premier-league-2000000000/top-scorers/index.html';
    } else if (leagueCode === 'daaqk8d0') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=spain-liga-2000000037/top-scorers/index.html';
    } else if (leagueCode === '3vb8ywkg') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=germany-bundesliga-2000000019/top-scorers/index.html';
    } else if (leagueCode === 'a71bgaeg') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=netherlands-eredivisie-2000000022/top-scorers/index.html';
    } else if (leagueCode === 'dp2cqh4g') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=italy-serie-a-2000000026/top-scorers/index.html';
    } else if (leagueCode === 'adx5ccsw') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=portugal-liga-2000000033/top-scorers/index.html';
    } else if (leagueCode === '4j8yjehk') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=france-ligue-1-2000000018/top-scorers/index.html';
    } else if (leagueCode === 'dirj8dru') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/uefachampionsleague/top-scorers/index.html';
    }

    // ARRAYS FOR DATA //
    let teams         = [];
    let rankings      = [];
    let goals         = [];
    let penalties     = [];
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

        let name, team, rank, g, p, mp;

        // FIND PLAYER NAME //
        $('.player').filter(function () {
          let data = $(this);
          name     = data.text();
          names.push(name);
        });

        // FIND TEAM //
        $('.team').filter(function () {
          let data = $(this);
          team     = data.text();
          teams.push(team);
        });

        // FIND RANK //
        $('.rnk').filter(function () {
          let data = $(this);
          rank     = data.text();
          rankings.push(rank);
        });

        // FIND NUMBER OF GAMES PLAYED //
        $('.mp').filter(function () {
          let data = $(this);
          mp       = data.text();
          matchesPlayed.push(mp);
        });

        // FIND NUMBER OF GOALS SCORED //
        $('.gt').filter(function () {
          let data = $(this);
          g        = data.text();
          goals.push(g);
        });

        // FIND NUMBER OF PENALTIES SCORED //
        $('.pen').filter(function () {
          let data = $(this);
          p        = data.text();
          penalties.push(p);
        });

        // REMOVE 1ST ITEM FROM ARRAYS AND MERGE DATA INTO AN ARRAY OF OBJECTS//
        rankings.splice(0, 1);
        matchesPlayed.splice(0, 1);
        goals.splice(0, 1);
        penalties.splice(0, 1);
        teams.splice(0, 1);
        names.splice(0, 1);

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

        for (let i = 0; i < penalties.length; i++) {
          results.forEach(e => {
            e['penalties'] = penalties[i];
            penalties.splice(i, 1);
          })
        }
        
        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })

  }

};