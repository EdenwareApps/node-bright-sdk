# BrightSDK

[![License](https://img.shields.io/github/license/EdenwareApps/node-bright-sdk.svg)](https://opensource.org/licenses/LICENSE)

A module that provides an interface for interacting with the Bright SDK (formerly Luminati SDK) on Node.js/NW.js/Electron applications. Unofficial, feel free to contribute.

## Installation

```shell
npm install EdenwareApps/node-bright-sdk
```

## Usage

### ESM / async example

```javascript
import BrightSDK from 'node-bright-sdk'

const brightSDK = new BrightSDK({ debug: true })
await brightSDK.setChoiceChangeCallback(choice => {
    console.log('Choice has changed to ' + choice)
})
await brightSDK.setLogoLink('./default_icon.png')
await brightSDK.setBgColor('#FFFFFFFF')
await brightSDK.setTxtColor('#FF000000')
await brightSDK.setBenefitTxt('Premium Resources')
await brightSDK.setAppName('App Name Premium')
await brightSDK.setSkipConsentOnInit(true)
await brightSDK.init()

let currentChoice = await brightSDK.getConsentChoice()
// 0=uninitialized, 1=agree, 2=disagree
if (currentChoice == 1) {
    await brightSDK.clearChoice() // clear the choice for testing purposes
    // await brightSDK.optOut()
}
await brightSDK.showConsent()
// await brightSDK.uninit()
```

### CommonJS / Promises minimal example

```javascript
const BrightSDK = require('node-bright-sdk')

const brightSDK = new BrightSDK({ debug: true })
brightSDK.on('choice', choice => {
    console.log('Choice has changed to ' + choice)
})
brightSDK.init().then(() => {
    brightSDK.getConsentChoice().then(choice => {
        console.log('Current choice is ' + choice)
        /*
        Perform other operations with the BrightSDK
        brightSDK.uninit().then(() => {
            console.log('SDK uninitialized')
        })
        */
    }).catch(err => {
        console.error('Error getting consent choice:', err)
    })
}).catch(err => {
    console.error('Error initializing BrightSDK:', err)
})
```

## API

### `new BrightSDK(opts)`

Creates a new instance of the BrightSDK.

- `opts` (optional): An object containing options.
  - `debug` (boolean): Enable debugging mode (default: `false`).
  - `dllPath` (string): The path to the DLL file (default: determined based on the platform and architecture).
  - `dir` (string): The directory to search for the DLL file (default: the directory of the main executable file).
  - `skipPreparing` (boolean): If `true`, skips automatic preparation of the SDK (default: `false`).

### `prepare()`

Prepares the SDK by loading the DLL and registering functions. This is called automatically unless `skipPreparing` is set to `true`.

- **Returns**: `Promise<void>`

### `close()`

Closes the SDK.

- **Returns**: `Promise<void>`

### `fixServiceStatus()`

Fixes the service status.

- **Returns**: `Promise<void>`

### `getConsentChoice()`

Gets the current choice made by the user.

- **Returns**: `Promise<number>` - `0` (uninitialized), `1` (agree), or `2` (disagree).

### `getUUID()`

Gets the UUID.

- **Returns**: `Promise<void>` - The UUID is logged if `debug` is enabled.

### `init()`

Initializes the SDK.

- **Returns**: `Promise<void>`

### `optOut()`

Opts out of the SDK.

- **Returns**: `Promise<void>`

### `setAgreeTxt(txt)`

Sets the agree text for the consent UI.

- `txt` (string): The agree text.
- **Returns**: `Promise<void>`

### `setAppName(name)`

Sets the name of the application.

- `name` (string): The application name.
- **Returns**: `Promise<void>`

### `setAppID(id)`

Sets the ID of the application.

- `id` (string): The application ID.
- **Returns**: `Promise<void>`

### `setBenefit(benefit)`

Sets the benefit description.

- `benefit` (string): The benefit description.
- **Returns**: `Promise<void>`

### `setBenefitTxt(txt)`

Sets the benefit text for the SDK UI.

- `txt` (string): The benefit text.
- **Returns**: `Promise<void>`

### `setBgColor(color)`

Sets the background color of the SDK UI.

- `color` (string): The background color (e.g., "#FFFFFF").
- **Returns**: `Promise<void>`

### `setBtnColor(color)`

Sets the button color of the SDK UI.

- `color` (string): The button color (e.g., "#FF0000").
- **Returns**: `Promise<void>`

### `setDisagreeTxt(txt)`

Sets the disagree text for the consent UI.

- `txt` (string): The disagree text.
- **Returns**: `Promise<void>`

### `setLogoLink(link)`

Sets the logo link for the SDK UI.

- `link` (string): The logo URL.
- **Returns**: `Promise<void>`

### `setServiceAutoStart(value)`

Sets whether the service should start automatically.

- `value` (boolean): `true` to enable auto-start, `false` otherwise.
- **Returns**: `Promise<void>`

### `setSkipConsentOnInit(value)`

Sets whether to skip the consent screen during SDK initialization.

- `value` (boolean): `true` to skip consent, `false` otherwise.
- **Returns**: `Promise<void>`

### `setTxtColor(color)`

Sets the text color of the SDK UI.

- `color` (string): The text color (e.g., "#000000").
- **Returns**: `Promise<void>`

### `showConsent()`

Shows the consent dialog.

- **Returns**: `Promise<void>`

### `startService()`

Starts the service.

- **Returns**: `Promise<void>`

### `stopService()`

Stops the service.

- **Returns**: `Promise<void>`

### `setChoiceChangeCallback(cb)`

Sets a custom callback for when the user’s choice changes.

- `cb` (function): The callback function that receives the choice value (`0`, `1`, or `2`).

### `uninit()`

Uninitializes the SDK and frees any allocated resources.

- **Returns**: `Promise<void>`

## Events

### Event: `choice`

Emitted when the user’s choice changes.

- **Listener**: `(choice: number) => void` - The choice value (`0`, `1`, or `2`).

## Constants

The following constants are available on the BrightSDK instance:

- `CHOICE_NONE` (number): Represents the choice value for none (`0`).
- `CHOICE_PEER` (number): Represents the choice value for peer (`1`).
- `CHOICE_NOT_PEER` (number): Represents the choice value for not peer (`2`).
- `DLG_POS_TYPE_CENTER_OWNER` (number): Represents the dialog position type as center owner (`0`).