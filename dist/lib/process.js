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

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  */
  function Proc(apiKey, user, levelConcurrency) {
    (0, _classCallCheck3.default)(this, Proc);

    this.levelConcurrency = levelConcurrency;
    this.api = new _api.Api(user, apiKey);
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
        var results, totalPages, levelConcurrency, chunk, requests, count, _arr, _i, i, _results, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                results = [];
                _context2.t0 = Number;
                _context2.next = 5;
                return this.getTotalPages();

              case 5:
                _context2.t1 = _context2.sent;
                totalPages = (0, _context2.t0)(_context2.t1);
                levelConcurrency = Number(this.levelConcurrency) || totalPages;
                chunk = levelConcurrency >= totalPages ? 1 : Math.floor(totalPages / levelConcurrency);
                requests = [];
                count = 0;
                _arr = [].concat((0, _toConsumableArray3.default)(Array(totalPages).keys()));
                _i = 0;

              case 13:
                if (!(_i < _arr.length)) {
                  _context2.next = 27;
                  break;
                }

                i = _arr[_i];

                count++;
                if (count <= chunk) {
                  requests.push(this.api.apiReq({ page: i }));
                }

                if (!(count === chunk)) {
                  _context2.next = 24;
                  break;
                }

                count = 0;
                _context2.next = 21;
                return Promise.all(requests);

              case 21:
                data = _context2.sent;

                requests = [];
                (_results = results).push.apply(_results, (0, _toConsumableArray3.default)(data.map(function (page) {
                  delete page.recenttracks['@attr'];
                  page.recenttracks.track.map(function (tr) {
                    if (tr.date) {
                      if (tr.date['#text']) {
                        tr.timestamp = tr.date['#text'];
                        delete tr.date;
                      }
                    }
                  });
                  return page.recenttracks.track;
                })));

              case 24:
                _i++;
                _context2.next = 13;
                break;

              case 27:
                results = results;
                return _context2.abrupt('return', results);

              case 31:
                _context2.prev = 31;
                _context2.t2 = _context2['catch'](0);
                return _context2.abrupt('return', Promise.reject(_context2.t2.message || _context2.t2));

              case 34:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 31]]);
      }));

      function process() {
        return _ref2.apply(this, arguments);
      }

      return process;
    }()
  }]);
  return Proc;
}();