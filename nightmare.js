var Nightmare = require('nightmare');
new Nightmare()
  .goto('https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons')
    .run(function (err, nightmare) {
      if (err) return console.log(err);
      console.log('Done!');
    });