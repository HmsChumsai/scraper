var request = require('request');


var user='thescrewcross';
//var Api=function(user) {
var url = 'https://www.easports.com/fifa/api/fifa15-ps4/stats/fut/thescrewcross';
//url = url + user
request(url, function(error, response, json) {
    if (!error) {
        console.log(JSON.stringify(json));
    }
    
});
//}

//exports.Api = Api;