'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('http');

var http = _interopRequireWildcard(_http);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles last-fm api interaction
 * @param {String} user 
 * @param {String} apiKey 
 */
var Api = exports.Api = function () {

  /**
   * Constructor class
   */
  function Api(user, apiKey) {
    (0, _classCallCheck3.default)(this, Api);

    this.apiKey = apiKey;
    this.user = user;
  }

  /**
   * Promised HTTP GET request
   * @param {String} endpoint 
   * @returns {Promise} 
   */


  (0, _createClass3.default)(Api, [{
    key: 'asyncGetReq',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(endpoint) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  var request = http.get(endpoint, function (response) {
                    if (response.statusCode > 200) reject(new Error('Failed to load page, status code: ' + response.statusCode));
                    var body = [];
                    // on every content chunk, push it to the data array
                    response.on('data', function (chunk) {
                      return body.push(chunk);
                    });
                    // we are done, resolve promise with those joined chunks
                    response.on('end', function () {
                      return resolve(JSON.parse(body.join('')));
                    });
                  });
                  request.on('error', function (err) {
                    return reject(err);
                  });
                }));

              case 4:
                _context.prev = 4;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', Promise.reject(new Error('Unknown error')));

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 4]]);
      }));

      function asyncGetReq(_x) {
        return _ref.apply(this, arguments);
      }

      return asyncGetReq;
    }()

    /**
     * Performs an API request
     * @param {Object} params The request parameters. If page param is missing then will request first page.
     * @returns {Promise} The API result
     */

  }, {
    key: 'apiReq',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params) {
        var page;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                page = params && params.page ? params.page : 1;

                if (!(!this.apiKey || this.apiKey === '' || !this.user || this.user == '')) {
                  _context2.next = 4;
                  break;
                }

                throw Error('Invalid arguments');

              case 4:
                return _context2.abrupt('return', this.asyncGetReq('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + this.user + '&api_key=' + this.apiKey + '&format=json&limit=200&page=' + page));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', Promise.reject(_context2.t0.message || _context2.t0));

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function apiReq(_x2) {
        return _ref2.apply(this, arguments);
      }

      return apiReq;
    }()
  }]);
  return Api;
}();