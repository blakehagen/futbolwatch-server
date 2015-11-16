var rp = require('request-promise');

module.exports = {

    getData: function (req, res, next) {

        var options = {
            uri: 'http://pokeapi.co/api/v1/type/3/',
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
                console.log('this is the data', data);
                res.status(200).json(data);
            })
            .catch(function (err) {
                // API call failed... 
            });



    }


};