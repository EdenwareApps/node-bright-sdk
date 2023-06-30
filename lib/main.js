const EventEmitter = require('events')

class BrightSDK extends EventEmitter {
    constructor(opts = {}) {
        super()
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
        this.DLG_POS_TYPE_CENTER_SCREEN = 1
        this.DLG_POS_TYPE_MANUAL = 2
        this.debug = !!opts.debug
        this.dllPath = opts.dllPath || ''
        this.arch = process.arch === 'ia32' ? 32 : 64
        if (!this.dllPath || typeof this.dllPath !== 'string') {
            const path = require('path')
            this.dllPath = path.join(opts.dir || path.dirname(process.execPath), 'lum_sdk' + this.arch + '.dll')
        }
        this.dllPath = this.dllPath.split('\\').join('/')
		if(!opts.skipPreparing){
			this.prepare()
		}
	}
	prepare(){
		this.ffi = require('ffi-napi')
		this.ref = require('ref-napi')

        this.intPtr = this.ref.refType('int')
        if(this.arch == 64){
			this.table = {
				'checkSupported': [
					'lum_sdk_check_supported',
					['void', []]
				],
				'clearChoice': [
					'lum_sdk_clear_choice_c',
					['void', []]
				],
				'getChoice': [
					'lum_sdk_get_choice_c',
					['int', []]
				],
				'init': [
					'brd_sdk_init_c',
					['void', ['string']]
				],
				'initMonitor': [
					'lum_sdk_init_monitor_c',
					['void', ['string']]
				],
				'initUI': [
					'lum_sdk_init_ui_c',
					['void', ['string']]
				],
				'isSupported2': [
					'lum_sdk_is_supported_c',
					['int', [this.intPtr]]
				],
				'isSupported': [
					'lum_sdk_is_supported_c',
					['int', [this.intPtr]]
				],
				'setSkipConsentOnInit': [
					'brd_sdk_set_skip_consent_on_init_c',
					['void', ['bool']]
				],
				'setAppName': [
					'brd_sdk_set_app_name_c',
					['void', ['string']]
				],
				'setBgColor': [
					'brd_sdk_set_bg_color_c',
					['void', ['string']]
				],
				'setBtnColor': [
					'brd_sdk_set_btn_color_c',
					['void', ['string']]
				],
				'setDlgPos': [
					'lum_sdk_set_dlg_pos_c',
					['void', ['int']]
				],
				'setDlgPosType': [
					'lum_sdk_set_dlg_pos_type_c',
					['void', ['int']]
				],
				'setLogoLink': [
					'brd_sdk_set_logo_link_c',
					['void', ['string']]
				],
				'setNotPeerTxt': [
					'lum_sdk_set_not_peer_txt_c',
					['void', ['int']]
				],
				'setTosLink': [
					'lum_sdk_set_tos_link_c',
					['void', ['string']]
				],
				'setTxtColor': [
					'brd_sdk_set_txt_color_c',
					['void', ['string']]
				],
				'setTxtCulture': [
					'lum_sdk_set_txt_culture_c',
					['void', ['string']]
				],
				'setBenefitTxt': [
					'brd_sdk_set_benefit_txt_c',
					['void', ['string']]
				],	
				'uninit': [
					'lum_sdk_uninit_c',
					['void', []]
				],
                'setChoiceChangeCallback': [
                    'lum_sdk_set_choice_change_cb_c',
                    ['void', ['pointer']]
                ]
			}
		} else {
			this.table = {
				'checkSupported': [
					'_lum_sdk_check_supported@0',
					['void', []]
				],
				'clearChoice': [
					'_lum_sdk_clear_choice_c@0',
					['void', []]
				],
				'getChoice': [
					'_lum_sdk_get_choice_c@0',
					['int', []]
				],
				'init': [
					'_lum_sdk_init_c@4',
					['void', ['string']]
				],
				'initMonitor': [
					'_lum_sdk_init_monitor_c@4',
					['void', ['string']]
				],
				'initUI': [
					'_lum_sdk_init_ui_c@4',
					['void', ['string']]
				],
				'isSupported2': [
					'_lum_sdk_is_supported2_c@8',
					['int', [this.intPtr]]
				],
				'isSupported': [
					'_lum_sdk_is_supported_c@0',
					['int', [this.intPtr]]
				],
				'setSkipConsentOnInit': [
					'_brd_sdk_set_skip_consent_on_init_c@4',
					['void', ['bool']]
				],
				'setAppName': [
					'_lum_sdk_set_app_name_c@4',
					['void', ['string']]
				],
				'setBgColor': [
					'_lum_sdk_set_bg_color_c@4',
					['void', ['string']]
				],
				'setBtnColor': [
					'_lum_sdk_set_btn_color_c@4',
					['void', ['string']]
				],
				'setDlgPos': [
					'_lum_sdk_set_dlg_pos_c@16',
					['void', ['int']]
				],
				'setDlgPosType': [
					'_lum_sdk_set_dlg_pos_type_c@4',
					['void', ['int']]
				],
				'setLogoLink': [
					'_lum_sdk_set_logo_link_c@4',
					['void', ['string']]
				],
				'setNotPeerTxt': [
					'_lum_sdk_set_not_peer_txt_c@4',
					['void', ['int']]
				],
				'setTosLink': [
					'_lum_sdk_set_tos_link_c@4',
					['void', ['string']]
				],
				'setTxtColor': [
					'_lum_sdk_set_txt_color_c@4',
					['void', ['string']]
				],
				'setTxtCulture': [
					'_lum_sdk_set_txt_culture_c@4',
					['void', ['string']]
				],
				'setBenefitTxt': [
					'_lum_sdk_set_benefit_txt_c@4',
					['void', ['string']]
				],					
				'uninit': [
					'_lum_sdk_uninit_c@0',
					['void', []]
				],
                'setChoiceChangeCallback': [
                    '_lum_sdk_set_choice_change_cb_c@4',
                    ['void', ['pointer']]
                ]
			}
		}
        const bindings = {}, start = this.time(), ks = Object.keys(this.table)
        ks.forEach((k) => {
            bindings[this.table[k][0]] = this.table[k][1]
        })
        this.debug && console.log('[bright sdk] Loading DLL: '+ this.dllPath)
        const lib = new this.ffi.Library(this.dllPath, bindings)
        this.loadTime = (this.time() - start)
        this.debug && console.log('[bright sdk] Lum library loaded in ' + this.loadTime + ' secs.')
        ks.forEach((k) => {
            this[k] = lib[this.table[k][0]]
        })
        process.nextTick(() => this.setupChoiceChangeCallback())
    }

	time(){
		return ((new Date()).getTime() / 1000)
	}

    setupChoiceChangeCallback() {
        if (!global.brd_sdk_choice_change_t) {
            global.brd_sdk_choice_change_t = new this.ffi.Callback('void', ['int'], () => {
                console.error('CHOICED')
                this.emit('choice')
            })
            this.setChoiceChangeCallback(global.brd_sdk_choice_change_t)
        }
    }
}

module.exports = BrightSDK