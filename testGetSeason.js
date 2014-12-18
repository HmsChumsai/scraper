var Scraper = require('./Scraper');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

//var Seasons = {};
var Urls = [];
var RoundIds = [];
var url = 'http://us.soccerway.com/national/england/premier-league';
var CountSession = 0;

request(url, function(error, response, html) {

    if (!error) {

        var $ = cheerio.load(html);

        $('div#subheading div.submenu_dropdown select#season_id_selector option').each(function(i) {

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
        CountSession--;
        if (CountSession < 2) {
            console.log(RoundIds);
        }
        console.log('Done');
        return;
    }

    CountSession++;
    console.log("#genRounId " + CountSession);

    var pair = Urls.pop();
    var season = pair.season;
    var seasonUrl = url + pair.url;
    console.log('Lefts ' + Urls.length);
    request(seasonUrl, function(error, response, html) {
        if (!error) {
            //console.log('season ' + season + ' genRounIdfounded');
            //console.log(seasonUrl);
            var $ = cheerio.load(html);
            //$('div.content form table').each(function() {
            //$('table#page_competition_1_block_home_table_2_block_home_table_small_1_table').each(function() {
            $('div.content div div form table').each(function(i, elem) {
                if (i == 0) {
                    //$('div.content div table.playerstats.table').each(function() {
                    //console.log('inner');
                    var x = $(this).attr('data-round_id');
                    console.log(season + '  data-round_id = ' + x);
                    var RoundId = {
                        season: season,
                        id: x
                    };
                    RoundIds.push(RoundId);
                    //return false;
                }
                else return false;
            });

        }
        else {
            console.log(error);
            genRounId('http://us.soccerway.com/');
        }
    });
    genRounId('http://us.soccerway.com/');
};
