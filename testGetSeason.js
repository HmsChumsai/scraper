var Scraper = require('./Scraper');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

//var Seasons = {};
var Urls = [];
var url = 'http://us.soccerway.com/national/england/premier-league';

request(url, function(error, response, html) {

    if (!error) {

        var $ = cheerio.load(html);

        $('div#subheading div.submenu_dropdown select#season_id_selector option').each(function(i) {
            if (i>10) {return ;}
            var link = $(this).attr('value');
            var season = $(this).text().trim();

            var Seasons = {
                season: season,
                url: link
            };

            Urls.push(Seasons);
        });
        for (var i = 0; i < 5; i++) {
            genRounId('http://us.soccerway.com/');
        }
    }
    //console.log(Urls);
});

function getRoundId(num) {

};

function genRounId(url) {
    if (!Urls.length) {
        //console.log('Done');
        return;
    }

    var pair = Urls.pop();
    var season = pair.season;
    var seasonUrl = url + pair.url;
    request(seasonUrl, function(error, response, html) {
        if (!error) {
            //console.log('season ' + season + ' genRounIdfounded');
            console.log(seasonUrl);
            var $ = cheerio.load(html);
            //$('div.content form table').each(function() {
            //$('table#page_competition_1_block_home_table_2_block_home_table_small_1_table').each(function() {
            $('div.content div table.playerstats.table').each(function() {
                console.log('inner');
                var x = $(this).attr('data-round_id');
                console.log(season+'  data-round_id = '+x);
            });
            //genRounId('http://us.soccerway.com/');
        }
        else {
            genRounId('http://us.soccerway.com/');
        }
        //genRounId('http://us.soccerway.com/');
    })
}
var test = 'http://us.soccerway.com/national/england/premier-league'
