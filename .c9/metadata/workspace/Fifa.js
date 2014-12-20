{"changed":true,"filter":false,"title":"Fifa.js","tooltip":"/Fifa.js","value":"var casper = require('casper').create({\n    verbose: true,\n    logLevel: 'error',\n    pageSettings: {\n        loadImages: false,\n        loadPlugins: false,\n        userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36'\n    }\n});\nvar json = [];\nvar json2 = [];\nvar data = {};\n\n\ncasper.start('https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons', function() {\n    //this.echo(this.getTitle());\n    if (this.exists('div.stat')) {\n        casper.each(this.getElementsInfo('div.stat'), function(casper, element, j) {\n            console.log(\"Commencing\")\n                /*\n                var category = element[\"text\"];\n                console.log(category);\n                categories.push(category);\n                */\n        });\n    }\n});\n\ncasper.thenOpen('https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons', function() {\n\n    casper.each(this.getElementsInfo('p.stat-number'), function(casper, element, j) {\n        // casper.each.getElementsInfo('', function(casper, element, j){\n\n        //console.log();\n\n        wins = element[\"text\"].trim();\n        console.log('pos ' + j + ' : ' + wins);\n        json.push(wins);\n\n    });\n    casper.each(this.getElementsInfo('div.table-list li div.align-right'), function(casper, element, j) {\n        // casper.each.getElementsInfo('', function(casper, element, j){\n\n        var ret = element[\"text\"].trim();\n        console.log('pos ' + j + ' : ' + ret);\n        json2.push(ret);\n\n    });\n\n    var wins, ties, losses, passSuccess, averagePossession, goalsAgainst, goalsScored = 0;\n    var bestDivision, titlesWon, promotions, relegations, bestPoints, gamesPlayed, seasonsPlayed = 0;\n    wins = json[0];\n    ties = json[1];\n    losses = json[2];\n    passSuccess = parseInt(json[3]);\n    averagePossession = parseInt(json[4]);\n    goalsScored = json[6]\n    goalsAgainst = json[7];\n\n    var bestseason = json2[1];\n    var split = bestseason.indexOf(\"-\");\n    bestDivision =bestseason.substring(0, split).replace(/\\D/g,'');\n    bestPoints = parseInt(bestseason.substring(split + 1, bestseason.length));\n    titlesWon = json2[2];\n    promotions = json2[3];\n    relegations = json2[4];\n\n\n\n    var record = {\n        wins: wins,\n        ties: ties,\n        losses: losses\n    };\n    data = {\n        bestDivision: bestDivision,\n        bestPoints: bestPoints,\n        titlesWon: titlesWon,\n        promotions: promotions,\n        relegations: relegations,\n        goalsScored: goalsScored,\n        goalsAgainst: goalsAgainst,\n        gamesPlayed: gamesPlayed,\n        seasonsPlayed: seasonsPlayed,\n        record: record,\n        passSuccess: passSuccess,\n        averagePossession: averagePossession\n    }\n    console.log(JSON.stringify(data));\n});\n\ncasper.run();","undoManager":{"mark":97,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":64,"column":17},"end":{"row":64,"column":18},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":18},"end":{"row":65,"column":19},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":55,"column":24},"end":{"row":55,"column":25},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":18},"end":{"row":54,"column":19},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":18},"end":{"row":54,"column":19},"action":"insert","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":55,"column":24},"end":{"row":55,"column":25},"action":"insert","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":19},"end":{"row":54,"column":20},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":20},"end":{"row":54,"column":21},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":21},"end":{"row":54,"column":22},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":22},"end":{"row":54,"column":23},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":23},"end":{"row":54,"column":24},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":24},"end":{"row":54,"column":25},"action":"insert","lines":["I"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":25},"end":{"row":54,"column":26},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":26},"end":{"row":54,"column":27},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":27},"end":{"row":54,"column":28},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":27},"end":{"row":54,"column":28},"action":"remove","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":27},"end":{"row":54,"column":28},"action":"insert","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":35},"end":{"row":54,"column":36},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":36},"end":{"row":54,"column":37},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":36},"end":{"row":54,"column":37},"action":"remove","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":18},"end":{"row":54,"column":19},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":55,"column":24},"end":{"row":55,"column":25},"action":"remove","lines":["+"]},{"start":{"row":55,"column":24},"end":{"row":55,"column":33},"action":"insert","lines":["parseInt("]}]}],[{"group":"doc","deltas":[{"start":{"row":55,"column":40},"end":{"row":55,"column":41},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":59,"column":21},"end":{"row":59,"column":22},"action":"remove","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":60,"column":4},"end":{"row":60,"column":5},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":60,"column":3},"end":{"row":60,"column":4},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":60,"column":3},"end":{"row":60,"column":4},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":5},"end":{"row":61,"column":6},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":4},"end":{"row":61,"column":5},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":62,"column":5},"end":{"row":62,"column":6},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":62,"column":4},"end":{"row":62,"column":5},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":19},"end":{"row":61,"column":28},"action":"insert","lines":["parseInt("]}]}],[{"group":"doc","deltas":[{"start":{"row":62,"column":17},"end":{"row":62,"column":26},"action":"insert","lines":["parseInt("]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":58},"end":{"row":61,"column":59},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":58},"end":{"row":61,"column":59},"action":"remove","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":58},"end":{"row":61,"column":59},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":62,"column":76},"end":{"row":62,"column":77},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":24},"end":{"row":61,"column":27},"action":"remove","lines":["Int"]},{"start":{"row":61,"column":24},"end":{"row":61,"column":25},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":25},"end":{"row":61,"column":26},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":26},"end":{"row":61,"column":27},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":27},"end":{"row":61,"column":28},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":28},"end":{"row":61,"column":29},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":29},"end":{"row":61,"column":30},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":19},"end":{"row":61,"column":30},"action":"remove","lines":["parseString"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":18},"end":{"row":61,"column":19},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":49},"end":{"row":61,"column":50},"action":"remove","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":49},"end":{"row":61,"column":50},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":50},"end":{"row":61,"column":51},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":51},"end":{"row":61,"column":52},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":52},"end":{"row":61,"column":53},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":53},"end":{"row":61,"column":54},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":54},"end":{"row":61,"column":55},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":55},"end":{"row":61,"column":56},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":56},"end":{"row":61,"column":57},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":57},"end":{"row":61,"column":58},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":57},"end":{"row":61,"column":58},"action":"remove","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":56},"end":{"row":61,"column":57},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":55},"end":{"row":61,"column":56},"action":"remove","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":54},"end":{"row":61,"column":55},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":53},"end":{"row":61,"column":54},"action":"remove","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":52},"end":{"row":61,"column":53},"action":"remove","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":51},"end":{"row":61,"column":52},"action":"remove","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":49},"end":{"row":61,"column":51},"action":"remove","lines":[".t"]},{"start":{"row":61,"column":49},"end":{"row":61,"column":69},"action":"insert","lines":[".replace(/\\d/g, \"\");"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":69},"end":{"row":61,"column":70},"action":"remove","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":69},"end":{"row":61,"column":72},"action":"insert","lines":["   "]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":72},"end":{"row":61,"column":73},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":73},"end":{"row":61,"column":74},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":74},"end":{"row":61,"column":75},"action":"insert","lines":["O"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":74},"end":{"row":61,"column":75},"action":"remove","lines":["O"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":74},"end":{"row":61,"column":75},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":75},"end":{"row":61,"column":76},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":76},"end":{"row":61,"column":77},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":77},"end":{"row":61,"column":78},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":78},"end":{"row":61,"column":79},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":79},"end":{"row":61,"column":80},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":79},"end":{"row":61,"column":80},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":78},"end":{"row":61,"column":79},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":77},"end":{"row":61,"column":78},"action":"remove","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":77},"end":{"row":61,"column":78},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":78},"end":{"row":61,"column":79},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":79},"end":{"row":61,"column":80},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":79},"end":{"row":61,"column":80},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":78},"end":{"row":61,"column":79},"action":"remove","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":78},"end":{"row":61,"column":79},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":79},"end":{"row":61,"column":80},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":80},"end":{"row":61,"column":81},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":81},"end":{"row":61,"column":82},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":82},"end":{"row":61,"column":83},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":83},"end":{"row":61,"column":84},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":84},"end":{"row":61,"column":85},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":85},"end":{"row":61,"column":86},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":86},"end":{"row":61,"column":87},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":68},"end":{"row":61,"column":69},"action":"remove","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":68},"end":{"row":61,"column":69},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":18},"end":{"row":61,"column":19},"action":"remove","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":48},"end":{"row":61,"column":67},"action":"remove","lines":[".replace(/\\d/g, \"\")"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":18},"end":{"row":61,"column":27},"action":"insert","lines":["parseInt("]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":57},"end":{"row":61,"column":58},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":58},"end":{"row":61,"column":77},"action":"remove","lines":[";   //ignore number"]},{"start":{"row":61,"column":58},"end":{"row":61,"column":77},"action":"insert","lines":[".replace(/\\D/g,'');"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":57},"end":{"row":61,"column":58},"action":"remove","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":18},"end":{"row":61,"column":27},"action":"remove","lines":["parseInt("]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":23,"column":18},"end":{"row":23,"column":18},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1419007882335}