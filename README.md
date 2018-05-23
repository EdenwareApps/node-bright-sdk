# nw-luminati-sdk
Experimental bindings to the Luminati SDK for NW.js applications. Coming soon.

More about NW.js (node-webkit) at: https://nwjs.io

# Sample usage
```
var lum = require('nw-luminati-sdk');
var reason = lum.ref.alloc('int');
if(lum.isSupported(reason)){
	lum.setAppName('MyApp');
	lum.setTosLink('https://./license/');
	lum.setLogoLink(path.resolve('default_icon.png'));
	lum.setBgColor('#ffffffff');
	lum.setBtnColor('#ff1036a5');
	lum.setTxtColor('#ff000000');
	lum.setDlgSize(500);
	lum.setPeerTxt(lum.PEER_TXT_I_AGREE);
	lum.setNotPeerTxt(lum.NOT_PEER_TXT_I_DISAGREE);
	lum.setAppName(gui.App.manifest.window.title);
	var choice = lum.getChoice();
	if(choice != lum.CHOICE_PEER){
		var callback = lum.ffi.Callback('void', ['int'], (c) => {
			var choice = lum.getChoice();
			console.log("CHOICE: ", choice);
			if(choice == lum.CHOICE_NOT_PEER){
				// user disagrees...
			}
		});
		lum.setChoiceChangeCallback(callback);
		process.on('exit', () => { // Make an extra reference to the callback pointer to avoid GC
			callback
		})
	}
	lum.initUI('my-id')
}
```


