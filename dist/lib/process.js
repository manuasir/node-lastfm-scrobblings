'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Proc = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Api } from './api';
var Api = require('./api');

/**
 * Handles processing
* @param {String} apiKey The LastFM API key
* @param {String} user The user to get data from
* @param {Number} levelConcurrency The pages to be requested concurrently. Example: 10 total results and 2 level of concurrency -> 10/2 : 5 pages will be requested concurrently. If
* passed levelConcurrenty is greater than total number of results, then all requests will be done sequentially.
*/

var Proc = exports.Proc = function () {
  /**
  * Constructor class
  * @param {String} apiKey The LastFM API key
  * @param {String} user The user to get data from
  * @param {Number} levelConcurrency The pages to be requested concurrently. Example: 10 total results and 2 level of concurrency -> 10/2 : 5 pages will be requested concurrently. If
  * passed levelConcurrenty is greater than total number of results, then all requests will be done sequentially.
  */
  function Proc(apiKey, user, levelConcurrency) {
    (0, _classCallCheck3.default)(this, Proc);

    this.levelConcurrency = levelConcurrency;
    this.api = new Api(user, apiKey);
  }

  /**
   * Get the total of pages
   * @returns {Number} The total of pages
   */


  (0, _createClass3.default)(Proc, [{
    key: 'getTotalPages',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var resultJson;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.api.apiReq();

              case 3:
                resultJson = _context.sent;
                return _context.abrupt('return', resultJson.recenttracks['@attr'].totalPages);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', Promise.reject(_context.t0.message || _context.t0));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function getTotalPages() {
        return _ref.apply(this, arguments);
      }

      return getTotalPages;
    }()

    /**
     * Performs requests and return results
     * @returns {Object} The results object
     */

  }, {
    key: 'process',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var results, totalPages, levelConcurrency, chunk, requests, count, _arr, _i, i, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                results = [];
                _context2.next = 4;
                return this.getTotalPages();

              case 4:
                totalPages = _context2.sent;
                levelConcurrency = this.levelConcurrency || totalPages;
                chunk = levelConcurrency >= totalPages ? totalPages : Math.floor(totalPages / levelConcurrency);
                requests = [];
                count = 0;
                // for (let i of [...Array(Number(totalPages)).keys()]) {
                //   count++
                //   if (count < chunk) {
                //     requests.push(this.api.apiReq({ page: i }))
                //   } else {
                //     count = 0
                //     const data = await Promise.all(requests)
                //     requests = []
                //     results.push(...data)
                //   }
                // }

                // 5 parallel
                // for (let i of [...Array(Number(5)).keys()]) {
                //   // const data = await this.api.apiReq({ page: i })
                //   requests.push(this.api.apiReq({ page: i }))
                // }
                // const data = await Promise.all(requests)
                // results.push(...data)


                // 5 sequential

                _arr = [].concat((0, _toConsumableArray3.default)(Array(Number(5)).keys()));
                _i = 0;

              case 11:
                if (!(_i < _arr.length)) {
                  _context2.next = 20;
                  break;
                }

                i = _arr[_i];
                _context2.next = 15;
                return this.api.apiReq({ page: i });

              case 15:
                data = _context2.sent;

                results.push(data);

              case 17:
                _i++;
                _context2.next = 11;
                break;

              case 20:
                return _context2.abrupt('return', { results: results });

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', Promise.reject(_context2.t0.message || _context2.t0));

              case 26:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 23]]);
      }));

      function process() {
        return _ref2.apply(this, arguments);
      }

      return process;
    }()
  }]);
  return Proc;
}();