{"changed":true,"filter":false,"title":"Scraper.js","tooltip":"/Scraper.js","value":"var http = require('http');\nvar cheerio = require('cheerio');\nvar util = require('util');\nvar EventEmitter = require('events').EventEmitter;\nvar STATUS_CODES = http.STATUS_CODES;\n/*\n * Scraper Constructor\n **/\nfunction Scraper(url, type) {\n    this.url = url;\n    this.fixtures = [];\n    this.init();\n    this.type = type;\n  }\n  /*\n   * Make it an EventEmitter\n   **/\nutil.inherits(Scraper, EventEmitter);\n\nScraper.prototype.init = function() {\n  //var fixtures;\n  var self = this;\n  self.on('loaded', function(html) {\n    console.log('self.on(loaded)' + '\\n');\n    self.fixtures = self.parsePage(html);\n    self.emit('complete', self.fixtures);\n  });\n  self.loadWebPage();\n};\nScraper.prototype.loadWebPage = function() {\n  var self = this;\n  console.log('loading web page');\n  http.get(self.url, function(res) {\n      var body = '';\n      if (res.statusCode !== 200) {\n        console.log(\"'self.emit('error')\");\n        return self.emit('error', STATUS_CODES[res.statusCode]);\n        //self.emit('error', STATUS_CODES[res.statusCode]);\n      }\n      res.on('data', function(chunk) {\n        body += chunk;\n      });\n      res.on('end', function() {\n        console.log(\"res.on('end')\");\n        self.emit('loaded', body);\n      });\n    })\n    .on('error', function(err) {\n      self.emit('error', err);\n    });\n};\n/*\n * Parse html and return an object\n **/\nScraper.prototype.parsePage = function(data) {\n  var self = this;\n  console.log(\"parsePage\");\n  var jsonObject = JSON.parse(data);\n  var html = jsonObject.commands[0].parameters.content;\n  //console.log('Html \\n'+html);\n  //console.log(data);\n  var lists = [];\n  var $ = cheerio.load(html);\n  if (self.type == 'matches') {\n    lists = parseMatches($);\n  }\n    if (self.type == 'seasons') {\n    lists = parseSeasons($);\n  }\n  \n  return lists;\n};\n\nfunction parseMatches($) {\n  var lists = [];\n  $('table.matches tbody tr').each(function(i, prod) {\n    var teamA = $('td.team.team-a', this).text();\n    var league = 'Bundesliga';\n    var teamB = $('td.team.team-b', this).text();\n    var score = $('td.score-time.score', this).text().trim().split('-');\n    var homeScore = score[0].trim();\n    var awayScore = score[1].trim();\n    var season = 2014;\n    var week = 15;\n    var json = {\n\n      teamA: teamA,\n      teamB: teamB,\n      homeScore: homeScore,\n      awayScore: awayScore,\n      season: season,\n      week: week,\n      league: league\n    }\n    lists.push(json);\n  });\n  return lists;\n}\nfunction parseSeasons($) {\n  var lists = [];\n  $('div#subheading').each(function(i, prod) {\n    console.log('founded');\n    /*\n    var teamA = $('td.team.team-a', this).text();\n    var league = 'Bundesliga';\n    var teamB = $('td.team.team-b', this).text();\n    var score = $('td.score-time.score', this).text().trim().split('-');\n    var homeScore = score[0].trim();\n    var awayScore = score[1].trim();\n    var season = 2014;\n    var week = 15;\n    var json = {\n\n      teamA: teamA,\n      teamB: teamB,\n      homeScore: homeScore,\n      awayScore: awayScore,\n      season: season,\n      week: week,\n      league: league\n    }\n    lists.push(json);\n    */\n  });\n  return lists;\n}\nmodule.exports = Scraper;","undoManager":{"mark":57,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":117,"column":8},"end":{"row":117,"column":9},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":117,"column":9},"end":{"row":117,"column":10},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":117,"column":10},"end":{"row":117,"column":11},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":117,"column":11},"end":{"row":117,"column":12},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":117,"column":12},"end":{"row":117,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":117,"column":13},"end":{"row":117,"column":14},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":117,"column":14},"end":{"row":117,"column":15},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":0},"end":{"row":66,"column":1},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":1},"end":{"row":66,"column":2},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":1},"end":{"row":66,"column":2},"action":"remove","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":0},"end":{"row":66,"column":1},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":0},"end":{"row":66,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":2},"end":{"row":66,"column":3},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":3},"end":{"row":66,"column":4},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":89,"column":3},"end":{"row":90,"column":0},"action":"insert","lines":["",""]},{"start":{"row":90,"column":0},"end":{"row":90,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":2},"end":{"row":90,"column":3},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":3},"end":{"row":90,"column":4},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":95,"column":22},"end":{"row":95,"column":23},"action":"insert","lines":["$"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":2},"end":{"row":90,"column":4},"action":"remove","lines":["/*","  if (self.type == 'matches') {","    $('table.matches tbody tr').each(function(i, prod) {","      var teamA = $('td.team.team-a', this).text();","      var league = 'Bundesliga';","      var teamB = $('td.team.team-b', this).text();","      var score = $('td.score-time.score', this).text().trim().split('-');","      var homeScore = score[0].trim();","      var awayScore = score[1].trim();","      var season = 2014;","      var week = 15;","      var json = {","","        teamA: teamA,","        teamB: teamB,","        homeScore: homeScore,","        awayScore: awayScore,","        season: season,","        week: week,","        league: league","      }","      lists.push(json);","    });","  }","  */"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":2},"end":{"row":67,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":3},"end":{"row":66,"column":0},"action":"insert","lines":["",""]},{"start":{"row":66,"column":0},"end":{"row":66,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":2},"end":{"row":68,"column":3},"action":"insert","lines":["  if (self.type == 'matches') {","    lists = parseMatches($);","  }"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":22},"end":{"row":66,"column":29},"action":"remove","lines":["matches"]},{"start":{"row":66,"column":22},"end":{"row":66,"column":23},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":23},"end":{"row":66,"column":24},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":24},"end":{"row":66,"column":25},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":25},"end":{"row":66,"column":26},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":26},"end":{"row":66,"column":27},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":27},"end":{"row":66,"column":28},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":66,"column":28},"end":{"row":66,"column":29},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":67,"column":17},"end":{"row":67,"column":24},"action":"remove","lines":["Matches"]},{"start":{"row":67,"column":17},"end":{"row":67,"column":24},"action":"insert","lines":["seasons"]}]}],[{"group":"doc","deltas":[{"start":{"row":67,"column":17},"end":{"row":67,"column":18},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":67,"column":17},"end":{"row":67,"column":18},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":1},"end":{"row":98,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":0},"end":{"row":122,"column":1},"action":"insert","lines":["function parseMatches($) {","  var lists = [];","  $('table.matches tbody tr').each(function(i, prod) {","    var teamA = $('td.team.team-a', this).text();","    var league = 'Bundesliga';","    var teamB = $('td.team.team-b', this).text();","    var score = $('td.score-time.score', this).text().trim().split('-');","    var homeScore = score[0].trim();","    var awayScore = score[1].trim();","    var season = 2014;","    var week = 15;","    var json = {","","      teamA: teamA,","      teamB: teamB,","      homeScore: homeScore,","      awayScore: awayScore,","      season: season,","      week: week,","      league: league","    }","    lists.push(json);","  });","  return lists;","}"]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":14},"end":{"row":98,"column":21},"action":"remove","lines":["Matches"]},{"start":{"row":98,"column":14},"end":{"row":98,"column":15},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":9},"end":{"row":98,"column":15},"action":"remove","lines":["parseS"]},{"start":{"row":98,"column":9},"end":{"row":98,"column":21},"action":"insert","lines":["parseSeasons"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":5},"end":{"row":100,"column":27},"action":"remove","lines":["table.matches tbody tr"]},{"start":{"row":100,"column":5},"end":{"row":100,"column":6},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":6},"end":{"row":100,"column":7},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":7},"end":{"row":100,"column":8},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":8},"end":{"row":100,"column":9},"action":"insert","lines":["#"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":9},"end":{"row":100,"column":10},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":10},"end":{"row":100,"column":11},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":11},"end":{"row":100,"column":12},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":12},"end":{"row":100,"column":13},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":13},"end":{"row":100,"column":14},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":14},"end":{"row":100,"column":15},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":15},"end":{"row":100,"column":16},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":16},"end":{"row":100,"column":17},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":17},"end":{"row":100,"column":18},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":18},"end":{"row":100,"column":19},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":4},"end":{"row":102,"column":0},"action":"insert","lines":["",""]},{"start":{"row":102,"column":0},"end":{"row":102,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":4},"end":{"row":101,"column":5},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":5},"end":{"row":101,"column":6},"action":"insert","lines":["&"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":5},"end":{"row":101,"column":6},"action":"remove","lines":["&"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":5},"end":{"row":101,"column":6},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":120,"column":21},"end":{"row":121,"column":0},"action":"insert","lines":["",""]},{"start":{"row":121,"column":0},"end":{"row":121,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":121,"column":4},"end":{"row":121,"column":5},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":121,"column":5},"end":{"row":121,"column":6},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":4},"end":{"row":102,"column":0},"action":"insert","lines":["",""]},{"start":{"row":102,"column":0},"end":{"row":102,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":4},"end":{"row":101,"column":5},"action":"insert","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":5},"end":{"row":101,"column":6},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":6},"end":{"row":101,"column":7},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":7},"end":{"row":101,"column":8},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":8},"end":{"row":101,"column":9},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":8},"end":{"row":101,"column":9},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":7},"end":{"row":101,"column":8},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":6},"end":{"row":101,"column":7},"action":"remove","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":5},"end":{"row":101,"column":6},"action":"remove","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":4},"end":{"row":101,"column":5},"action":"remove","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":4},"end":{"row":101,"column":5},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":5},"end":{"row":101,"column":6},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":6},"end":{"row":101,"column":7},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":7},"end":{"row":101,"column":8},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":8},"end":{"row":101,"column":9},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":9},"end":{"row":101,"column":10},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":10},"end":{"row":101,"column":11},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":11},"end":{"row":101,"column":12},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":12},"end":{"row":101,"column":13},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":13},"end":{"row":101,"column":14},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":14},"end":{"row":101,"column":15},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":15},"end":{"row":101,"column":16},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":15},"end":{"row":101,"column":16},"action":"remove","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":15},"end":{"row":101,"column":17},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":16},"end":{"row":101,"column":17},"action":"insert","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":17},"end":{"row":101,"column":18},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":18},"end":{"row":101,"column":19},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":19},"end":{"row":101,"column":20},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":20},"end":{"row":101,"column":21},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":21},"end":{"row":101,"column":22},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":21},"end":{"row":101,"column":22},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":20},"end":{"row":101,"column":21},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":19},"end":{"row":101,"column":20},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":18},"end":{"row":101,"column":19},"action":"remove","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":18},"end":{"row":101,"column":19},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":19},"end":{"row":101,"column":20},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":20},"end":{"row":101,"column":21},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":21},"end":{"row":101,"column":22},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":16},"end":{"row":101,"column":17},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":23},"end":{"row":101,"column":24},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":25},"end":{"row":101,"column":26},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":21},"end":{"row":101,"column":22},"action":"insert","lines":["d"]}]}]]},"ace":{"folds":[],"scrolltop":480,"scrollleft":0,"selection":{"start":{"row":90,"column":21},"end":{"row":90,"column":21},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1418753558222}