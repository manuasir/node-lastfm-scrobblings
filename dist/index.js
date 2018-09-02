'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Proc } from './lib/process'
var Proc = require('./lib/process');
// import * as fs from 'fs'

/**
 * Checks the arguments
 * @returns {Object} {key,user,grade}
 */
var checkArgs = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var key, user, grade, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, arg;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            key = void 0, user = void 0, grade = void 0;
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
            if (!(!key || !user || !grade)) {
              _context.next = 25;
              break;
            }

            throw Error('Missing arguments');

          case 25:
            return _context.abrupt('return', { key: key, user: user, grade: grade });

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
 * Starts the process
 */
var start = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var _ref3, key, user, grade, processing, data;

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
            processing = new Proc(key, user, grade);
            _context2.next = 10;
            return processing.process();

          case 10:
            data = _context2.sent;
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', Promise.reject(_context2.t0));

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 13]]);
  }));

  return function start() {
    return _ref2.apply(this, arguments);
  };
}();

var first = new Date().getTime();
start().then(function () {
  var end = new Date().getTime();
  console.log((end - first) / 1000);
}).catch(function (err) {
  console.error('error processing: ', err);
});