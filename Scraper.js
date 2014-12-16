var http = require('http');
var cheerio = require('cheerio');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var STATUS_CODES = http.STATUS_CODES;
/*
 * Scraper Constructor
 **/
function Scraper(url) {
    this.url = url;
    this.fixtures=[];
    this.init();
  }
  /*
   * Make it an EventEmitter
   **/
util.inherits(Scraper, EventEmitter);

Scraper.prototype.init = function() {
  var fixtures;
  var self = this;
  self.on('loaded', function(html) {
    console.log('self.on(loaded)'+'\n');
    self.fixtures = self.parsePage(html);
    //console.log('self.fixtures = '+self.fixtures);
    self.emit('complete', self.fixtures);
  });

  self.loadWebPage();
};
Scraper.prototype.loadWebPage = function() {
  var self = this;
  console.log('loading web page');
  //console.log('\n\nLoading ' + website);
  http.get(self.url, function(res) {
      var body = '';
      if (res.statusCode !== 200) {
        return self.emit('error', STATUS_CODES[res.statusCode]);
      }

      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        self.emit('loaded', body);
      });
    })
    .on('error', function(err) {
      self.emit('error', err);
    });
};
/*
 * Parse html and return an object
 **/
Scraper.prototype.parsePage = function(data) {
  var self=this;
  console.log("parsePage");
  var jsonObject = JSON.parse(data);
  var html = jsonObject.commands[0].parameters.content;
  //console.log('Html \n'+html);
  //console.log(data);
  var fixtures = [];
  var $ = cheerio.load(html);
  $('table.matches tbody tr').each(function(i, prod) {
    var teamA = $('td.team.team-a', this).text();
    var league = 'Bundesliga';
    var teamB = $('td.team.team-b', this).text();
    var score = $('td.score-time.score', this).text().trim().split('-');
    var homeScore = score[0];
    var awayScore = score[1];
    var season = 2014;
    var week = 15;
    var json = {
      teamA: teamA,
      teamB: teamB,
      homeScore: homeScore,
      awayScore: awayScore,
      season: season,
      week: week,
      league:league
    }
    fixtures.push(json);
  });

  //self.emit('complete', fixtures);
  return fixtures;
};
module.exports = Scraper;