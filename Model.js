var mongoose = require('mongoose');

mongoose.connect('mongodb://takefive:57069610@ds061620.mongolab.com:61620/fixtures');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
var Schema=mongoose.Schema;
var FixturesSchema = new Schema({
  league:String,
  teamA: String,
  teamB: String,
  homeScore: Number,
  awayScore: Number,
  season: Number,
  week: Number,
});
FixturesSchema.index( { league: 1, teamA: 1, teamB: 1 , season: 1, week:1 }, { unique: true } )
module.exports = mongoose.model('Fixtures', FixturesSchema );