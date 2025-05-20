import { EventEmitter } from 'events'
import { createRequire } from 'module'
import { getFilename } from 'cross-dirname'
import path from 'path'

//
// 1) Koffi loading
//
let koffi = null
function loadKoffi() {
	if (koffi) return koffi
	try {
		const require = createRequire(getFilename())
		const mod = require('koffi')
		koffi = mod.default || mod
		return koffi
	} catch (err) {
		console.error('Erro ao carregar koffi:', err) 
		throw err
	}
}

//
// 2) Choice change callback proto
//
let ChoiceChangeProto32 = null
let ChoiceChangeProto64 = null
function getChoiceProto(arch) {
	const k = loadKoffi()
	if (arch === 32) {
		if (!ChoiceChangeProto32) {
			ChoiceChangeProto32 = k.proto(
				'__stdcall',
				'ChoiceChangeCallback',
				'void',
				['int']
			)
		}
		return ChoiceChangeProto32
	} else {
		if (!ChoiceChangeProto64) {
			ChoiceChangeProto64 = k.proto(
				'ChoiceChangeCallback',
				'void',
				['int']
			)
		}
		return ChoiceChangeProto64
	}
}

export default class BrightSDK extends EventEmitter {
	constructor(opts = {}) {
		super()
		this.debug = !!opts.debug
		this.arch = process.arch === 'ia32' ? 32 : 64
		this.dllPath = opts.dllPath || ''
		this.promises = {}

        this.CHOICE_NONE = 0
        this.CHOICE_PEER = 1
        this.CHOICE_NOT_PEER = 2
        this.PEER_TXT_NO_ADS = 0
        this.PEER_TXT_PREMIUM = 1
        this.PEER_TXT_FREE = 2
		this.PEER_TXT_DONATE = 3
		this.PEER_TXT_I_AGREE = 4
		this.NOT_PEER_TXT_ADS = 0
		this.NOT_PEER_TXT_LIMITED = 1
		this.NOT_PEER_TXT_PREMIUM = 2
		this.NOT_PEER_TXT_NO_DONATE = 3
		this.NOT_PEER_TXT_NOT_AGREE = 4
		this.NOT_PEER_TXT_I_DISAGREE = 5
		this.NOT_PEER_TXT_SUBSCRIBE = 6
		this.NOT_PEER_TXT_BUY = 7
		this.NOT_PEER_TXT_NO_THANK_YOU = 9
		this.DLG_POS_TYPE_CENTER_OWNER = 0       

		// mount default path if not provided in opts
		if (!this.dllPath) {
			this.dllPath = path
				.join(opts.dir || path.dirname(process.execPath),
					'lum_sdk' + this.arch + '.dll')
				.replace(/\\/g, '/')
		}

		opts.skipPreparing || this.prepare()
		this.on('choice', (choice) => {
			console.log('[BrightSDK] inner choice', choice)
		})
	}

	prepare() {
		if (this.lib) return
		const k = loadKoffi()
		this.lib = k.load(this.dllPath)		

		// Debounce function to limit calls to getChoice
		const debounce = (func, delay) => {
			let timeoutId
			return (...args) => {
				clearTimeout(timeoutId)
				timeoutId = setTimeout(() => func(...args), delay)
			}
		}
		const ChoiceChangeCallback = debounce(ret => {
			// gave up on getting choice directly, so we'll use the promise
			this.promises.getChoice().then(choice => {
				console.log('[BrightSDK] choiceChangeCallback', choice)
				this.emit('choice', choice)
			}).catch(err => {
				console.error('[BrightSDK] Erro ao decodificar choiceChangeCallback:', err)
			})
		}, 100) // 100ms delay
		const proto = getChoiceProto(this.arch)
		const protoPointer = k.pointer(proto)

		// 3) Helper function to map JS types to C
		const mapType = t => {
			if (t === 'string') return 'char *'
			if (t === 'int *') return 'int *'
			if (!t || t === 'void') return 'void *'
			return t
		}

		// 4) DLL functions table
		const tableDef = { // just x86 table, x64 table will be auto generated from it
			'checkSupported': ['lum_sdk_check_supported', ['void', []]],
			'clearChoice': ['lum_sdk_clear_choice_c', ['void', []]],
			'getChoice': ['lum_sdk_get_choice_c', ['int', []]],
			'init': ['lum_sdk_init_c', ['void', ['string']]],
			'initMonitor': ['lum_sdk_init_monitor_c', ['void', ['string']]],
			'initUI': ['lum_sdk_init_ui_c', ['void', ['string']]],
			'isSupported': ['brd_sdk_is_supported_c', ['int', []]],
			'setSkipConsentOnInit': ['brd_sdk_set_skip_consent_on_init_c', ['void', ['bool']]],
			'setAppName': ['brd_sdk_set_app_name_c', ['void', ['string']]],
			'setBgColor': ['brd_sdk_set_bg_color_c', ['void', ['string']]],
			'setBtnColor': ['brd_sdk_set_btn_color_c', ['void', ['string']]],
			'setDlgPos': ['lum_sdk_set_dlg_pos_c', ['void', ['double', 'double']]],
			'setDlgPosType': ['lum_sdk_set_dlg_pos_type_c', ['void', ['int']]],
			'setLogoLink': ['brd_sdk_set_logo_link_c', ['void', ['string']]],
			'setNotPeerTxt': ['lum_sdk_set_not_peer_txt_c', ['void', ['int']]],
			'setTosLink': ['lum_sdk_set_tos_link_c', ['void', ['string']]],
			'setTxtColor': ['brd_sdk_set_txt_color_c', ['void', ['string']]],
			'setTxtCulture': ['lum_sdk_set_txt_culture_c', ['void', ['string']]],
			'setBenefitTxt': ['brd_sdk_set_benefit_txt_c', ['void', ['string']]],
			'uninit': ['lum_sdk_uninit_c', ['void', []]]
		}

		// 5) Register each function (sync + async)
		const conv = this.arch === 32 ? '__stdcall ' : ''
		const cbname = ['brd_sdk_set_choice_change_cb_c']
		if (conv) {
			cbname.unshift(conv.trim())
		}
		this.setChoiceChangeCallback = this.lib.func(...cbname, 'void', [protoPointer])
		this.promises.setChoiceChangeCallback = (...args) => {
			return new Promise((res, rej) => {
				this.setChoiceChangeCallback.async(...args, (err, val) => {
					if (err) rej(err)
					else res(val)
				})
			})
		}

		for (const [key, [fnName, [retType, paramTypes]]] of Object.entries(tableDef)) {
			const ret = mapType(retType)
			const params = paramTypes.map(mapType)
			const paramList = params.length === 0
				? ''
				: params.join(', ')
			const sig = `${ret} ${conv}${fnName}(${paramList})`
			this[key] = this.lib.func(sig)
			this.promises[key] = (...args) => new Promise((res, rej) =>
				this[key].async(...args, (err, val) =>
					err ? rej(err) : res(val)
				)
			)
		}

		// 6) Choice callback (registered)
		const cb = this._choiceCbHandle = k.register(
			ChoiceChangeCallback,
			protoPointer
		)
		// pass to DLL in a synchronous way
		this.setChoiceChangeCallback(cb)
	}

	time() {
		return Date.now() / 1000
	}

	uninit() {
		// unregister callback to free slot
		if (this._choiceCbHandle) {
			loadKoffi().unregister(this._choiceCbHandle)
			this._choiceCbHandle = null
		}
		// call uninit from DLL (async)
		return this.promises.uninit()
			.catch(err => console.error('Error in uninit:', err))
	}
}
