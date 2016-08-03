/* eslint no-underscore-dangle: 0 */

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import {
  isFunction,
  tryParseJson,
  tryStringifyJson,
  processPath,
  processPathNoJson,
} from './utils';

/**
 * _get - function the gets filePath and a callback and returns a parse json
 *        from the file in the specefied path
 *
 * @param  {string} filePath - path to the file relative to the `userData` folder
 * @param  {function} cb - a callback function
 */
function _get(filePath, cb) {
  const fullPath = processPath(filePath);
  return fs.readFile(fullPath, { encoding: 'utf8' }, (err, json) => {
    if (!err) {
      const object = tryParseJson(json);

      if (object instanceof Error) {
        return cb(new Error(`The file in path ${fullPath} is not a valid json file`), null);
      }

      return cb(null, object);
    }

    if (err.code === 'ENOENT') {
      err.message = `The file in path ${fullPath} doesn\'t exist`; /* eslint no-param-reassign: 0 */
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
      if (err) return reject(err);
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
  const fullPath = processPath(filePath);
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
      if (err) return reject(err);
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
  const fullPath = processPathNoJson(fileOrDirPath);

  return fs.exists(fullPath, (exists) => {
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
  if (cb && isFunction(cb)) {
    return _isPathExists(fileOrDirPath, cb);
  }

  return new Promise(resolve =>
    _isPathExists(fileOrDirPath, (result) =>
      resolve(result)
    )
  );
}

/**
 * _remove - remove the file/folder from the path inserted
 *
 * @param  {string} fileOrDirPath - a path inside of the userData directory
 * @param  {func} cb - a callback function
 */
function _remove(fileOrDirPath, cb) {
  const fullPath = processPathNoJson(fileOrDirPath);

  return rimraf(fullPath, cb);
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
  if (cb && isFunction(cb)) {
    return _remove(fileOrDirPath, cb);
  }

  return new Promise((resolve, reject) =>
    _remove(fileOrDirPath, error => {
      if (error) return reject(error);
      return resolve();
    })
  );
}

module.exports = {
  get,
  set,
  isPathExists,
  remove,
};
