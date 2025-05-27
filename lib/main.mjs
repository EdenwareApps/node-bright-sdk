import { EventEmitter } from 'events'
import { createRequire } from 'module'
import { getFilename } from 'cross-dirname'
import path from 'path'

let koffi = null

/**
 * Loads the koffi module dynamically.
 * @returns {Object} The koffi module.
 * @throws {Error} If loading koffi fails.
 */
function getKoffi() {
	if (koffi) return koffi
	try {
		const require = createRequire(getFilename())
		const mod = require('koffi')
		koffi = mod.default || mod
		return koffi
	} catch (err) {
		console.error('Failed to load koffi:', err)
		throw new Error(`Failed to load koffi: ${err.message}`)
	}
}

function mapType(t) {
	if (t === 'string') return 'char *'
	if (t === 'int *') return 'int *'
	if (!t || t === 'void') return 'void *'
	return t
}

export default class BrightSDK extends EventEmitter {
	constructor(opts = {}) {
		super()
		this.currentChoice = -1
		this.debug = !!opts.debug
		this.arch = process.arch === 'ia32' ? 32 : 64
		this.dllPath = opts.dllPath || this.getDefaultDllPath(opts.dir)
		this.functions = {}
		this.userChoiceCallback = null
		this.lib = null
		this._choiceCbHandle = null
		this.conv = this.arch === 32 ? '__stdcall ' : ''
		this.tableDef = {
			'close': ['brd_sdk_close_c', ['void', []]],
			'fixServiceStatus': ['brd_sdk_fix_service_status_c', ['void', []]],
			'getConsentChoice': ['brd_sdk_get_consent_choice_c', ['int', []]],
			'getUUID': ['brd_sdk_get_uuid_c', ['void', []]],
			'init': ['brd_sdk_init_c', ['void', []]],
			'optOut': ['brd_sdk_opt_out_c', ['void', []]],
			'setAgreeTxt': ['brd_sdk_set_agree_txt_c', ['void', ['string']]],
			'setAppName': ['brd_sdk_set_app_name_c', ['void', ['string']]],
			'setAppID': ['brd_sdk_set_appid_c', ['void', ['string']]],
			'setBenefit': ['brd_sdk_set_benefit_c', ['void', ['string']]],
			'setBenefitTxt': ['brd_sdk_set_benefit_txt_c', ['void', ['string']]],
			'setBgColor': ['brd_sdk_set_bg_color_c', ['void', ['string']]],
			'setBtnColor': ['brd_sdk_set_btn_color_c', ['void', ['string']]],
			'setDisagreeTxt': ['brd_sdk_set_disagree_txt_c', ['void', ['string']]],
			'setLogoLink': ['brd_sdk_set_logo_link_c', ['void', ['string']]],
			'setServiceAutoStart': ['brd_sdk_set_service_auto_start_c', ['void', ['bool']]],
			'setSkipConsentOnInit': ['brd_sdk_set_skip_consent_on_init_c', ['void', ['bool']]],
			'setTxtColor': ['brd_sdk_set_txt_color_c', ['void', ['string']]],
			'showConsent': ['brd_sdk_show_consent_c', ['void', []]],
			'startService': ['brd_sdk_start_service_c', ['void', []]],
			'stopService': ['brd_sdk_stop_service_c', ['void', []]],
			'clearChoice': ['lum_sdk_clear_choice_c', ['void', []]] // kept for compatibility due to crashes observed in brd_sdk_opt_out_c
		}

		// Consent choice constants
		this.CHOICE_NONE = 0
		this.CHOICE_PEER = 1
		this.CHOICE_NOT_PEER = 2
		this.DLG_POS_TYPE_CENTER_OWNER = 0

		if (!opts.skipPreparing) {
			this.prepare().catch(err => console.error('Failed to prepare BrightSDK:', err))
		}
	}

	/**
	 * Generates the default DLL path if not provided.
	 * @param {string} [dir] - Optional directory path.
	 * @returns {string} The normalized DLL path.
	 */
	getDefaultDllPath(dir) {
		return path
			.join(dir || path.dirname(process.execPath), `lum_sdk${this.arch}.dll`)
			.replace(/\\/g, '/')
	}

	/**
	 * Retrieves the consent choice callback prototype based on architecture.
	 * @param {number} arch - The architecture (32 or 64).
	 * @returns {Object} The koffi prototype.
	 */
	getProtoDef(fn, asString = false) {
		if (!this.tableDef[fn]) {
			throw new Error(`Function ${fn} not found in tableDef`)
		}

		const k = getKoffi()
		const [fnName, [retType, paramTypes]] = this.tableDef[fn]
		const ret = mapType(retType)
		const params = paramTypes.map(mapType)

		if (asString) {
			const conv = String(this.conv)
			const sig = `${ret} ${conv}${fnName}(${params.join(', ')})`
			this.debug && console.log('sig', sig)
			return sig
		}

		const args = [fnName, ret, params]
		if (this.arch === 32) {
			args.unshift(this.conv)
		}

		return k.proto(...args)
	}

	/**
	 * Prepares the SDK by loading the DLL and registering functions.
	 * @returns {Promise<void>}
	 */
	async prepare() {
		if (this.lib) return
		const k = getKoffi()
		try {
			this.lib = k.load(this.dllPath)
		} catch (err) {
			throw new Error(`Failed to load DLL at ${this.dllPath}: ${err.message}`)
		}

		// Register DLL functions
		for (const key in this.tableDef) {
			this[key] = (...args) => {
				this.debug && console.log(`Calling ${key}`, args)
				if (!this.functions[key]) {
					this.functions[key] = this.lib.func(this.getProtoDef(key, true))
				}
				return new Promise((resolve, reject) => {
					this.functions[key].async(...args, (err, val) => {
						this.debug && console.log(`Called ${key}`, { err, val })
						err ? reject(err) : resolve(val)
					})
				})
			}
		}

		// Register choice callback
		const protoArgs = ['ChoiceChangeCallback', 'void', ['int']]
		const ChoiceChangeCallback = ret => {
			this.debug && console.log('Choice change callback', { ret })
			this.emit('choice', ret)
		}

		if (this.arch === 32) {
			protoArgs.unshift('__stdcall')
		}
		const proto = k.proto(...protoArgs)
		const protoPointer = k.pointer(proto)

		// Map JavaScript types to C types 
		const cbName = ['brd_sdk_set_choice_change_cb_c']
		if (this.conv) {
			cbName.unshift(this.conv.trim())
		}
		this.functions.setChoiceChangeCallback = this.lib.func(...cbName, 'void', [protoPointer])
		this._choiceCbHandle = k.register(ChoiceChangeCallback, protoPointer)
		await new Promise((resolve, reject) => {
			this.functions.setChoiceChangeCallback.async(this._choiceCbHandle, err => {
				if (err) {
					console.error('Failed to register choice change callback:', err)
					reject(new Error('Failed to register choice change callback'))
				} else {
					this.debug && console.log('Choice change callback registered')
					resolve()
				}
			})
		})
	}

	/**
	 * Sets a custom choice change callback.
	 * @param {Function} cb - The callback function.
	 */
	setChoiceChangeCallback(cb) {
		if (this.userChoiceCallback) {
			this.removeListener('choice', this.userChoiceCallback)
		}
		this.userChoiceCallback = cb
		this.on('choice', cb)
	}

	/**
	 * Uninitializes the SDK, freeing resources.
	 * @returns {Promise<void>}
	 */
	async uninit() {
		try {
			if (this._choiceCbHandle) {
				getKoffi().unregister(this._choiceCbHandle)
				this._choiceCbHandle = null
			}
			if (this.functions.close) {
				await this.close()
			}
		} catch (err) {
			console.error('Error during uninitialization:', err)
			throw new Error(`Uninitialization failed: ${err.message}`)
		}
	}
}
