var FifaScrape = require('./FifaScrape');
var test = new FifaScrape('escalade_68');
test.on('complete', function(result) {
    console.log("Completed")
    this.result = result;
    console.log("test :" + JSON.stringify(test.result));
});
