"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events = require("events");
var _module = require("module");
var _crossDirname = require("cross-dirname");
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var koffi = null;

/**
 * Loads the koffi module dynamically.
 * @returns {Object} The koffi module.
 * @throws {Error} If loading koffi fails.
 */
function getKoffi() {
  if (koffi) return koffi;
  try {
    var require = (0, _module.createRequire)((0, _crossDirname.getFilename)());
    var mod = require('koffi');
    koffi = mod["default"] || mod;
    return koffi;
  } catch (err) {
    console.error('Failed to load koffi:', err);
    throw new Error("Failed to load koffi: ".concat(err.message));
  }
}
function mapType(t) {
  if (t === 'string') return 'char *';
  if (t === 'int *') return 'int *';
  if (!t || t === 'void') return 'void *';
  return t;
}
var BrightSDK = exports["default"] = /*#__PURE__*/function (_EventEmitter) {
  function BrightSDK() {
    var _this;
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BrightSDK);
    _this = _callSuper(this, BrightSDK);
    _this.debug = !!opts.debug;
    _this.arch = process.arch === 'ia32' ? 32 : 64;
    _this.dllPath = opts.dllPath || _this.getDefaultDllPath(opts.dir);
    _this.functions = {};
    _this.userChoiceCallback = null;
    _this.lib = null;
    _this._choiceCbHandle = null;
    _this.conv = _this.arch === 32 ? '__stdcall ' : '';
    _this.tableDef = {
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
    _this.CHOICE_NONE = 0;
    _this.CHOICE_PEER = 1;
    _this.CHOICE_NOT_PEER = 2;
    _this.DLG_POS_TYPE_CENTER_OWNER = 0;
    if (!opts.skipPreparing) {
      _this.prepare()["catch"](function (err) {
        return console.error('Failed to prepare BrightSDK:', err);
      });
    }
    return _this;
  }

  /**
   * Generates the default DLL path if not provided.
   * @param {string} [dir] - Optional directory path.
   * @returns {string} The normalized DLL path.
   */
  _inherits(BrightSDK, _EventEmitter);
  return _createClass(BrightSDK, [{
    key: "getDefaultDllPath",
    value: function getDefaultDllPath(dir) {
      return _path["default"].join(dir || _path["default"].dirname(process.execPath), "lum_sdk".concat(this.arch, ".dll")).replace(/\\/g, '/');
    }

    /**
     * Retrieves the consent choice callback prototype based on architecture.
     * @param {number} arch - The architecture (32 or 64).
     * @returns {Object} The koffi prototype.
     */
  }, {
    key: "getProtoDef",
    value: function getProtoDef(fn) {
      var asString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.tableDef[fn]) {
        throw new Error("Function ".concat(fn, " not found in tableDef"));
      }
      var k = getKoffi();
      var _this$tableDef$fn = _slicedToArray(this.tableDef[fn], 2),
        fnName = _this$tableDef$fn[0],
        _this$tableDef$fn$ = _slicedToArray(_this$tableDef$fn[1], 2),
        retType = _this$tableDef$fn$[0],
        paramTypes = _this$tableDef$fn$[1];
      var ret = mapType(retType);
      var params = paramTypes.map(mapType);
      if (asString) {
        var conv = String(this.conv);
        var sig = "".concat(ret, " ").concat(conv).concat(fnName, "(").concat(params.join(', '), ")");
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
    key: "prepare",
    value: (function () {
      var _prepare = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this2 = this,
          _this$lib;
        var k, _loop, key, protoArgs, ChoiceChangeCallback, proto, protoPointer, cbName;
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.lib) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              k = getKoffi();
              _context2.prev = 3;
              this.lib = k.load(this.dllPath);
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](3);
              throw new Error("Failed to load DLL at ".concat(this.dllPath, ": ").concat(_context2.t0.message));
            case 10:
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(key) {
                return _regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _this2.functions[key] = _this2.lib.func(_this2.getProtoDef(key, true));
                      _this2[key] = function () {
                        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                          args[_key] = arguments[_key];
                        }
                        if (_this2.debug) console.log("Calling ".concat(key), args);
                        return new Promise(function (resolve, reject) {
                          var _this2$functions$key;
                          (_this2$functions$key = _this2.functions[key]).async.apply(_this2$functions$key, args.concat([function (err, val) {
                            if (_this2.debug) console.log("Called ".concat(key), {
                              err: err,
                              val: val
                            });
                            err ? reject(err) : resolve(val);
                          }]));
                        });
                      };
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _loop);
              });
              _context2.t1 = _regeneratorRuntime().keys(this.tableDef);
            case 12:
              if ((_context2.t2 = _context2.t1()).done) {
                _context2.next = 17;
                break;
              }
              key = _context2.t2.value;
              return _context2.delegateYield(_loop(key), "t3", 15);
            case 15:
              _context2.next = 12;
              break;
            case 17:
              // Register choice callback
              protoArgs = ['ChoiceChangeCallback', 'void', ['int']];
              ChoiceChangeCallback = function ChoiceChangeCallback(ret) {
                if (_this2.debug) console.log('Choice change callback', {
                  ret: ret
                });
                process.nextTick(function () {
                  try {
                    _this2.emit('choice', ret);
                  } catch (err) {
                    console.error('Error in choice change callback:', err);
                  }
                });
              };
              if (this.arch === 32) {
                protoArgs.unshift('__stdcall');
              }
              proto = k.proto.apply(k, protoArgs);
              protoPointer = k.pointer(proto); // Map JavaScript types to C types
              cbName = ['brd_sdk_set_choice_change_cb_c'];
              if (this.conv) {
                cbName.unshift(this.conv.trim());
              }
              this.functions.setChoiceChangeCallback = (_this$lib = this.lib).func.apply(_this$lib, cbName.concat(['void', [protoPointer]]));
              this._choiceCbHandle = k.register(ChoiceChangeCallback, protoPointer);
              _context2.next = 28;
              return new Promise(function (resolve, reject) {
                _this2.functions.setChoiceChangeCallback.async(_this2._choiceCbHandle, function (err) {
                  if (err) {
                    console.error('Failed to register choice change callback:', err);
                    reject(new Error('Failed to register choice change callback'));
                  } else {
                    if (_this2.debug) console.log('Choice change callback registered');
                    resolve();
                  }
                });
              });
            case 28:
            case "end":
              return _context2.stop();
          }
        }, _callee, this, [[3, 7]]);
      }));
      function prepare() {
        return _prepare.apply(this, arguments);
      }
      return prepare;
    }()
    /**
     * Sets a custom choice change callback.
     * @param {Function} cb - The callback function.
     */
    )
  }, {
    key: "setChoiceChangeCallback",
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
    key: "uninit",
    value: (function () {
      var _uninit = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              if (this._choiceCbHandle) {
                getKoffi().unregister(this._choiceCbHandle);
                this._choiceCbHandle = null;
              }
              if (!this.functions.close) {
                _context3.next = 5;
                break;
              }
              _context3.next = 5;
              return this.close();
            case 5:
              _context3.next = 11;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.error('Error during uninitialization:', _context3.t0);
              throw new Error("Uninitialization failed: ".concat(_context3.t0.message));
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee2, this, [[0, 7]]);
      }));
      function uninit() {
        return _uninit.apply(this, arguments);
      }
      return uninit;
    }())
  }]);
}(_events.EventEmitter);
