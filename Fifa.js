var casper = require('casper').create({
    verbose: true,
    logLevel: 'error',
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36'
    }
});
var json = [];
var json2=[];
var data={};


casper.start('https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons', function() {
    //this.echo(this.getTitle());
    if (this.exists('div.stat')) {
        casper.each(this.getElementsInfo('div.stat'), function(casper, element, j) {
            console.log("Commencing")
                /*
                var category = element["text"];
                console.log(category);
                categories.push(category);
                */
        });
    }
});

casper.thenOpen('https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons', function() {

    casper.each(this.getElementsInfo('p.stat-number'), function(casper, element, j) {
        // casper.each.getElementsInfo('', function(casper, element, j){

        //console.log();

        wins = element["text"].trim();
        console.log('pos ' + j + ' : ' + wins);
        json.push(wins);

    });
     casper.each(this.getElementsInfo('div.table-list li'), function(casper, element, j) {
        // casper.each.getElementsInfo('', function(casper, element, j){
    
        var ret = element["text"].trim();
        console.log('pos ' + j + ' : ' + ret);
        json2.push(ret);

    });
    
    var wins, ties, losses,passSuccess,averagePossession,goalsAgainst,goalsScored=0;
    var bestDivision,titlesWon,promotions,relegations,bestPoints,gamesPlayed,seasonsPlayed=0;
    wins =json[0];
    ties =json[1];
    losses = json[2];
    passSuccess=json[3];
    averagePossession=json[4];
    goalsScored=json[6]
    goalsAgainst=json[7];
    
    var bestseason=json2[1];
    var split=bestseason.indexOf('-');
    bestDivision=bestseason.substring(0,split);
    bestPoints=bestseason.substring(split+1,bestseason.length);
    titlesWon=json2[2];
    promotions=json2[3];
    relegations=json2[4];
    
    
    
    var record = {
        wins: wins,
        ties: ties,
        losses: losses
    };
    data={
        bestDivision:bestDivision,
        bestPoints:bestPoints,
        titlesWon:titlesWon,
        promotions:promotions,
        relegations:relegations,
        goalsScored:goalsScored,
        goalsAgainst:goalsAgainst,
        gamesPlayed:gamesPlayed,
        seasonsPlayed:seasonsPlayed,
        record:record,
        passSuccess:passSuccess,
        averagePossession:averagePossession
    }
    console.log(JSON.stringify(data));
});

casper.run();