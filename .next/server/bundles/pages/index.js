module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./abi/metadata.json":
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_name","type":"string"},{"name":"_logo_ipfs","type":"string"}],"name":"addAddress","outputs":[{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_name","type":"string"},{"name":"_logo_ipfs","type":"string"}],"name":"addByOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getMeOffTheFuckingList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"lootDonationBox","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"adresses","outputs":[{"name":"_address","type":"address"},{"name":"_name","type":"string"},{"name":"_logo_ipfs","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"address"}],"name":"getByAddress","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getByIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"keys","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

/***/ }),

/***/ "./js/metadata.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetaDataContract; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethjs__ = __webpack_require__("ethjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ethjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_eip55__ = __webpack_require__("eip55");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_eip55___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_eip55__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abi_metadata_json__ = __webpack_require__("./abi/metadata.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abi_metadata_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__abi_metadata_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ipfs_mini__ = __webpack_require__("ipfs-mini");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ipfs_mini___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ipfs_mini__);


function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var reader = {};
var eth = new __WEBPACK_IMPORTED_MODULE_1_ethjs___default.a(new __WEBPACK_IMPORTED_MODULE_1_ethjs___default.a.HttpProvider("https://ropsten.infura.io"));
var ipfs = new __WEBPACK_IMPORTED_MODULE_4_ipfs_mini___default.a({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

var MetaDataContract =
/*#__PURE__*/
function () {
  function MetaDataContract() {
    _classCallCheck(this, MetaDataContract);

    this.contract_address = "0x7f0b2a8c93db220637f835ef075e3dbc17beff7d";
    this.contract = eth.contract(__WEBPACK_IMPORTED_MODULE_3__abi_metadata_json___default.a).at(this.contract_address);
    this.price = 0;
    console.log("constructed");
    reader = new FileReader(); // uncomment to enable MetaMask support:

    if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
      eth.setProvider(window.web3.currentProvider);
      console.log("metamask!");
    } else {
      // keep current infura provider
      console.log("yay");
    }
  }

  _createClass(MetaDataContract, [{
    key: "getPrice",
    value: function () {
      var _getPrice = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee() {
        var _this = this;

        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.contract.getPrice().then(function (result) {
                  console.log(result[0]);
                  _this.price = result[0];
                  return __WEBPACK_IMPORTED_MODULE_1_ethjs___default.a.fromWei(result[0], "ether");
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getPrice() {
        return _getPrice.apply(this, arguments);
      };
    }()
  }, {
    key: "getAddress",
    value: function () {
      var _getAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2(address) {
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.contract.getByAddress(__WEBPACK_IMPORTED_MODULE_2_eip55___default.a.encode(address)).then(function (result) {
                  console.log(result);
                  result[0] = __WEBPACK_IMPORTED_MODULE_2_eip55___default.a.encode(result[0]);
                  return {
                    address: result[0],
                    name: result[1],
                    image: result[2]
                  };
                }).catch(function (err) {
                  console.error(err);
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getAddress(_x) {
        return _getAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "lookUp",
    value: function () {
      var _lookUp = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3(address, callback) {
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ipfs.cat(address, function (err, result) {
                  console.log(result);
                  callback(result);
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function lookUp(_x2, _x3) {
        return _lookUp.apply(this, arguments);
      };
    }()
  }, {
    key: "convertBlobToBase64",
    value: function () {
      var _convertBlobToBase = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee4(blob) {
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log(blob);
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  reader.onerror = function () {
                    reader.abort();
                    reject(new DOMException("Problem parsing input file."));
                  };

                  reader.onload = function () {
                    resolve(reader.result);
                  };

                  console.log(blob);
                  reader.readAsDataURL(blob[0]);
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function convertBlobToBase64(_x4) {
        return _convertBlobToBase.apply(this, arguments);
      };
    }()
  }, {
    key: "addMetaData",
    value: function () {
      var _addMetaData = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee5(address, name, image) {
        var _this2 = this;

        var base64;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.convertBlobToBase64(image);

              case 2:
                base64 = _context5.sent;
                return _context5.abrupt("return", new Promise(function (resolve, reject) {
                  ipfs.add(base64, function (err, result) {
                    console.log(result);
                    if (err) reject(new DOMException("Couldn't add metadata to IPFS"));
                    return _this2.contract.addAddress(address, name, result, {
                      from: web3.eth.accounts[0],
                      value: _this2.price
                    }).then(function (result) {
                      resolve(result);
                    }).catch(function (err) {
                      reject(err);
                    });
                  });
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function addMetaData(_x5, _x6, _x7) {
        return _addMetaData.apply(this, arguments);
      };
    }()
  }]);

  return MetaDataContract;
}();



/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_metadata_js__ = __webpack_require__("./js/metadata.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_next_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_typography__ = __webpack_require__("react-typography");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_typography___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_typography__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_typography__ = __webpack_require__("typography");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_typography___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_typography__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_typography_theme_github__ = __webpack_require__("typography-theme-github");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_typography_theme_github___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_typography_theme_github__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__material_ui_core_Button__ = __webpack_require__("@material-ui/core/Button");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__material_ui_core_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__material_ui_core_Button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__material_ui_core_TextField__ = __webpack_require__("@material-ui/core/TextField");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__material_ui_core_TextField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__material_ui_core_TextField__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__material_ui_core_Paper__ = __webpack_require__("@material-ui/core/Paper");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__material_ui_core_Paper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__material_ui_core_Paper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_json_pretty__ = __webpack_require__("react-json-pretty");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_json_pretty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_json_pretty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_magic_dropzone__ = __webpack_require__("react-magic-dropzone");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_magic_dropzone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_magic_dropzone__);

var _jsxFileName = "/Users/alexander/Node/ethtective.cafe/pages/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }











__WEBPACK_IMPORTED_MODULE_6_typography_theme_github___default.a.headerFontFamily = ["Roboto", "sans-serif"];
__WEBPACK_IMPORTED_MODULE_6_typography_theme_github___default.a.bodyFontFamily = ["Roboto", "sans-serif"];
__WEBPACK_IMPORTED_MODULE_6_typography_theme_github___default.a.headerWeight = 300;
__WEBPACK_IMPORTED_MODULE_6_typography_theme_github___default.a.bodyWeight = 300;

__WEBPACK_IMPORTED_MODULE_6_typography_theme_github___default.a.overrideThemeStyles = function (_ref, options) {
  var rhythm = _ref.rhythm;
  return {
    "h1,h2,h3,h4": {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontWeight: 300
    },
    body: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontWeight: 300
    }
  };
};

var typography = new __WEBPACK_IMPORTED_MODULE_5_typography___default.a(__WEBPACK_IMPORTED_MODULE_6_typography_theme_github___default.a);
var metaData = {};

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "onInputChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        var _value = _asyncToGenerator(
        /*#__PURE__*/
        __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(e) {
          return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log(e.target.value);

                  _this.setState({
                    address: e.target.value
                  });

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function value(_x) {
          return _value.apply(this, arguments);
        };
      }()
    });
    Object.defineProperty(_assertThisInitialized(_this), "onViewAddress", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        console.log("pressed");
        metaData.getAddress(_this.state.address).then(function (response) {
          console.log(response);

          if (response.image) {
            var ipfs = metaData.lookUp(response.image, function (result) {
              var image = result;
              response.image = image;

              _this.setState({
                metadata: response
              });
            });
          } else {
            _this.setState({
              metadata: response
            });
          }
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onSubmit", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        console.log("pressed");
        metaData.addMetaData(_this.state.saveAddress, _this.state.saveName, _this.state.file);

        _this.setState({
          address: _this.state.saveAddress
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "onDrop", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(accepted, rejected, links) {
        console.log(accepted);

        _this.setState({
          file: accepted
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleSaveChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(prop) {
        return function (event) {
          _this.setState(_defineProperty({}, prop, event.target.value));

          console.log(_this.state);
        };
      }
    });
    _this.state = {
      address: "0x09ca59e18c58f25b092a0f2670928f5d0656a331",
      metadata: {
        address: "",
        name: "",
        image: ""
      },
      price: "NaN"
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      metaData = new __WEBPACK_IMPORTED_MODULE_2__js_metadata_js__["a" /* default */]();
      metaData.getPrice().then(function (result) {
        console.log(result);

        _this2.setState({
          price: result
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        "class": "markdown",
        style: {
          maxWidth: "42rem",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "1.5rem 1.125rem",
          paddingTop: "1.5rem"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_next_head___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_typography__["TypographyStyle"], {
        typography: typography,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_typography__["GoogleFont"], {
        typography: typography,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      })), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, "Metadata Uploader"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }, "Upload the following metadata for ", this.state.price, " Eth:"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("form", {
        "class": "",
        noValidate: true,
        autoComplete: "off",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__material_ui_core_TextField___default.a, {
        fullWidth: true,
        label: "Address",
        onChange: this.handleSaveChange("saveAddress"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__material_ui_core_TextField___default.a, {
        fullWidth: true,
        label: "Name",
        onChange: this.handleSaveChange("saveName"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("label", {
        htmlFor: "flat-button-file",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__material_ui_core_Button___default.a, {
        size: "small",
        component: "span",
        className: "image_upload",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_react_magic_dropzone___default.a, {
        className: "Dropzone",
        accept: "image/jpeg, image/png, .jpg, .jpeg, .png, .svg",
        onDrop: this.onDrop,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        }
      }, "Upload Image"))), " ", __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__material_ui_core_Button___default.a, {
        size: "small",
        variant: "contained",
        onClick: this.onSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }, "Save To Ethereum")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        }
      }, "Metadata Viewer"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        }
      }, "Contract at: "), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("pre", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("code", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        }
      }, metaData.contract_address)), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img", {
        src: this.state.metadata.image,
        style: {
          width: 64,
          height: 64
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 148
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_react_json_pretty___default.a, {
        language: "JSON",
        json: JSON.stringify(this.state.metadata),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__material_ui_core_TextField___default.a, {
        label: "Address",
        fullWidth: true,
        value: this.state.address,
        onChange: this.onInputChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__material_ui_core_Button___default.a, {
        size: "small",
        variant: "contained",
        onClick: this.onViewAddress,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        }
      }, "View"));
    }
  }]);

  return Index;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);



/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "@material-ui/core/Button":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Paper":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),

/***/ "@material-ui/core/TextField":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/TextField");

/***/ }),

/***/ "eip55":
/***/ (function(module, exports) {

module.exports = require("eip55");

/***/ }),

/***/ "ethjs":
/***/ (function(module, exports) {

module.exports = require("ethjs");

/***/ }),

/***/ "ipfs-mini":
/***/ (function(module, exports) {

module.exports = require("ipfs-mini");

/***/ }),

/***/ "next/head":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-json-pretty":
/***/ (function(module, exports) {

module.exports = require("react-json-pretty");

/***/ }),

/***/ "react-magic-dropzone":
/***/ (function(module, exports) {

module.exports = require("react-magic-dropzone");

/***/ }),

/***/ "react-typography":
/***/ (function(module, exports) {

module.exports = require("react-typography");

/***/ }),

/***/ "typography":
/***/ (function(module, exports) {

module.exports = require("typography");

/***/ }),

/***/ "typography-theme-github":
/***/ (function(module, exports) {

module.exports = require("typography-theme-github");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map