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





var reader = new FileReader();
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
    console.log("constructed"); // uncomment to enable MetaMask support:

    if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
      eth.setProvider(window.web3.currentProvider);
      console.log("metamask!");
    } else {
      // keep current infura provider
      console.log("yay");
    }
  }

  _createClass(MetaDataContract, [{
    key: "getAddress",
    value: function () {
      var _getAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(address) {
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.contract.getByAddress(__WEBPACK_IMPORTED_MODULE_2_eip55___default.a.encode(address)).then(function (result) {
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
                return _context.stop();
            }
          }
        }, _callee, this);
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
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2(address, callback) {
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ipfs.cat(address, function (err, result) {
                  console.log(result);
                  callback(result);
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3(blob) {
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log(blob);
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
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
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee4(address, name, image) {
        var _this = this;

        var base64;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.convertBlobToBase64(image);

              case 2:
                base64 = _context4.sent;
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  ipfs.add(base64, function (err, result) {
                    console.log(result);
                    if (err) reject(new DOMException("Couldn't add metadata to IPFS"));
                    return _this.contract.addByOwner(address, name, result, {
                      from: web3.eth.accounts[0]
                    }).then(function (result) {
                      resolve(result);
                    }).catch(function (err) {
                      reject(err);
                    });
                  });
                }));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function addMetaData(_x5, _x6, _x7) {
        return _addMetaData.apply(this, arguments);
      };
    }()
  }, {
    key: "addImage",
    value: function () {
      var _addImage = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee5(base64) {
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return");

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function addImage(_x8) {
        return _addImage.apply(this, arguments);
      };
    }()
  }]);

  return MetaDataContract;
}();


var luckyaccounts = ["0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef ", //ens the best
"0x3FA6D806609bCD5B86BE4614e97976152eC78a99", //kickico
"0xb794F5eA0ba39494cE839613fffBA74279579268", //poloniex whale party
"0x29be8158ffd14625f303c9937909d74be6585a35", //shark
"0x900d0881a2e85a8e4076412ad1cefbe2d39c566c", //yyuuuuuge wallet contract
"0xfA129DCe2215E3f16aA9b1bD31601873206157C5", //probably the best tutorial in there, big wallet and exchange
"0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", //a friggin blue whale
"0xb3764761e297d6f121e79c32a65829cd1ddb4d32", //multi-sig hacker
"0xD74Ed380f96cb20E6EfC735d4B654Bf420123923", //near TheDao
"0x87e722173f2d28ce10ce1fa9bd862912fe7e24e6", //unimportant, great
"0xbb9bc244d798123fde783fcc1c72d3bb8c189413", //TheDao itself
"0xa62142888aba8370742be823c1782d17a0389da1", //Fomo3D
"0x00789b1c3d583e3057c264888afc2c38e4aff5b7", //0x007 contract, and a shark, with friggin lasers
"0x42d6622dece394b54999fbd73d108123806f6a18", //Tokens now have icons
"0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"];

/***/ })

})
//# sourceMappingURL=4.a98cba448c23e749e8fe.hot-update.js.map