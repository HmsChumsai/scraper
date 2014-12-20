{"filter":false,"title":"Spooky.js","tooltip":"/Spooky.js","undoManager":{"mark":13,"position":13,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":1},"end":{"row":0,"column":2},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":2},"end":{"row":0,"column":3},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":2},"end":{"row":0,"column":3},"action":"remove","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":1},"end":{"row":0,"column":2},"action":"remove","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":1},"end":{"row":0,"column":2},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":2},"action":"remove","lines":["Sp"]},{"start":{"row":0,"column":0},"end":{"row":56,"column":3},"action":"insert","lines":["try {","    var Spooky = require('spooky');","} catch (e) {","    var Spooky = require('../lib/spooky');","}","","var spooky = new Spooky({","        child: {","            transport: 'http'","        },","        casper: {","            logLevel: 'debug',","            verbose: true","        }","    }, function (err) {","        if (err) {","            e = new Error('Failed to initialize SpookyJS');","            e.details = err;","            throw e;","        }","","        spooky.start(","            'http://en.wikipedia.org/wiki/Spooky_the_Tuff_Little_Ghost');","        spooky.then(function () {","            this.emit('hello', 'Hello, from ' + this.evaluate(function () {","                return document.title;","            }));","        });","        spooky.run();","    });","","spooky.on('error', function (e, stack) {","    console.error(e);","","    if (stack) {","        console.log(stack);","    }","});","","/*","// Uncomment this block to see all of the things Casper has to say.","// There are a lot.","// He has opinions.","spooky.on('console', function (line) {","    console.log(line);","});","*/","","spooky.on('hello', function (greeting) {","    console.log(greeting);","});","","spooky.on('log', function (log) {","    if (log.space === 'remote') {","        console.log(log.message.replace(/ \\- .*/, ''));","    }","});"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":2,"column":0},"action":"remove","lines":["try {","    var Spooky = require('spooky');",""]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":13},"action":"remove","lines":["} catch (e) {"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":0},"end":{"row":2,"column":1},"action":"remove","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1,"column":4},"action":"remove","lines":["","    "]},{"start":{"row":4,"column":4},"end":{"row":4,"column":8},"action":"remove","lines":["    "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":4},"action":"remove","lines":["    "]},{"start":{"row":6,"column":4},"end":{"row":6,"column":8},"action":"remove","lines":["    "]},{"start":{"row":7,"column":0},"end":{"row":7,"column":2},"action":"remove","lines":["  "]},{"start":{"row":7,"column":4},"end":{"row":7,"column":6},"action":"remove","lines":["  "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":4},"action":"remove","lines":["    "]},{"start":{"row":9,"column":8},"end":{"row":9,"column":12},"action":"remove","lines":["    "]},{"start":{"row":10,"column":4},"end":{"row":10,"column":8},"action":"remove","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"remove","lines":["    "]},{"start":{"row":11,"column":11},"end":{"row":11,"column":12},"action":"remove","lines":[" "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"remove","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"remove","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":3},"action":"remove","lines":["   "]},{"start":{"row":14,"column":8},"end":{"row":14,"column":9},"action":"remove","lines":[" "]},{"start":{"row":15,"column":8},"end":{"row":15,"column":12},"action":"remove","lines":["    "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":1},"action":"remove","lines":[" "]},{"start":{"row":16,"column":4},"end":{"row":16,"column":7},"action":"remove","lines":["   "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":3},"action":"remove","lines":["   "]},{"start":{"row":18,"column":4},"end":{"row":18,"column":5},"action":"remove","lines":[" "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"remove","lines":["    "]},{"start":{"row":20,"column":4},"end":{"row":20,"column":8},"action":"remove","lines":["    "]},{"start":{"row":20,"column":24},"end":{"row":20,"column":25},"action":"remove","lines":[" "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":2},"action":"remove","lines":["  "]},{"start":{"row":21,"column":8},"end":{"row":21,"column":10},"action":"remove","lines":["  "]},{"start":{"row":21,"column":66},"end":{"row":21,"column":67},"action":"remove","lines":[" "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":3},"action":"remove","lines":["   "]},{"start":{"row":22,"column":12},"end":{"row":22,"column":13},"action":"remove","lines":[" "]},{"start":{"row":23,"column":8},"end":{"row":23,"column":12},"action":"remove","lines":["    "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":1},"action":"remove","lines":[" "]},{"start":{"row":24,"column":4},"end":{"row":24,"column":7},"action":"remove","lines":["   "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":3},"action":"remove","lines":["   "]},{"start":{"row":25,"column":4},"end":{"row":25,"column":5},"action":"remove","lines":[" "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":4},"action":"remove","lines":["    "]},{"start":{"row":28,"column":27},"end":{"row":28,"column":28},"action":"remove","lines":[" "]},{"start":{"row":45,"column":27},"end":{"row":45,"column":28},"action":"remove","lines":[" "]},{"start":{"row":49,"column":25},"end":{"row":49,"column":26},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":38},"action":"remove","lines":["var Spooky = require('../lib/spooky');"]},{"start":{"row":0,"column":0},"end":{"row":0,"column":31},"action":"insert","lines":["var Spooky = require('spooky');"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":5,"column":25},"end":{"row":5,"column":25},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1419053509299,"hash":"942a77d0d1f1c110914e727592c7d97adc082a19"}