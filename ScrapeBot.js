var request = require('request');
var cheerio = require('cheerio');

var url = 'https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons';

getStat(url);

function getStat(url) {
    request(url, function(error, response, html) {
        var json = [];
        var json2 = [];
        var data = {};
        if (!error) {
            console.log('connected');
            var $ = cheerio.load(html);
            //console.log(html);
            $('div.table-list li div.align-right').each(function() {
                console.log('founded');
                console.log("Found div.table");
                //h2Arr.push($(this).text());
                json2.push($(this).text());
            });
            $('div.container-outer div.body-outer').each(function() {
                console.log('founded');
                console.log('div.container-outer div.body-outer div.stats-page');
                //h2Arr.push($(this).text());
                //json2.push($(this).text());
            });
            //$('p.stat-number').each(function() {
            $('div.stat.wins').each(function() {
                console.log('founded');
                console.log("Found p.stat");
                json.push($(this).text());
                console.log($(this).text());

            });
            console.log('JSON : ' + json);
        };
    });
}