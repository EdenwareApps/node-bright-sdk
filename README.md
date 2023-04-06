# node-bright-sdk
[Koffi](https://koffi.dev) bindings to the [Bright SDK](https://bright-sdk.com) (formerly Luminati SDK) for [Node.js](https://nodejs.org), [Electron](https://electronjs.org) and [NW.js](https://nwjs.io) applications. Unofficial. Feel free to contribute.

# Install

```
npm install efoxbr/node-bright-sdk
```

# Sample usage
```
var BrightSDK = require('node-bright-sdk');
var brd = new BrightSDK()
brd.setAppName('MyApp');
brd.setTosLink('https://./license/');
brd.setLogoLink(path.resolve('default_icon.png'));
brd.setBgColor('#ffffffff');
brd.setBtnColor('#ff1036a5');
brd.setTxtColor('#ff000000');
// brd.setNotPeerTxt(brd.NOT_PEER_TXT_I_DISAGREE);
brd.on('choice', () => {
	var choice = brd.getChoice();
	switch(choice){
		case brd.CHOICE_NONE:
			console.log('user choice cleared')
			break
		case brd.CHOICE_PEER:
			console.log('user agree')
			break
		case brd.CHOICE_NOT_PEER:
			console.log('user disagree')
			break
	}
}
brd.initUI('my-id')
```
