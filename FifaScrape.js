var phantom = require('node-phantom');


function waitThenScrape(ph, page,results) {
  
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
    result=data;
    return data;

  }, function(err, result) {
    results=result;
    console.log(result);
    ph.exit();
    //return result;
  });
  return results;
}

function getStat(user) {
  var result;
  var url = 'https://www.easports.com/fifa/game-data/stats/' + user + '/fifa15-ps4/futSeasons';
  var option = {
    parameters: {
      'load-images': false
    }
  };
  phantom.create(callback, option,result);
  function callback(err, ph) {
    ph.createPage(function(err, page) {
      page.open(url, function(err, status) {
        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
          //console.log("opened site? ", status);
          page.open(url, function(err, status) {
            console.log("opened site? ", status);
            //jQuery Loaded.
            //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
            setTimeout(function() {
              waitThenScrape(ph, page,result);
              console.log("Get result:"+result);
            }, 3000);
          });
        });
      });
    });
    //return result;
  };
};


exports.getStat = getStat;