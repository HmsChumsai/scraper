var phantom = require('node-phantom');

var data = {};
phantom.create {parameters: {'load-images': 'no'
phantom.create(function(err, ph) {
    ph.createPage(function(err, page) {
        page.open("https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons", function(err, status) {
            page.open("https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons", function(err, status) {
                console.log("opened site? ", status);
                page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
                    //jQuery Loaded.
                    //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                    setTimeout(function() {
                        page.evaluate(function() {
                            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                            var json = [];
                            var json2 = [];
                            var h2Arr = [],
                                pArr = [];
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

                            console.log("DATA" + JSON.stringify(data));

                            return {
                                json2: json2,
                                json: json
                            };
                        }, function(err, result) {
                            console.log("Result" + result);
                            ph.exit();
                        });
                    }, 5000);
                });
            });
        });
    });
});