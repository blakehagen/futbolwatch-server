var rp = require('request-promise');
var parseString = require('xml2js').parseString;
var config = require('../config');

module.exports = {

    getData: function (req, res, next) {

        var options = {
            uri: 'http://pokeapi.co/api/v1/pokemon/1/',
            // uri: 'http://www.xmlsoccer.com/FootballData.asmx/GetLeagueStandingsBySeason?' + config.secretKey + '&league=50&seasonDateString=1516',
            // qs: {
            //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx' 
            // },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response 
        };

        rp(options)
            .then(function (data) {
                var dataObj;
                // Convert XML to JSON-like Object
                var xml = data
                parseString(xml, function (err, result) {
                    // console.dir(result);
                    // console.log(result);
                    dataObj = result;
                });
                res.status(200).json(data);
            })
            .catch(function (err) {
                console.log('API call failed');   // API call failed... 
            });
    }


};