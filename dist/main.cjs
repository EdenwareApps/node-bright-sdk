'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _module2 = require('module');

var _crossDirname = require('cross-dirname');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var koffi = null;

/**
 * Loads the koffi module dynamically.
 * @returns {Object} The koffi module.
 * @throws {Error} If loading koffi fails.
 */
function getKoffi() {
	if (koffi) return koffi;
	try {
		var _require = (0, _module2.createRequire)((0, _crossDirname.getFilename)());
		var mod = _require('koffi');
		koffi = mod['default'] || mod;
		return koffi;
	} catch (err) {
		console.error('Failed to load koffi:', err);
		throw new Error('Failed to load koffi: ' + err.message);
	}
}

function mapType(t) {
	if (t === 'string') return 'char *';
	if (t === 'int *') return 'int *';
	if (!t || t === 'void') return 'void *';
	return t;
}

var BrightSDK = (function (_EventEmitter) {
	_inherits(BrightSDK, _EventEmitter);

	function BrightSDK() {
		var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, BrightSDK);

		_get(Object.getPrototypeOf(BrightSDK.prototype), 'constructor', this).call(this);
		this.debug = !!opts.debug;
		this.arch = process.arch === 'ia32' ? 32 : 64;
		this.dllPath = opts.dllPath || this.getDefaultDllPath(opts.dir);
		this.functions = {};
		this.userChoiceCallback = null;
		this.lib = null;
		this._choiceCbHandle = null;
		this.conv = this.arch === 32 ? '__stdcall ' : '';
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
		};

		// Consent choice constants
		this.CHOICE_NONE = 0;
		this.CHOICE_PEER = 1;
		this.CHOICE_NOT_PEER = 2;
		this.DLG_POS_TYPE_CENTER_OWNER = 0;

		if (!opts.skipPreparing) {
			this.prepare()['catch'](function (err) {
				return console.error('Failed to prepare BrightSDK:', err);
			});
		}
	}

	/**
  * Generates the default DLL path if not provided.
  * @param {string} [dir] - Optional directory path.
  * @returns {string} The normalized DLL path.
  */

	_createClass(BrightSDK, [{
		key: 'getDefaultDllPath',
		value: function getDefaultDllPath(dir) {
			return _path2['default'].join(dir || _path2['default'].dirname(process.execPath), 'lum_sdk' + this.arch + '.dll').replace(/\\/g, '/');
		}

		/**
   * Retrieves the consent choice callback prototype based on architecture.
   * @param {number} arch - The architecture (32 or 64).
   * @returns {Object} The koffi prototype.
   */
	}, {
		key: 'getProtoDef',
		value: function getProtoDef(fn) {
			var asString = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			if (!this.tableDef[fn]) {
				throw new Error('Function ' + fn + ' not found in tableDef');
			}

			var k = getKoffi();

			var _tableDef$fn = _slicedToArray(this.tableDef[fn], 2);

			var fnName = _tableDef$fn[0];

			var _tableDef$fn$1 = _slicedToArray(_tableDef$fn[1], 2);

			var retType = _tableDef$fn$1[0];
			var paramTypes = _tableDef$fn$1[1];

			var ret = mapType(retType);
			var params = paramTypes.map(mapType);

			if (asString) {
				var conv = String(this.conv);
				var sig = ret + ' ' + conv + fnName + '(' + params.join(', ') + ')';
				console.log('sig', sig);
				return sig;
			}

			var args = [fnName, ret, params];
			if (this.arch === 32) {
				args.unshift(this.conv);
			}

			return k.proto.apply(k, args);
		}

		/**
   * Prepares the SDK by loading the DLL and registering functions.
   * @returns {Promise<void>}
   */
	}, {
		key: 'prepare',
		value: function prepare() {
			var _lib;

			var k, _loop, key, protoArgs, ChoiceChangeCallback, proto, protoPointer, cbName;

			return regeneratorRuntime.async(function prepare$(context$2$0) {
				var _this = this;

				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (!this.lib) {
							context$2$0.next = 2;
							break;
						}

						return context$2$0.abrupt('return');

					case 2:
						k = getKoffi();
						context$2$0.prev = 3;

						this.lib = k.load(this.dllPath);
						context$2$0.next = 10;
						break;

					case 7:
						context$2$0.prev = 7;
						context$2$0.t0 = context$2$0['catch'](3);
						throw new Error('Failed to load DLL at ' + this.dllPath + ': ' + context$2$0.t0.message);

					case 10:
						_loop = function (key) {
							_this.functions[key] = _this.lib.func(_this.getProtoDef(key, true));
							_this[key] = function () {
								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
									args[_key] = arguments[_key];
								}

								if (_this.debug) console.log('Calling ' + key, args);
								return new Promise(function (resolve, reject) {
									var _functions$key;

									(_functions$key = _this.functions[key]).async.apply(_functions$key, args.concat([function (err, val) {
										if (_this.debug) console.log('Called ' + key, { err: err, val: val });
										err ? reject(err) : resolve(val);
									}]));
								});
							};
						};

						// Register DLL functions
						for (key in this.tableDef) {
							_loop(key);
						}

						// Register choice callback
						protoArgs = ['ChoiceChangeCallback', 'void', ['int']];

						ChoiceChangeCallback = function ChoiceChangeCallback(ret) {
							if (_this.debug) console.log('Choice change callback', { ret: ret });
							process.nextTick(function () {
								try {
									_this.emit('choice', ret);
								} catch (err) {
									console.error('Error in choice change callback:', err);
								}
							});
						};

						if (this.arch === 32) {
							protoArgs.unshift('__stdcall');
						}
						proto = k.proto.apply(k, protoArgs);
						protoPointer = k.pointer(proto);
						cbName = ['brd_sdk_set_choice_change_cb_c'];

						if (this.conv) {
							cbName.unshift(this.conv.trim());
						}
						this.functions.setChoiceChangeCallback = (_lib = this.lib).func.apply(_lib, cbName.concat(['void', [protoPointer]]));
						this._choiceCbHandle = k.register(ChoiceChangeCallback, protoPointer);
						context$2$0.next = 23;
						return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
							_this.functions.setChoiceChangeCallback.async(_this._choiceCbHandle, function (err) {
								if (err) {
									console.error('Failed to register choice change callback:', err);
									reject(new Error('Failed to register choice change callback'));
								} else {
									if (_this.debug) console.log('Choice change callback registered');
									resolve();
								}
							});
						}));

					case 23:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this, [[3, 7]]);
		}

		/**
   * Sets a custom choice change callback.
   * @param {Function} cb - The callback function.
   */
	}, {
		key: 'setChoiceChangeCallback',
		value: function setChoiceChangeCallback(cb) {
			if (this.userChoiceCallback) {
				this.removeListener('choice', this.userChoiceCallback);
			}
			this.userChoiceCallback = cb;
			this.on('choice', cb);
		}

		/**
   * Uninitializes the SDK, freeing resources.
   * @returns {Promise<void>}
   */
	}, {
		key: 'uninit',
		value: function uninit() {
			return regeneratorRuntime.async(function uninit$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						context$2$0.prev = 0;

						if (this._choiceCbHandle) {
							getKoffi().unregister(this._choiceCbHandle);
							this._choiceCbHandle = null;
						}

						if (!this.functions.close) {
							context$2$0.next = 5;
							break;
						}

						context$2$0.next = 5;
						return regeneratorRuntime.awrap(this.close());

					case 5:
						context$2$0.next = 11;
						break;

					case 7:
						context$2$0.prev = 7;
						context$2$0.t0 = context$2$0['catch'](0);

						console.error('Error during uninitialization:', context$2$0.t0);
						throw new Error('Uninitialization failed: ' + context$2$0.t0.message);

					case 11:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this, [[0, 7]]);
		}
	}]);

	return BrightSDK;
})(_events.EventEmitter);

exports['default'] = BrightSDK;
module.exports = exports['default'];

// Map JavaScript types to C types
