var rp = require('request-promise');

module.exports = {

    getResults: function (req, res, next) {
        var league = req.query.league;
        var options = {
            uri: 'http://api.football-data.org/alpha/soccerseasons/' + league + '/fixtures/?timeFrame=p180',
            headers: { 'X-Auth-Token': '57d24f023e8247aea4badd00e37328dc' },
            json: true // Automatically parses the JSON string in the response 
        };
        rp(options).then(function (data) {
            console.log('data on mainCtrl in SERVER: ' + data)
            res.status(200).json(data)
        })
            .catch(function (err) {
            });
    },

    getFixtures: function (req, res, next) {
        var league = req.query.league;
        var options = {
            uri: 'http://api.football-data.org/alpha/soccerseasons/' + league + '/fixtures/?timeFrame=n21',
            headers: { 'X-Auth-Token': '57d24f023e8247aea4badd00e37328dc' },
            json: true // Automatically parses the JSON string in the response 
        };
        rp(options).then(function (data) {
            res.status(200).json(data)
        })
            .catch(function (err) {
                console.log('GET Request Failed!');
            });
    },

    getTopScorers: function (req, res, next) {
        var league = req.params.id;
        var options = {
            uri: 'https://www.kimonolabs.com/api/' + league + '?apikey=Gw5PcHFe2RGyDfn2GJlUBynbruB41WWo',
            json: true // Automatically parses the JSON string in the response 
        };
        rp(options).then(function (data) {
            res.status(200).json(data)
        })
            .catch(function (err) {
                console.log('GET Request Failed!');
            });
    },

    getLeagueTable: function (req, res, next) {
        var league = req.params.id;
        var options = {
            uri: 'https://www.kimonolabs.com/api/' + league + '?apikey=Gw5PcHFe2RGyDfn2GJlUBynbruB41WWo',
            json: true // Automatically parses the JSON string in the response 
        };
        rp(options).then(function (data) {
            res.status(200).json(data)
        })
            .catch(function (err) {
                console.log('GET Request Failed!');
            });
    }
};