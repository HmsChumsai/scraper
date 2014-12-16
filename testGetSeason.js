var Scraper = require('./Scraper');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var url = 'http://us.soccerway.com/national/england/premier-league';
//var scraper = new Scraper(url, 'seasons');
request(url, function(error, response, html) {
    if (!error) {
        var out = "";
        var title, release, rating;
        var links = [];
        var $ = cheerio.load(html);
        $('div#subheading div.submenu_dropdown select#season_id_selector option').each(function() { 
            var season=$(this).attr('value');
            console.log(season);
        });
    }
});
