var phantom = require('node-phantom');


function FifaScraper(url) {
  this.url = url
  this.init();

};

FifaScraper.prototype.init = function() {
  var json = [];
  var json2 = [];
  var data = {};
  phantom.create(

    function(err, ph) {
      return ph.createPage(function(err, page) {
        return page.open("https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons", function(err, status) {
          console.log("opened site? ", status);
          page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
            return page.open("https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons", function(err, status) {
              //jQuery Loaded.
              //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.

              return page.evaluate(function() {
                //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                var h2Arr = [],
                  pArr = [];
                $('div.table-list li div.align-right').each(function() {
                  h2Arr.push($(this).text());
                  console.log($(this).text());
                });
                $('p.stat-number').each(function() {
                  pArr.push($(this).text());
                  console.log($(this).text());
                });
                var wins, ties, losses, passSuccess, averagePossession, goalsAgainst, goalsScored = 0;
                var bestDivision, titlesWon, promotions, relegations, bestPoints, gamesPlayed, seasonsPlayed = 0;
                wins = json[0];
                ties = json[1];
                losses = json[2];
                passSuccess = parseInt(json[3]);
                averagePossession = parseInt(json[4]);
                goalsScored = json[6]
                goalsAgainst = json[7];

                var bestseason = json2[1];
                var split = bestseason.indexOf("-");
                bestDivision = parseInt(bestseason.substring(0, split)).replace(/\D/g, '');
                bestPoints = parseInt(bestseason.substring(split + 1, bestseason.length));
                titlesWon = json2[2];
                promotions = json2[3];
                relegations = json2[4];
                var record = {
                  wins: wins,
                  ties: ties,
                  losses: losses
                };
                data = {
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
                }
                console.log(JSON.stringify(data));
                return {
                  h2: h2Arr,
                  p: pArr
                };
              }, function(err, result) {
                console.log(result);
                ph.exit();
              });
            });
          });
        });
      });
    });
  this.data = data;
  console.log(JSON.stringify( data));
};
module.exports =FifaScraper;