'use strict';
const _ = require('lodash');
const rp = require('request-promise');
const cheerio = require('cheerio');

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
      return res.status(200).send('No Table Available for Champions League');
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

        let cell;
        let rawData = [];

        // GET ALL DATA //
        $('.gs-o-table__cell').filter(function () {
          let data = $(this);
          cell     = data.first().text();
          rawData.push(cell);
        });

        let newData = _.chunk(rawData, 12);
        _.forEach(newData, row => {
          _.forEach(row, (dataPoint, index) => {
            if (index === 0) {
              positions.push(dataPoint);
            } else if (index === 2) {
              teams.push(dataPoint);
            } else if (index === 3) {
              matchesPlayed.push(dataPoint);
            } else if (index === 4) {
              wins.push(dataPoint);
            } else if (index === 5) {
              draws.push(dataPoint);
            } else if (index === 6) {
              losses.push(dataPoint);
            } else if (index === 10) {
              points.push(dataPoint);
            }
          })
        });

        // REMOVE 1ST ITEM FROM ARRAYS //
        positions.splice(0, 1);
        teams.splice(0, 1);
        matchesPlayed.splice(0, 1);
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

        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
  }
};