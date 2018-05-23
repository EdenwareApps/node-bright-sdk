"use strict";

if(process.platform.substr(0, 3) == 'win'){
	var ref = require('ref');
	if(ref){
		var intPtr = ref.refType('int *');
		var tbl = {
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
				['int', ['int *']]
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
		};
		var bindings = {}, ret = {}, ffi = require('ffi');
		if(ffi){
			//console.log('[lum_sdk] FFI loaded.');
			var ks = Object.keys(tbl);
			ks.forEach((k) => { bindings[tbl[k][0]] = tbl[k][1] });
			var lum = new ffi.Library("lum_sdk" + (process.arch == 'ia32' ? '32' : '64'), bindings);
			//console.log('[lum_sdk] Lum library loaded.');
			ks.forEach((k) => { exports[k] = lum[tbl[k][0]] });
			exports.CHOICE_NONE = 0;
			exports.CHOICE_PEER = 1;
			exports.CHOICE_NOT_PEER = 2;
			exports.PEER_TXT_NO_ADS = 0;
			exports.PEER_TXT_PREMIUM = 1;
			exports.PEER_TXT_FREE = 2;
			exports.PEER_TXT_DONATE = 3;
			exports.PEER_TXT_I_AGREE = 4;
			exports.NOT_PEER_TXT_ADS = 0;
			exports.NOT_PEER_TXT_LIMITED = 1;
			exports.NOT_PEER_TXT_PREMIUM = 2;
			exports.NOT_PEER_TXT_NO_DONATE = 3;
			exports.NOT_PEER_TXT_NOT_AGREE = 4;
			exports.NOT_PEER_TXT_I_DISAGREE = 5;
			exports.ffi = ffi;
			exports.ref = ref;
		} else {
			throw new Error('[lum_sdk] No ffi module available.');
		}
	} else {
		throw new Error('[lum_sdk] No ref module available.');
	}
} else {
	throw new Error('[lum_sdk] Windows only, for now at least.')
}
