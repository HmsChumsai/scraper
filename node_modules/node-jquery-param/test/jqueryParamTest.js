'use strict';

var should = require('should');
var param = require('../lib/index.js');

describe('Test jquery.param', function(){
  describe('# positive tests', function(){
    it('should get result', function(done){
      var x = {foo: {a:{xxx:9000},b:2}, '[ba]z': 'bob&jhonny'};
      console.log(x);
      var u = param(x);
      console.log(u);
      u.should.equal('foo[a][xxx]=9000&foo[b]=2&%5Bba%5Dz=bob%26jhonny');
      done();
    });

  });

});

