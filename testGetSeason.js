var Scraper = require('./Scraper');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

//var Seasons = {};
var Urls = [];
var url = 'http://us.soccerway.com/national/england/premier-league';

request(url, function(error, response, html) {

    if (!error) {
        var out = "";
        var title, release, rating;
        var links = [];
        var $ = cheerio.load(html);

        $('div#subheading div.submenu_dropdown select#season_id_selector option').each(function() {
            var link = $(this).attr('value');
            var season = $(this).text().trim();

            var Seasons = {
                season: season,
                url: link
            };

            Urls.push(Seasons);
        });
        for (var i = 0; i < 5; i++) {
            genRounId(url);
        }
    }
    console.log(Urls);
});

function getRoundId(num) {

};

function genRounId(url) {
    if (!Urls.length) {
        console.log('Done');
        return ;
    }

    var pair = Urls.pop();
    var season = pair.season;
    var seasonUrl = url + pair.url;
    request(seasonUrl, function(error, response, html) {
        if (!error) {
            console.log('season ' + season + ' genRounIdfounded');
            genRounId(url);
        }
        genRounId(url);
    })
}
var test = 'http://us.soccerway.com/national/england/premier-league'
