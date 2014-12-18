var Model = require('./Model');
var Scraper = require('./Scraper');
var request = require('request');
var cheerio = require('cheerio');
var SeasonScraper = require('./SeasonScraper');

//Flow Control
var countWizard = 0;
var Urls = [];
var start = new SeasonScraper('http://us.soccerway.com/national/england/premier-league');

start.on('complete',function(RoundIds) {
    console.log('Completed!')
    for (var pos in RoundIds) {
        var season = RoundIds[pos].season;
        var round_id = RoundIds[pos].id;
        getLeagueData(round_id, season);
        var numberOfParallelRequests = 20;
        for (var i = 0; i < numberOfParallelRequests; i++) { //number of concurrent bot
            wizard();
        }
    }
});



function getLeagueData(round_id, season, weekSt, weekEnd) {
    for (var i = 0; i < 38; i++) { //get Result for each week
        var url = generateGetWeek(round_id,i);
        var json={
            url:url,
            season:season,
            week:i
        }
        //console.log('getLeagueData : '+JSON.stringify(json));
        Urls.push(json);
    }
}

function wizard() {
    // if the Urls array is empty, we are Done!!
    if (!Urls.length) {
        console.log('wizard() Done!!!!');
        return;
    }
    countWizard++;
    console.log("count start wizrd = " + countWizard);
    //console.log(Urls);
    var data = Urls.pop();
    //console.log(url);
    var url=data.url
    var season=data.season;
    var week=data.week;
    var scraper = new Scraper(url, 'matches',season,week);
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
        var self=this;
        console.log("scraper.on('complete')");
        console.log('listing.length() = ' + listing.length);
        for (var i in listing) {
            var fixture = new Model(listing[i]);
            console.log(JSON.stringify(listing[i]));
            fixture.save(function(err) {
                console.log('onSave');
                if (err) {
                    console.log('Database err saving: ' + JSON.stringify(listing[i]));
                    console.log('Season :'+self.season +" week :"+self.week );
                    console.log('Error:'+err);
                }
            });
        }
        wizard();
    });
}

function generateGetWeek(round_id,week) {
    var url = 'http://us.soccerway.com/a/block_competition_matches_summary?block_id=page_competition_1_block_competition_matches_summary_6&callback_params=%7B%22page%22%3A%22' + week + '%22%2C%22bookmaker_urls%22%3A%5B%5D%2C%22block_service_id%22%3A%22competition_summary_block_competitionmatchessummary%22%2C%22round_id%22%3A%22' + round_id;
    url = url + '%22%2C%22outgroup%22%3A%22%22%2C%22view%22%3A%221%22%7D&action=changePage&params=%7B%22page%22%3A' + week + '%7D'
    console.log(url);
    return url;
};

function generateGetSeason(nation, league) {
    var url = 'http://us.soccerway.com/national/' + nation + league;
    return url;
};
