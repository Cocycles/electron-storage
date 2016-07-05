/* eslint object-shorthand: 0 */
/* eslint no-underscore-dangle: 0 */

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const isFunction = require('./utils').isFunction;
const tryParseJson = require('./utils').tryParseJson;
const tryStringifyJson = require('./utils').tryStringifyJson;
const getElectronFullPath = require('./utils').getElectronFullPath;

/**
 * _get - function the gets filePath and a callback and returns a parse json
 *        from the file in the specefied path
 *
 * @param  {string} filePath - path to the file relative to the `userData` folder
 * @param  {function} cb - a callback function
 */
function _get(filePath, cb) {
  const fullPath = getElectronFullPath(filePath);
  return fs.readFile(fullPath, { encoding: 'utf8' }, (err, json) => {
    if (!err) {
      const object = tryParseJson(json);

      if (object instanceof Error) {
        return cb(new Error(`The file in path ${fullPath} is not a valid json file`), null);
      }

      return cb(null, object);
    }

    if (err.code === 'ENOENT') {
      return cb(new Error(`The file in path ${fullPath} doesn\'t exist`), null);
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
function get(filePath, cb) {
  if (cb && isFunction(cb)) {
    return _get(filePath, cb);
  }

  return new Promise((resolve, reject) =>
    _get(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    })
  );
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
  const fullPath = getElectronFullPath(filePath);
  const json = tryStringifyJson(data);

  if (json instanceof Error) {
    return cb(new Error(`The file you trying to save at path ${fullPath} is not valid json`));
  }

  const dir = path.dirname(fullPath);

  return fs.access(dir, fs.F_OK, (notExists) => {
    if (!notExists) return fs.writeFile(fullPath, json, cb);
    return mkdirp(dir, (err) => {
      if (err) return cb(err);
      return fs.writeFile(fullPath, json, cb);
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
  if (cb && isFunction(cb)) {
    return _set(filePath, data, cb);
  }

  return new Promise((resolve, reject) =>
    _set(filePath, data, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    })
  );
}

/**
 * _isPathExists - check whether the path inserted is exist in the userData directory
 *
 * @param  {string} fileOrDirPath - a path inside of the userData directory
 * @param  {func} cb - a callback function
 */
function _isPathExists(fileOrDirPath, cb) {
  const fullPath = getElectronFullPath(fileOrDirPath);

  return fs.exists(fullPath, (exists) => {
    if (exists) {
      return cb(true);
    }

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
  if (cb && isFunction(cb)) {
    return _isPathExists(fileOrDirPath, cb);
  }

  return new Promise((resolve) =>
    _isPathExists(fileOrDirPath, (result) =>
      resolve(result)
    )
  );
}

module.exports = {
  get: get,
  set: set,
  isPathExists: isPathExists,
};
