'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * _get - function the gets filePath and a callback and returns a parse json
 *        from the file in the specefied path
 *
 * @param  {string} filePath - path to the file relative to the `userData` folder
 * @param  {function} cb - a callback function
 */
function _get(filePath, cb) {
  var fullPath = (0, _utils.processPath)(filePath);
  return _fs2.default.readFile(fullPath, { encoding: 'utf8' }, function (err, json) {
    if (!err) {
      var object = (0, _utils.tryParseJson)(json);

      if (object instanceof Error) {
        return cb(new Error('The file in path ' + fullPath + ' is not a valid json file'), null);
      }

      return cb(null, object);
    }

    if (err.code === 'ENOENT') {
      err.message = 'The file in path ' + fullPath + ' doesn\'t exist'; /* eslint no-param-reassign: 0 */
    }

    return cb(err);
  });
}

/**
 * get - function the gets filePath and a callback and returns a parse json
 *       from the file in the specefied path
 *
 * @param  {string} filePath - path to the file relative to the `userData` folder
 * @param  {undefined | function} cb - an optional callback function
 * @return {undefined | Promise} if there is only the first argument, the function
 *                               will return a thenable Promise object
 */
/* eslint no-underscore-dangle: 0 */

function get(filePath, cb) {
  if (cb && (0, _utils.isFunction)(cb)) {
    return _get(filePath, cb);
  }

  return new Promise(function (resolve, reject) {
    return _get(filePath, function (err, data) {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

/**
 * _set - sets a json file into the storage at a path (relative to the `userData` folder)
 *        also stringify the json if needed and create any folder that is required in the path
 *
 * @param  {string} filePath - path to the file relative to the `userData` folder
 * @param  {string | object} data - the data to save in the file path, can be parseJson or an object
 * @param  {type} cb - a callback function
 */
function _set(filePath, data, cb) {
  var fullPath = (0, _utils.processPath)(filePath);
  var json = (0, _utils.tryStringifyJson)(data);

  if (json instanceof Error) {
    return cb(new Error('The file you trying to save at path ' + fullPath + ' is not valid json'));
  }

  var dir = _path2.default.dirname(fullPath);

  return _fs2.default.access(dir, _fs2.default.F_OK, function (notExists) {
    if (!notExists) return _fs2.default.writeFile(fullPath, json, cb);
    return (0, _mkdirp2.default)(dir, function (err) {
      if (err) return cb(err);
      return _fs2.default.writeFile(fullPath, json, cb);
    });
  });
}

/**
 * set - sets a json file into the storage at a path (relative to the `userData` folder)
 *       also stringify the json if needed and create any folder that is required in the path
 *
 * @param  {string} filePath - path to the file relative to the `userData` folder
 * @param  {string | object} data - the data to save in the file path, can be parseJson or an object
 * @param  {undefined | function} cb - an optional callback function
 * @return {undefined | Promise} if there are only two first arguments, the function
 *                               will return a thenable Promise object
 */

function set(filePath, data, cb) {
  if (cb && (0, _utils.isFunction)(cb)) {
    return _set(filePath, data, cb);
  }

  return new Promise(function (resolve, reject) {
    return _set(filePath, data, function (err) {
      if (err) return reject(err);
      return resolve();
    });
  });
}

/**
 * _isPathExists - check whether the path inserted is exist in the userData directory
 *
 * @param  {string} fileOrDirPath - a path inside of the userData directory
 * @param  {func} cb - a callback function
 */
function _isPathExists(fileOrDirPath, cb) {
  var fullPath = (0, _utils.processPathNoJson)(fileOrDirPath);

  return _fs2.default.exists(fullPath, function (exists) {
    if (exists) return cb(true);
    return cb(false);
  });
}

/**
 * isPathExists - check whether the path inserted is exist in the userData directory
 *
 * @param  {string} fileOrDirPath - a path inside of the userData directory
 * @param  {undefined|func} cb - an optional callback function
 * @return {undefined | Promise} if there are only two first arguments, the function
 *                               will return a thenable Promise object
 */
function isPathExists(fileOrDirPath, cb) {
  if (cb && (0, _utils.isFunction)(cb)) {
    return _isPathExists(fileOrDirPath, cb);
  }

  return new Promise(function (resolve) {
    return _isPathExists(fileOrDirPath, function (result) {
      return resolve(result);
    });
  });
}

/**
 * _remove - remove the file/folder from the path inserted
 *
 * @param  {string} fileOrDirPath - a path inside of the userData directory
 * @param  {func} cb - a callback function
 */
function _remove(fileOrDirPath, cb) {
  var fullPath = (0, _utils.processPathNoJson)(fileOrDirPath);

  return (0, _rimraf2.default)(fullPath, cb);
}

/**
 * remove - remove the file/folder from the path inserted
 *
 * @param  {string} fileOrDirPath - a path inside of the userData directory
 * @param  {undefined|func} cb - an optional callback function
 * @return {undefined | Promise} if there are only two first arguments, the function
 *                               will return a thenable Promise object
 */
function remove(fileOrDirPath, cb) {
  if (cb && (0, _utils.isFunction)(cb)) {
    return _remove(fileOrDirPath, cb);
  }

  return new Promise(function (resolve, reject) {
    return _remove(fileOrDirPath, function (error) {
      if (error) return reject(error);
      return resolve();
    });
  });
}

module.exports = {
  get: get,
  set: set,
  isPathExists: isPathExists,
  remove: remove
};