# nw-luminati-sdk
Experimental bindings to the Luminati SDK for NW.js applications. Coming soon.

More about NW.js (node-webkit) at: https://nwjs.io

# Sample usage

lum = require('nw-luminati-sdk');
lum.set_app_name('MyApp');
lum.init('my-id')
console.log(lum.get_choice());


