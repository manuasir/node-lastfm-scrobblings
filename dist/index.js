'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _process = require('./lib/process');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks the arguments
 * @returns {Object} {key,user,grade}
 */
var checkArgs = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var key, user, grade, _start, end, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, arg;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            key = void 0, user = void 0, grade = void 0, _start = void 0, end = void 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;

            for (_iterator = process.argv[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              arg = _step.value;

              if (arg.includes('key=')) {
                key = arg.split('=')[1];
              } else if (arg.includes('user=')) {
                user = arg.split('=')[1];
              } else if (arg.includes('grade=')) {
                grade = arg.split('=')[1];
              } else if (arg.includes('start=')) {
                _start = Number(arg.split('=')[1]);
              } else if (arg.includes('end=')) {
                end = Number(arg.split('=')[1]);
              }
            }
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](5);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 13:
            _context.prev = 13;
            _context.prev = 14;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 16:
            _context.prev = 16;

            if (!_didIteratorError) {
              _context.next = 19;
              break;
            }

            throw _iteratorError;

          case 19:
            return _context.finish(16);

          case 20:
            return _context.finish(13);

          case 21:
            if (!(!key || !user)) {
              _context.next = 25;
              break;
            }

            throw Error('Missing arguments');

          case 25:
            return _context.abrupt('return', {
              key: key,
              user: user,
              grade: grade || 1,
              start: _start || 0,
              end: end || null
            });

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t1 = _context['catch'](0);
            return _context.abrupt('return', Promise.reject(_context.t1));

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 28], [5, 9, 13, 21], [14,, 16, 20]]);
  }));

  return function checkArgs() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Flattens any array
 * @param {Array} arr1
 */
var flattenDeep = function flattenDeep(arr1) {
  return arr1.reduce(function (acc, val) {
    return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val);
  }, []);
};

/**
 * Starts the process
 */
var start = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var _ref3, key, user, grade, _start2, end, processing, firstReq, results, endReq, firstWrite, endWrite;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return checkArgs();

          case 3:
            _ref3 = _context2.sent;
            key = _ref3.key;
            user = _ref3.user;
            grade = _ref3.grade;
            _start2 = _ref3.start;
            end = _ref3.end;
            processing = new _process.Proc(key, user, grade);
            firstReq = new Date().getTime();
            _context2.next = 13;
            return processing.process(_start2, end);

          case 13:
            results = _context2.sent;
            endReq = new Date().getTime();

            console.log('Requests process time:', (endReq - firstReq) / 1000);
            firstWrite = new Date().getTime();

            fs.writeFileSync('scrobs.json', JSON.stringify(flattenDeep(results)), 'utf8');
            endWrite = new Date().getTime();

            console.log('Write process time:', (endWrite - firstWrite) / 1000);
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', Promise.reject(_context2.t0));

          case 25:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 22]]);
  }));

  return function start() {
    return _ref2.apply(this, arguments);
  };
}();

var first = new Date().getTime();
console.log('Processing, please wait...');
start().then(function () {
  var end = new Date().getTime();
  console.log('Total process time:', (end - first) / 1000);
}).catch(function (err) {
  console.error('Error while processing: ', err.message || err);
});