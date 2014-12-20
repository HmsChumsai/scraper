var Spooky = require('spooky');
var spooky = new Spooky({
    child: {
        transport: 'http'
    },
    casper: {
        logLevel: 'debug',
        verbose: true
    }
}, function(err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }

    spooky.start('https://www.easports.com/fifa/game-data/stats/thescrewcross/fifa15-ps4/futSeasons', function() {
        console.log("test");
        this.getTitle();
        /*
        if (this.exists('div.stat')) {
            spooky.each(this.getElementsInfo('div.stat'), function(casper, element, j) {
                console.log("Commencing")
                    
                    var category = element["text"];
                    console.log(category);
                    categories.push(category);
                    
            });
        }
        */
        
    });
    /*
    spooky.then(function() {
        this.emit('hello', 'Hello, from ' + this.evaluate(function() {
            return document.title;
        }));
    });
    */
    spooky.run();
});

spooky.on('error', function(e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

/*
// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
spooky.on('console', function (line) {
    console.log(line);
});
*/

spooky.on('hello', function(greeting) {
    console.log(greeting);
});

spooky.on('log', function(log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});