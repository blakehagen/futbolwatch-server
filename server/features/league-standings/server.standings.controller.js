'use strict';

let rp      = require('request-promise');
let cheerio = require('cheerio');

module.exports = {

  getLeagueStandings: (req, res, next) => {
    let leagueCode = req.params.league;
    // console.log(leagueCode);

    // SET URL TO GET DATA FROM //
    let leagueUrl;
    if (leagueCode === 'dv41vq9a') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=england-premier-league-2000000000/standings/index.html';
    } else if (leagueCode === 'abq5nqls') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=spain-liga-2000000037/standings/index.html';
    } else if (leagueCode === '379n3ymy') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=germany-bundesliga-2000000019/standings/index.html';
    } else if (leagueCode === 'a71bgaeg') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=netherlands-eredivisie-2000000022/standings/index.html';
    } else if (leagueCode === 'ejr3kwbo') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=italy-serie-a-2000000026/standings/index.html';
    } else if (leagueCode === '40dxlnkq') {
      leagueUrl = 'http://www.fifa.com/world-match-centre/nationalleagues/nationalleague=portugal-liga-2000000033/standings/index.html';
    } else if (leagueCode === '4j8yjehk') {
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
          console.log('teamArr length: ', teams.length);

        })

        // FIND RANK //
        $('.rnk').filter(function () {
          let data = $(this);
          rank     = data.text();
          rankings.push(rank);
          console.log('rankArr length: ', rankings.length);
        })

        // FIND NUMBER OF GAMES PLAYED //
        $('.mp').filter(() => {
          let data = $(this);
          gp       = data.text();
          gamesPlayed.push(gp);
          console.log('gp length: ', gamesPlayed.length);
        })

        // FIND WINS //
        $('.wi').filter(() => {
          let data = $(this);
          w        = data.text();
          wins.push(w);
          console.log('w length: ', wins.length);
        })

        // FIND DRAWS //
        $('.dr').filter(() => {
          let data = $(this);
          w        = data.text();
          draws.push(d);
          console.log('d length: ', draws.length);
        })

        // FIND LOSSES //
        $('.lo').filter(() => {
          let data = $(this);
          l        = data.text();
          losses.push(l);
          console.log('l length: ', losses.length);
        })

        // FIND POINTS //
        $('.pts').filter(() => {
          let data = $(this);
          pts      = data.text();
          points.push(pts);
          console.log('pts length: ', points.length);
        })


      })

    res.status(200).send('ok');

  }


};

