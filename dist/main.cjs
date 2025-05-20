"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events = require("events");
var _module = require("module");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var _require = (0, _module.createRequire)(import.meta.url);

//
// 1) Koffi loading
//
var koffi = null;
function loadKoffi() {
  if (koffi) return koffi;
  try {
    var mod = _require('koffi');
    koffi = mod["default"] || mod;
    return koffi;
  } catch (err) {
    console.error('Erro ao carregar koffi:', err);
    throw err;
  }
}

//
// 2) Choice change callback proto
//
var ChoiceChangeProto32 = null;
var ChoiceChangeProto64 = null;
function getChoiceProto(arch) {
  var k = loadKoffi();
  if (arch === 32) {
    if (!ChoiceChangeProto32) {
      ChoiceChangeProto32 = k.proto('__stdcall', 'ChoiceChangeCallback', 'void', ['int']);
    }
    return ChoiceChangeProto32;
  } else {
    if (!ChoiceChangeProto64) {
      ChoiceChangeProto64 = k.proto('ChoiceChangeCallback', 'void', ['int']);
    }
    return ChoiceChangeProto64;
  }
}
var BrightSDK = exports["default"] = /*#__PURE__*/function (_EventEmitter) {
  function BrightSDK() {
    var _this;
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BrightSDK);
    _this = _callSuper(this, BrightSDK);
    _this.debug = !!opts.debug;
    _this.arch = process.arch === 'ia32' ? 32 : 64;
    _this.dllPath = opts.dllPath || '';
    _this.promises = {};
    _this.CHOICE_NONE = 0;
    _this.CHOICE_PEER = 1;
    _this.CHOICE_NOT_PEER = 2;
    _this.PEER_TXT_NO_ADS = 0;
    _this.PEER_TXT_PREMIUM = 1;
    _this.PEER_TXT_FREE = 2;
    _this.PEER_TXT_DONATE = 3;
    _this.PEER_TXT_I_AGREE = 4;
    _this.NOT_PEER_TXT_ADS = 0;
    _this.NOT_PEER_TXT_LIMITED = 1;
    _this.NOT_PEER_TXT_PREMIUM = 2;
    _this.NOT_PEER_TXT_NO_DONATE = 3;
    _this.NOT_PEER_TXT_NOT_AGREE = 4;
    _this.NOT_PEER_TXT_I_DISAGREE = 5;
    _this.NOT_PEER_TXT_SUBSCRIBE = 6;
    _this.NOT_PEER_TXT_BUY = 7;
    _this.NOT_PEER_TXT_NO_THANK_YOU = 9;
    _this.DLG_POS_TYPE_CENTER_OWNER = 0;

    // mount default path if not provided in opts
    if (!_this.dllPath) {
      var path = _require('path');
      _this.dllPath = path.join(opts.dir || path.dirname(process.execPath), 'lum_sdk' + _this.arch + '.dll').replace(/\\/g, '/');
    }
    opts.skipPreparing || _this.prepare();
    _this.on('choice', function (choice) {
      console.log('[BrightSDK] inner choice', choice);
    });
    return _this;
  }
  _inherits(BrightSDK, _EventEmitter);
  return _createClass(BrightSDK, [{
    key: "prepare",
    value: function prepare() {
      var _this2 = this;
      if (this.lib) return;
      var k = loadKoffi();
      this.lib = k.load(this.dllPath);

      // Debounce function to limit calls to getChoice
      var debounce = function debounce(func, delay) {
        var timeoutId;
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          clearTimeout(timeoutId);
          timeoutId = setTimeout(function () {
            return func.apply(void 0, args);
          }, delay);
        };
      };
      var ChoiceChangeCallback = debounce(function (ret) {
        // gave up on getting choice directly, so we'll use the promise
        _this2.promises.getChoice().then(function (choice) {
          console.log('[BrightSDK] choiceChangeCallback', choice);
          _this2.emit('choice', choice);
        })["catch"](function (err) {
          console.error('[BrightSDK] Erro ao decodificar choiceChangeCallback:', err);
        });
      }, 100); // 100ms delay
      var proto = getChoiceProto(this.arch);
      var protoPointer = k.pointer(proto);

      // 3) Helper function to map JS types to C
      var mapType = function mapType(t) {
        if (t === 'string') return 'char *';
        if (t === 'int *') return 'int *';
        if (!t || t === 'void') return 'void *';
        return t;
      };

      // 4) DLL functions table
      var tableDef = {
        // just x86 table, x64 table will be auto generated from it
        'checkSupported': ['_lum_sdk_check_supported@0', ['void', []]],
        'clearChoice': ['_lum_sdk_clear_choice_c@0', ['void', []]],
        'getChoice': ['_lum_sdk_get_choice_c@0', ['int', []]],
        'init': ['_lum_sdk_init_c@4', ['void', ['string']]],
        'initMonitor': ['_lum_sdk_init_monitor_c@4', ['void', ['string']]],
        'initUI': ['_lum_sdk_init_ui_c@4', ['void', ['string']]],
        'isSupported2': ['_lum_sdk_is_supported2_c@8', ['int', ['int *']]],
        'isSupported': ['_lum_sdk_is_supported_c@0', ['int', ['int *']]],
        'setSkipConsentOnInit': ['_brd_sdk_set_skip_consent_on_init_c@4', ['void', ['bool']]],
        'setAppName': ['_brd_sdk_set_app_name_c@4', ['void', ['string']]],
        'setBgColor': ['_brd_sdk_set_bg_color_c@4', ['void', ['string']]],
        'setBtnColor': ['_brd_sdk_set_btn_color_c@4', ['void', ['string']]],
        'setDlgPos': ['_lum_sdk_set_dlg_pos_c@16', ['void', ['int']]],
        'setDlgPosType': ['_lum_sdk_set_dlg_pos_type_c@4', ['void', ['int']]],
        'setLogoLink': ['_brd_sdk_set_logo_link_c@4', ['void', ['string']]],
        'setNotPeerTxt': ['_lum_sdk_set_not_peer_txt_c@4', ['void', ['int']]],
        'setTosLink': ['_lum_sdk_set_tos_link_c@4', ['void', ['string']]],
        'setTxtColor': ['_lum_sdk_set_txt_color_c@4', ['void', ['string']]],
        'setTxtCulture': ['_lum_sdk_set_txt_culture_c@4', ['void', ['string']]],
        'setBenefitTxt': ['_lum_sdk_set_benefit_txt_c@4', ['void', ['string']]],
        'uninit': ['_lum_sdk_uninit_c@0', ['void', []]]
      };

      // 5) Register each function (sync + async)
      var cbEndpoint = this.arch === 32 ? '_lum_sdk_set_choice_change_cb_c@4' : 'lum_sdk_set_choice_change_cb_c';
      this.setChoiceChangeCallback = this.lib.func(cbEndpoint, 'void', [protoPointer]);
      this.promises.setChoiceChangeCallback = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return new Promise(function (res, rej) {
          var _this2$setChoiceChang;
          (_this2$setChoiceChang = _this2.setChoiceChangeCallback).async.apply(_this2$setChoiceChang, args.concat([function (err, val) {
            if (err) rej(err);else res(val);
          }]));
        });
      };
      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          _Object$entries$_i$ = _slicedToArray(_Object$entries$_i[1], 2),
          fnName = _Object$entries$_i$[0],
          _Object$entries$_i$$ = _slicedToArray(_Object$entries$_i$[1], 2),
          retType = _Object$entries$_i$$[0],
          paramTypes = _Object$entries$_i$$[1];
        var ret = mapType(retType);
        var params = paramTypes.map(mapType);
        var paramList = params.length === 0 ? '' : params.join(', ');
        var conv = _this2.arch === 32 ? '__stdcall ' : '';
        var pureName = _this2.arch === 32 ? fnName : fnName.split('@').shift().replace(/^_/, '');
        var sig = "".concat(ret, " ").concat(conv).concat(pureName, "(").concat(paramList, ")");
        _this2[key] = _this2.lib.func(sig);
        _this2.promises[key] = function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          return new Promise(function (res, rej) {
            var _this2$key;
            return (_this2$key = _this2[key]).async.apply(_this2$key, args.concat([function (err, val) {
              return err ? rej(err) : res(val);
            }]));
          });
        };
      };
      for (var _i = 0, _Object$entries = Object.entries(tableDef); _i < _Object$entries.length; _i++) {
        _loop();
      }

      // 6) Choice callback (registered)
      var cb = this._choiceCbHandle = k.register(ChoiceChangeCallback, protoPointer);
      // pass to DLL in a synchronous way
      this.setChoiceChangeCallback(cb);
    }
  }, {
    key: "time",
    value: function time() {
      return Date.now() / 1000;
    }
  }, {
    key: "uninit",
    value: function uninit() {
      // unregister callback to free slot
      if (this._choiceCbHandle) {
        loadKoffi().unregister(this._choiceCbHandle);
        this._choiceCbHandle = null;
      }
      // call uninit from DLL (async)
      return this.promises.uninit()["catch"](function (err) {
        return console.error('Error in uninit:', err);
      });
    }
  }]);
}(_events.EventEmitter);