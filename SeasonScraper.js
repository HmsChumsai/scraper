var request = require('request');
var cheerio = require('cheerio');

/*
 * Scraper Constructor
 **/
//var test = new seasonScraper('http://us.soccerway.com/national/england/premier-league');

function seasonScraper(leagueUrl) {
    this.Urls = [];
    this.RoundIds = [];
    this.url = 'http://us.soccerway.com/national/england/premier-league';
    this.CountSession = 0;
    this.init();
}

seasonScraper.prototype.init = function() {
    var that = this;
    request(this.url, function(error, response, html) {

        if (!error) {

            var $ = cheerio.load(html);
            //get all season availabll and its associated url
            $('div#subheading div.submenu_dropdown select#season_id_selector option').each(function(i) {

                var link = $(this).attr('value');
                var season = $(this).text().trim();

                var Seasons = {
                    season: season,
                    url: link
                };

                that.Urls.push(Seasons);
            });
            for (var i = 0; i < 5; i++) {
                that.genRounId('http://us.soccerway.com/');
            }
        }
        //console.log(Urls);
    });
};


seasonScraper.prototype.genRounId = function(url) {
    var that = this;
    if (!this.Urls.length) {
        this.CountSession--;
        if (this.CountSession < 2) {
            console.log(this.RoundIds);
        }
        console.log('Done');
        return;
    }

    this.CountSession++;
    console.log("#genRounId " + this.CountSession);
    var pair = this.Urls.pop();
    var season = pair.season;
    var seasonUrl = url + pair.url;
    console.log('Lefts ' + this.Urls.length);
    //Each season page has redirect page which has it own round_id as url params
    request(seasonUrl, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
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
                    that.RoundIds.push(RoundId);
                    //return false;
                }
                else return false; //get only fisrt element
            });

        }
        else {
            console.log(error);
            that.genRounId('http://us.soccerway.com/');
        }
    });
    that.genRounId('http://us.soccerway.com/');
};
module.exports = seasonScraper;
