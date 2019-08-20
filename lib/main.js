"use strict";

module.exports = (__console) => {
	var ret = {}, time = () => { 
		return ((new Date()).getTime()/1000) 
	}
	if(__console){
		console = __console;
	} else {
		console = {} // fake console
		console.log = console.warn = console.error = () => {}
	}
	if(process.platform.substr(0, 3) == 'win'){
		var ffi = require('ffi'), ref = require('ref')
		if(ref){
			var tbl, intPtr = ref.refType('int'), arch =  (process.arch == 'ia32' ? 32 : 64);
			if(arch == 64){
				tbl = {
					'clearChoice': [
						'lum_sdk_clear_choice_c',
						['void', []]
					],
					'getChoice': [
						'lum_sdk_get_choice_c',
						['int', []]
					],
					'init': [
						'lum_sdk_init_c',
						['void', ['string']]
					],
					'initWait': [
						'lum_sdk_init_wait_c',
						['void', ['string']]
					],
					'initUI': [
						'lum_sdk_init_ui_c',
						['void', ['string']]
					],
					'initMonitor': [
						'lum_sdk_init_monitor_c',
						['void', ['string']]
					],
					'isSupported': [
						'lum_sdk_is_supported_c',
						['int', [intPtr]]
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
					'setDlgSize': [
						'lum_sdk_set_dlg_size_c',
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
					'setPeerTxt': [
						'lum_sdk_set_peer_txt_c',
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
					'setChoiceChangeCallback': [
						'lum_sdk_set_choice_change_cb_c',
						['void', ['pointer']]
					],
					'uninit': [
						'lum_sdk_uninit_c',
						['void', []]
					]
				}
			} else {
				tbl = {
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
					'initWait': [
						'_lum_sdk_init_wait_c@4',
						['void', ['string']]
					],
					'initUI': [
						'_lum_sdk_init_ui_c@4',
						['void', ['string']]
					],
					'initMonitor': [
						'_lum_sdk_init_monitor_c@4',
						['void', ['string']]
					],
					'isSupported': [
						'_lum_sdk_is_supported_c@0',
						['int', [intPtr]]
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
					'setDlgPosType': [
						'_lum_sdk_set_dlg_pos_type_c@4',
						['void', ['int']]
					],
					'setDlgSize': [
						'_lum_sdk_set_dlg_size_c@4',
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
					'setPeerTxt': [
						'_lum_sdk_set_peer_txt_c@4',
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
					'setChoiceChangeCallback': [
						'_lum_sdk_set_choice_change_cb_c@4',
						['void', ['pointer']]
					],
					'uninit': [
						'_lum_sdk_uninit_c@0',
						['void', []]
					]
				}
			}
			var bindings = {}, ret = {}
			if(ffi){
				console.log('[lum_sdk] FFI loaded.');
				var ks = Object.keys(tbl);
				ks.forEach((k) => { bindings[tbl[k][0]] = tbl[k][1] });
				console.log('[lum_sdk] Loading DLL');
				var start = time()
				var lum = new ffi.Library("../lum_sdk" + arch, bindings)
				console.log('[lum_sdk] Lum library loaded in '+(time() - start)+' secs.')
				ks.forEach((k) => { ret[k] = lum[tbl[k][0]] });
				ret.CHOICE_NONE = 0;
				ret.CHOICE_PEER = 1;
				ret.CHOICE_NOT_PEER = 2;
				ret.PEER_TXT_NO_ADS = 0;
				ret.PEER_TXT_PREMIUM = 1;
				ret.PEER_TXT_FREE = 2;
				ret.PEER_TXT_DONATE = 3;
				ret.PEER_TXT_I_AGREE = 4;
				ret.NOT_PEER_TXT_ADS = 0;
				ret.NOT_PEER_TXT_LIMITED = 1;
				ret.NOT_PEER_TXT_PREMIUM = 2;
				ret.NOT_PEER_TXT_NO_DONATE = 3;
				ret.NOT_PEER_TXT_NOT_AGREE = 4;
				ret.NOT_PEER_TXT_I_DISAGREE = 5;
				ret.NOT_PEER_TXT_SUBSCRIBE = 6;
				ret.NOT_PEER_TXT_BUY = 7;
				ret.DLG_POS_TYPE_CENTER_OWNER = 0;
				ret.DLG_POS_TYPE_CENTER_SCREEN = 1;
				ret.DLG_POS_TYPE_MANUAL = 2;
				ret.ffi = ffi;
				ret.ref = ref;
				ret.lib = lum;
			} else {
				console.error('[lum_sdk] No ffi module available.')
			}
		} else {
			console.error('[lum_sdk] No ref module available.')
		}
	} else {
		console.error('[lum_sdk] Windows only, for now at least.')
	}
	return ret;
}