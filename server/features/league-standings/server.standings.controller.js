'use strict';

let rp      = require('request-promise');
let cheerio = require('cheerio');

module.exports = {

  getLeagueStandings: (req, res) => {

    let leagueCode = req.params.league;

    // SET URL TO GET DATA FROM //
    let leagueUrl;
    if (leagueCode === '426') {
      leagueUrl = 'http://www.bbc.com/sport/football/premier-league/table';
    } else if (leagueCode === '436') {
      leagueUrl = 'http://www.bbc.com/sport/football/spanish-la-liga/table';
    } else if (leagueCode === '430') {
      leagueUrl = 'http://www.bbc.com/sport/football/german-bundesliga/table';
    } else if (leagueCode === '433') {
      leagueUrl = 'http://www.bbc.com/sport/football/dutch-eredivisie/table';
    } else if (leagueCode === '438') {
      leagueUrl = 'http://www.bbc.com/sport/football/italian-serie-a/table';
    } else if (leagueCode === '439') {
      leagueUrl = 'http://www.bbc.com/sport/football/portuguese-primeira-liga/table';
    } else if (leagueCode === '434') {
      leagueUrl = 'http://www.bbc.com/sport/football/french-ligue-one/table';
    } else if (leagueCode === '440') {
      res.status(200).send('No Table Available for Champions League');
    }

    // ARRAYS FOR DATA //
    let teams         = [];
    let positions     = [];
    let wins          = [];
    let matchesPlayed = [];
    let losses        = [];
    let draws         = [];
    let points        = [];

    let options = {
      uri: leagueUrl,
      transform: body => {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(($) => {

        let team, pos, w, d, l, mp, pts;

        // FIND TEAM //
        $('.team-name').filter(function () {
          let data = $(this);
          team     = data.first().text();
          teams.push(team);
        });

        // FIND POSITION //
        $('.position-number').filter(function () {
          let data = $(this);
          pos      = data.text();
          positions.push(pos);
        });

        // FIND MATCHES PLAYED //
        $('.played').filter(function () {
          let data = $(this);
          mp       = data.text();
          matchesPlayed.push(mp);
        });

        // FIND WINS //
        $('.won').filter(function () {
          let data = $(this);
          w        = data.first().text();
          wins.push(w);
        });

        // FIND DRAWS //
        $('.drawn').filter(function () {
          let data = $(this);
          d        = data.text();
          draws.push(d);
        });

        // FIND LOSSES //
        $('.lost').filter(function () {
          let data = $(this);
          l        = data.text();
          losses.push(l);
        });

        // FIND POINTS //
        $('.points').filter(function () {
          let data = $(this);
          pts      = data.text();
          points.push(pts);
        });

        // REMOVE 1ST ITEM FROM ARRAYS AND EXTRA ITEMS AND MERGE DATA INTO ARRAY OF OBJECTS //
        teams.splice(0, 1);
        teams.splice(20);
        positions.splice(20);
        matchesPlayed.splice(0, 1);
        matchesPlayed.splice(20);
        wins.splice(0, 1);
        wins.splice(20);
        draws.splice(0, 1);
        draws.splice(20);
        losses.splice(0, 1);
        losses.splice(20);
        points.splice(0, 1);
        points.splice(20);

        let results = [];

        teams.forEach(e => {
          results.push({
            team: e
          })
        });

        for (let i = 0; i < positions.length; i++) {
          results.forEach(e => {
            e['position'] = positions[i];
            positions.splice(i, 1);
          })
        }

        for (let i = 0; i < matchesPlayed.length; i++) {
          results.forEach(e => {
            e['gamesPlayed'] = matchesPlayed[i];
            matchesPlayed.splice(i, 1);
          })
        }

        for (let i = 0; i < wins.length; i++) {
          results.forEach(e => {
            e['wins'] = wins[i];
            wins.splice(i, 1);
          })
        }

        for (let i = 0; i < draws.length; i++) {
          results.forEach(e => {
            e['draws'] = draws[i];
            draws.splice(i, 1);
          })
        }

        for (let i = 0; i < losses.length; i++) {
          results.forEach(e => {
            e['losses'] = losses[i];
            losses.splice(i, 1);
          })
        }

        for (let i = 0; i < points.length; i++) {
          results.forEach(e => {
            e['points'] = points[i];
            points.splice(i, 1);
          })
        }

        // console.log(results);
        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })

  }
};