var rp = require('request-promise');

module.exports = {

    getResults: function (req, res, next) {
        var league = req.query.league;
        var options = {
            uri: 'http://api.football-data.org/alpha/soccerseasons/' + league + '/fixtures/?timeFrame=p120',
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
    }
};