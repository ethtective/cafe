webpackHotUpdate(4,{

/***/ "./js/metadata.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetaDataContract; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethjs__ = __webpack_require__("./node_modules/ethjs/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ethjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_eip55__ = __webpack_require__("./node_modules/eip55/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_eip55___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_eip55__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abi_metadata_json__ = __webpack_require__("./abi/metadata.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abi_metadata_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__abi_metadata_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ipfs_mini__ = __webpack_require__("./node_modules/ipfs-mini/lib/index.js");
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
    this.price = 0; // console.log("constructed");

    reader = new FileReader(); // uncomment to enable MetaMask support:

    if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
      eth.setProvider(window.web3.currentProvider);
      console.log("metamask!", eth.web3_clientVersion());
    } else {// keep current infura provider
      // console.log("yay");
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
                  // console.log(result[0]);
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
                  // console.log(result);
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
                  // console.log(result);
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



/***/ })

})
//# sourceMappingURL=4.641c940b90dd4c12e64b.hot-update.js.map