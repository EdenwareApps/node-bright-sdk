"use strict";

class LuminatiSDK {
	constructor(consoleObj, dllPath){
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
		this.console = typeof(consoleObj) ? consoleObj : {log: () => {}, error: () => {}}
		this.arch = (process.arch == 'ia32' ? 32 : 64)
		this.dllPath = dllPath
		this.bindings = {}
		if(this.dllPath || typeof(this.dllPath) != 'string'){
			const path = require('path')
			this.dllPath = path.resolve('../lum_sdk' + this.arch +'.dll')
		}
		this.ffi = require('ffi')
		this.ref = require('ref')
		if(this.ref){
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
					'initAutorun': [
						'lum_sdk_init_autorun_c',
						['void', ['string']]
					],
					'init': [
						'lum_sdk_init_c',
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
					'initWait': [
						'lum_sdk_init_wait_c',
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
					'setAppName': [
						'lum_sdk_set_app_name_c',
						['void', ['string']]
					],
					'setBgColor': [
						'lum_sdk_set_bg_color_c',
						['void', ['string']]
					],
					'setBtnColor': [
						'lum_sdk_set_btn_color_c',
						['void', ['string']]
					],
					'setChoiceChangeCallback': [
						'lum_sdk_set_choice_change_cb_c',
						['void', ['pointer']]
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
						'lum_sdk_set_logo_link_c',
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
						'lum_sdk_set_txt_color_c',
						['void', ['string']]
					],
					'setTxtCulture': [
						'lum_sdk_set_txt_culture_c',
						['void', ['string']]
					],
					'setBenefitTxt': [
						'lum_sdk_set_benefit_txt_c',
						['void', ['string']]
					],	
					'uninit': [
						'lum_sdk_uninit_c',
						['void', []]
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
					'initAutorun': [
						'_lum_sdk_init_autorun_c@8',
						['void', ['string']]
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
					'initWait': [
						'_lum_sdk_init_wait_c@4',
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
					'setChoiceChangeCallback': [
						'_lum_sdk_set_choice_change_cb_c@4',
						['void', ['pointer']]
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
					]
				}
			}
			if(this.ffi){
				this.console.log('[lum_sdk] FFI loaded.')
				const start = this.time(), ks = Object.keys(this.table)
				ks.forEach((k) => {
					this.bindings[this.table[k][0]] = this.table[k][1]
				})
				this.console.log('[lum_sdk] Loading DLL', this.dllPath)
				const lum = new this.ffi.Library(this.dllPath, this.bindings)
				this.loadTime = (this.time() - start)
				this.console.log('[lum_sdk] Lum library loaded in ' + this.loadTime + ' secs.')
				ks.forEach((k) => {
					this[k] = lum[this.table[k][0]]
				})
			} else {
				this.console.error('[lum_sdk] No ffi module available.')
			}
		} else {
			this.console.error('[lum_sdk] No ref module available.')
		}
	}
	time(){
		return ((new Date()).getTime() / 1000)
	}
}


module.exports = (console, dllPath) => {	
	if(process.platform.substr(0, 3) == 'win'){
		return new LuminatiSDK(console, dllPath)
	} else {
		let err = new Error('[lum_sdk] Windows only for now.')
		if(console){
			console.error(err)
		}
		return err
	}
}