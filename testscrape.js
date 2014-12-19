var casper = require('casper').create();
var url='https://www.easports.com/fifa/game-data/stats/escalade_68/fifa15-ps4/futSeasons'

casper.start('https://www.easports.com/fifa/game-data/stats/escalade_68/fifa15-ps4/futSeasons', function() {
    this.echo(this.getTitle());
});



casper.open(url, function() {
  this.waitUntilVisible('h2.head', function() {
    var categories = [];
    casper.each(this.getElementsInfo('a.label'), function(casper, element, j) {
      var category = element["text"];
      categories.push(category);
      console.log(category);
    });
  });
});