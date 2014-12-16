var Model = require('./Model');
var Scraper = require('./Scraper');
var Urls = [];
var request = require('request');
var cheerio = require('cheerio');

var countWizard=0;
//var url = 'http://us.soccerway.com/a/block_competition_matches_summary?block_id=page_competition_1_block_competition_matches_summary_6&callback_params=%7B%22page%22%3A%224%22%2C%22bookmaker_urls%22%3A%5B%5D%2C%22block_service_id%22%3A%22competition_summary_block_competitionmatchessummary%22%2C%22round_id%22%3A%2225191%22%2C%22outgroup%22%3A%22%22%2C%22view%22%3A%221%22%7D&action=changePage&params=%7B%22page%22%3A6%7D';
for (var i = 0; i < 10; i++) {
    var url = generateGetWeek('8926', i);
    Urls.push(url);
}

var numberOfParallelRequests = 20;
for (var i = 0; i < numberOfParallelRequests; i++) {
    //console.log(Urls);
    wizard();
}


function wizard() {

    // if the Urls array is empty, we are Done!!
    if (!Urls.length) {
        console.log('Done!!!!');
        return ;
    }
    countWizard++;
    console.log("count start wizrd = "+countWizard);
    //console.log(Urls);
    var url = Urls.pop();
    //console.log(url);
    var scraper = new Scraper(url,'matches');
    //var fixtures;
    console.log('Requests Left: ' + Urls.length);
    // if the error occurs we still want to create our
    // next request
    scraper.on('error', function(error) {
        //console.log(error);
        console.log("scraper.on('error')");
       //wizard();
    });
    // if the request completed successfully
    // we want to store the results in our database
    scraper.on('complete', function(listing) {
        console.log("scraper.on('complete')");
        //console.log(JSON.stringify(listing));
        console.log('listing.length() = ' + listing.length);
        for (var i in listing) {
            var fixture = new Model(listing[i]);
            console.log(JSON.stringify(listing[i]));
            fixture.save(function(err) {
                //console.log('onSave');
                if (err) {
                    //console.log('Database err saving: ' + JSON.stringify(listing[i]));
                }
            });
        }
        wizard();
    });
}

function generateGetWeek(round_id, week) {
    url = 'http://us.soccerway.com/a/block_competition_matches_summary?block_id=page_competition_1_block_competition_matches_summary_6&callback_params=%7B%22page%22%3A%2218%22%2C%22bookmaker_urls%22%3A%5B%5D%2C%22block_service_id%22%3A%22competition_summary_block_competitionmatchessummary%22%2C%22round_id%22%3A%22' + round_id;
    url = url + '%22%2C%22outgroup%22%3A%22%22%2C%22view%22%3A%221%22%7D&action=changePage&params=%7B%22page%22%3A' + week + '%7D'
    return url;
};
function generateGetSeason(nation,league) {
    url = 'http://us.soccerway.com/national/'+nation+league;
    return url;
};




