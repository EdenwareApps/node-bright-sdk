"use strict";

var ref = require('ref');
if(ref){
	var intPtr = ref.refType('int');
	var tbl = {
		'clear_choice': [
			'?lum_sdk_clear_choice@@YGXXZ',
			['void', []]
		],
		'get_choice': [
			'?lum_sdk_get_choice@@YGHXZ',
			['int', []]
		],
		'get_hwnd': [
			'?lum_sdk_get_hwnd@@YGHXZ',
			['int32', []]
		],
		'init': [
			'?lum_sdk_init@@YGXPAD@Z',
			['void', ['string']]
		],
		'is_supported': [
			'_lum_sdk_is_supported_c@0',
			['void', [intPtr]]
		],
		'is_supported2': [
			'_lum_sdk_is_supported2_c@4',
			['void', [intPtr]]
		],
		'is_supported3': [
			'?lum_sdk_is_supported@@YGHXZ',
			['void', [intPtr]]
		],
		'is_supported4': [
			'?lum_sdk_is_supported2@@YGHPAH@Z',
			['void', [intPtr]]
		],
		'set_app_name': [
			'?lum_sdk_set_app_name@@YGXPAD@Z',
			['void', ['string']]
		],
		'set_bg_color': [
			'?lum_sdk_set_bg_color@@YGXPAD@Z',
			['void', ['string']]
		],
		'set_btn_color': [
			'?lum_sdk_set_btn_color@@YGXPAD@Z',
			['void', ['string']]
		],
		'set_dlg_size': [
			'?lum_sdk_set_dlg_size@@YGXH@Z',
			['void', ['int']]
		],
		'set_logo_link': [
			'?lum_sdk_set_logo_link@@YGXPAD@Z',
			['void', ['string']]
		],
		'set_not_peer_txt': [
			'?lum_sdk_set_not_peer_txt@@YGXW4not_peer_txt_t@@@Z',
			['void', ['string']]
		],
		'set_parent': [
			'?lum_sdk_set_parent@@YGXH@Z',
			['int32', []]
		],
		'set_peer_txt': [
			'?lum_sdk_set_peer_txt@@YGXW4peer_txt_t@@@Z',
			['void', ['string']]
		],
		'set_tos_link': [
			'?lum_sdk_set_tos_link@@YGXPAD@Z',
			['void', ['string']]
		],
		'set_txt_color': [
			'?lum_sdk_set_txt_color@@YGXPAD@Z',
			['void', ['string']]
		],
		'uninit': [
			'?lum_sdk_uninit@@YGXXZ',
			['void', []]
		]
	};
	var bindings = {}, ret = {}, ffi = require('ffi');
	if(ffi){
		// console.log('FFI loaded.');
		Object.values(tbl).forEach((e) => { bindings[e[0]] = e[1] });
		var lum = new ffi.Library("lum_sdk" + (process.arch == 'ia32' ? '32' : '64'), bindings);
		// console.log('Lum library loaded.');
		Object.keys(tbl).forEach((k) => {
			exports[k] = lum[tbl[k][0]];
		});
	} else {
		console.error('No ref module available');
	}
} else {
	console.error('No ref module available');
}
