var phantom = require('node-phantom');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function FifaScrape(user) {
  this.user = user;
  this.init();
}

util.inherits(FifaScrape, EventEmitter);
FifaScrape.prototype.init = function() {
  var self = this;
  self.loadWebPage(this.user);
};

FifaScrape.prototype.waitThenScrape = function(ph, page, results) {
  console.log("waitThenScrape");
  var self = this;
  page.evaluate(function() {
    //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
    var json = [];
    var json2 = [];
    $('div.table-list li div.align-right').each(function() {
      json2.push($(this).text());
    });
    $('p.stat-number').each(function() {
      json.push($(this).text());
    });
    var wins, ties, losses, passSuccess, averagePossession, goalsAgainst, goalsScored = 0;
    var bestDivision, titlesWon, promotions, relegations, bestPoints, gamesPlayed, seasonsPlayed = 0;
    wins = json[0];
    ties = json[1];
    losses = json[2];
    passSuccess = json[3];
    averagePossession = json[4];
    goalsScored = json[6];
    goalsAgainst = json[7];

    var bestseason = json2[1];
    var split = bestseason.indexOf("-");
    bestDivision = bestseason.substring(0, split);
    console.log("bestseason = ");
    //bestDivision = parseInt(bestseason.substring(0, split),10).replace(/\D/g, '');
    bestPoints = parseInt(bestseason.substring(split + 1, bestseason.length), 10);
    titlesWon = json2[2];
    promotions = json2[3];
    relegations = json2[4];
    var record = {
      wins: wins,
      ties: ties,
      losses: losses
    };
    var data = {
      bestDivision: bestDivision,
      bestPoints: bestPoints,
      titlesWon: titlesWon,
      promotions: promotions,
      relegations: relegations,
      goalsScored: goalsScored,
      goalsAgainst: goalsAgainst,
      gamesPlayed: gamesPlayed,
      seasonsPlayed: seasonsPlayed,
      record: record,
      passSuccess: passSuccess,
      averagePossession: averagePossession
    };
    result = data;
    return data;

  }, function(err, result) {
    results = result;
    ph.exit();
    self.emit('complete', result);
    //return result;
  });
  return results;
}

FifaScrape.prototype.loadWebPage=function (user) {
  var self = this;
  var result;
  var url = 'https://www.easports.com/fifa/game-data/stats/' + user + '/fifa15-ps4/futSeasons';
  var option = {
    parameters: {
      'load-images': false
    }
  };
  phantom.create(callback, option, result);

  function callback(err, ph) {
    console.log("callback()");
    ph.createPage(function(err, page) {
      console.log("createPage");
      page.open(url, function(err, status) {
        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
          console.log("first:opened site? ", status);
          page.open(url, function(err, status) {
            console.log("second:opened site? ", status);
            //jQuery Loaded.
            //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
            setTimeout(function() {
              self.waitThenScrape(ph, page, result);
            }, 3000);
          });
        });
      });
    });
    //return result;
  };
};


module.exports = FifaScrape;