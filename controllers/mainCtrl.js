var rp = require('request-promise');
var parseString = require('xml2js').parseString;
// var config = require('./config');

module.exports = {

    getDataTest: function (req, res, next) {

        var options = {
            // uri: 'http://www.xmlsoccer.com/FootballData.asmx/GetAllLeagues?ApiKey=ZDWHYYRPDCFXURDLPDTOFOAQCALBHWCPUYKXIKZJSHNVDKCKUK',
            // uri: 'https://www.kimonolabs.com/api/atzhegky?apikey=Gw5PcHFe2RGyDfn2GJlUBynbruB41WWo',
            //uri: 'http://www.xmlsoccer.com/FootballData.asmx/GetLeagueStandingsBySeason?' + config.secretKey + '&league=54&seasonDateString=1516',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response 
        };

        rp(options)
            .then(function (data) {
                var dataObj;
                // Convert XML to JSON-like Object
                var xml = data;
                console.log(xml);
                parseString(xml, function (err, result) {
                    console.dir(result);
                    console.log(result);
                    dataObj = result;
                    console.log('here!');
                });
                res.status(200).json(dataObj);
            })
            .catch(function (err) {
                console.log('API call failed');   // API call failed... 
            });
    },




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