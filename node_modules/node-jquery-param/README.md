node-jquery-param
=================

node module to do jquery.param

## Usage

```
var param = require('node-jquery-param');

var x = {foo: {a:{xxx:9000},b:2}, '[ba]z': 'bob&jhonny'};
var u = param(x);
console.log(u);
//output is:
//foo[a][xxx]=9000&foo[b]=2&%5Bba%5Dz=bob%26jhonny

```


## LICENSE

MIT

