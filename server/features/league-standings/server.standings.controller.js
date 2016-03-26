'use strict';

let rp      = require('request-promise');
let cheerio = require('cheerio');

module.exports = {

  getLeagueStandings: (req, res) => {
    let leagueCode = req.params.league;

    // SET URL TO GET DATA FROM //
    let leagueUrl;
    if (leagueCode === 'dv41vq9a') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=england-premier-league-2000000000/standings/index.html';
    } else if (leagueCode === 'abq5nqls') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=spain-liga-2000000037/standings/index.html';
    } else if (leagueCode === '379n3ymy') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=germany-bundesliga-2000000019/standings/index.html';
    } else if (leagueCode === 'adu2wboi') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=netherlands-eredivisie-2000000022/standings/index.html';
    } else if (leagueCode === 'ejr3kwbo') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=italy-serie-a-2000000026/standings/index.html';
    } else if (leagueCode === '40dxlnkq') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=portugal-liga-2000000033/standings/index.html';
    } else if (leagueCode === 'a20ppviy') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=france-ligue-1-2000000018/standings/index.html';
    }

    // ARRAYS FOR DATA //
    let teams       = [];
    let rankings    = [];
    let gamesPlayed = [];
    let wins        = [];
    let draws       = [];
    let losses      = [];
    let points      = [];

    let options = {
      uri: leagueUrl,
      transform: body => {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(($) => {

        let team, rank, gp, w, d, l, pts;

        // FIND TEAM //
        $('.team a').filter(function () {
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
          gp       = data.text();
          gamesPlayed.push(gp);
        });

        // FIND WINS //
        $('.wi').filter(function () {
          let data = $(this);
          w        = data.text();
          wins.push(w);
        });

        // FIND DRAWS //
        $('.dr').filter(function () {
          let data = $(this);
          d        = data.text();
          draws.push(d);
        });

        // FIND LOSSES //
        $('.lo').filter(function () {
          let data = $(this);
          l        = data.text();
          losses.push(l);
        });

        // FIND POINTS //
        $('.pts').filter(function () {
          let data = $(this);
          pts      = data.text();
          points.push(pts);
        });

        // REMOVE 1ST ITEM FROM ARRAYS (ALL EXCEPT TEAM) AND MERGE DATA INTO AN ARRAY OF OBJECTS//
        rankings.splice(0, 1);
        gamesPlayed.splice(0, 1);
        wins.splice(0, 1);
        draws.splice(0, 1);
        losses.splice(0, 1);
        points.splice(0, 1);

        let results = [];

        teams.forEach(e => {
          results.push({
            team: e
          })
        });

        for (let i = 0; i < rankings.length; i++) {
          results.forEach(e => {
            e['position'] = rankings[i];
            rankings.splice(i, 1);
          })
        }

        for (let i = 0; i < gamesPlayed.length; i++) {
          results.forEach(e => {
            e['gamesPlayed'] = gamesPlayed[i];
            gamesPlayed.splice(i, 1);
          })
        }

        for (let i = 0; i < wins.length; i++) {
          results.forEach(e => {
            e['wins'] = wins[i];
            wins.splice(i, 1);
          })
        }

        for (let i = 0; i < losses.length; i++) {
          results.forEach(e => {
            e['losses'] = losses[i];
            losses.splice(i, 1);
          })
        }

        for (let i = 0; i < draws.length; i++) {
          results.forEach(e => {
            e['draws'] = draws[i];
            draws.splice(i, 1);
          })
        }

        for (let i = 0; i < points.length; i++) {
          results.forEach(e => {
            e['points'] = points[i];
            points.splice(i, 1);
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

