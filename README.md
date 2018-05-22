# nw-luminati-sdk
Experimental bindings to the Luminati SDK for NW.js applications. Coming soon.

More about NW.js (node-webkit) at: https://nwjs.io

# Sample usage
```
var lum = require('nw-luminati-sdk');
if(lum.isSupported()){
	lum.setAppName('MyApp');
	lum.init('my-id')
	console.log(lum.getChoice());
}
```


