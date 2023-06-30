# BrightSDK

[![License](https://img.shields.io/github/license/efoxbr/node-bright-sdk.svg)](https://opensource.org/licenses/LICENSE)

A module that provides an interface for interacting with the Bright SDK (formerly Luminati SDK) on Node.js/NW.js/Electron applications. Unofficial, feel free to contribute.


## Installation

```shell
npm install efoxbr/node-bright-sdk
```

## Usage

```javascript
const BrightSDK = require('node-bright-sdk');

// Create a new instance of BrightSDK
const brightSDK = new BrightSDK();

// Example usage
brightSDK.on('choice', choice => {
    console.log('Choice has changed to '+ choice);
});

// Initialize the BrightSDK
brightSDK.init(YOUR_UID);

// Perform other operations with the BrightSDK
// ...

// Uninitialize the BrightSDK
brightSDK.uninit();
```

## API

### `new BrightSDK(opts)`

Creates a new instance of the BrightSDK.

- `opts` (optional): An object containing options.
  - `debug` (boolean): Enable debugging mode (default: `false`).
  - `dllPath` (string): The path to the DLL file (default: determined based on the platform and architecture).
  - `dir` (string): The directory to search for the DLL file (default: the directory of the main executable file).

### checkSupported()

Checks if the Bright SDK is supported.

### clearChoice()

Clears the current choice made by the user.

### getChoice()

Gets the current choice made by the user.

### init(ID)

Initializes the SDK.

### initUI(ID)

Initializes the UI component of the SDK.

### isSupported2()

Checks if the Bright SDK is supported. Returns an integer value.

### isSupported()

Checks if the Bright SDK is supported. Returns an integer value.

### setSkipConsentOnInit(value)

Sets whether to skip the consent screen during SDK initialization.

- `value`: A boolean value indicating whether to skip consent on initialization.

### setAppName(name)

Sets the name of the application.

- `name`: The name of the application.

### setBgColor(color)

Sets the background color of the SDK UI.

- `color`: The background color in string format.

### setBtnColor(color)

Sets the button color of the SDK UI.

- `color`: The button color in string format.

### setDlgPos(position)

Sets the position of the SDK dialog.

- `position`: The position of the dialog.

### setDlgPosType(positionType)

Sets the type of position for the SDK dialog.

- `positionType`: The type of position for the dialog.

### setLogoLink(link)

Sets the logo link of the SDK UI.

- `link`: The logo link.

### setNotPeerTxt(txt)

Sets the text for non-peer users in the SDK UI.

- `txt`: The text for non-peer users.

### setTosLink(link)

Sets the Terms of Service (TOS) link of the SDK UI.

- `link`: The TOS link.

### setTxtColor(color)

Sets the text color of the SDK UI.

- `color`: The text color in string format.

### setTxtCulture(culture)

Sets the text culture of the SDK UI.

- `culture`: The text culture.

### setBenefitTxt(txt)

Sets the benefit text of the SDK UI.

- `txt`: The benefit text.

### uninit()

Uninitializes the BrightSDK and frees any allocated resources.

### Events

#### Event: `choice`

Emitted when the choice has changed.

### Constants

The following constants are available on the BrightSDK instance:

- `CHOICE_NONE` (number): Represents the choice value for none (0).
- `CHOICE_PEER` (number): Represents the choice value for peer (1).
- `CHOICE_NOT_PEER` (number): Represents the choice value for not peer (2).
- `PEER_TXT_NO_ADS` (number): Represents the peer text value for no ads (0).
- `PEER_TXT_PREMIUM` (number): Represents the peer text value for premium (1).
- `PEER_TXT_FREE` (number): Represents the peer text value for free (2).
- `PEER_TXT_DONATE` (number): Represents the peer text value for donate (3).
- `PEER_TXT_I_AGREE` (number): Represents the peer text value for "I agree" (4).
- `NOT_PEER_TXT_ADS` (number): Represents the not peer text value for ads (0).
- `NOT_PEER_TXT_LIMITED` (number): Represents the not peer text value for limited (1).
- `NOT_PEER_TXT_PREMIUM` (number): Represents the not peer text value for premium (2).
- `NOT_PEER_TXT_NO_DONATE` (number): Represents the not peer text value for no donate (3).
- `NOT_PEER_TXT_NOT_AGREE` (number): Represents the not peer text value for not agree (4).
- `NOT_PEER_TXT_I_DISAGREE` (number): Represents the not peer text value for "I disagree" (5).
- `NOT_PEER_TXT_SUBSCRIBE` (number): Represents the not peer text value for subscribe (6).
- `NOT_PEER_TXT_BUY` (number): Represents the not peer text value for buy (7).
- `NOT_PEER_TXT_NO_THANK_YOU` (number): Represents the not peer text value for "No, thank you" (9).
- `DLG_POS_TYPE_CENTER_OWNER` (number): Represents the dialog position type as center owner (0).
