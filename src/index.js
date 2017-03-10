/* eslint no-underscore-dangle: 0 */

import {
  processPath,
  processPathNoJson,
} from './utils';
import ya from 'ya-storage';


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
  const fullPath = processPath(filePath);
  return ya.get(fullPath, cb);
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
  const fullPath = processPath(filePath);
  return ya.set(fullPath, data, cb);
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
  const fullPath = processPathNoJson(fileOrDirPath);
  return ya.isPathExists(fullPath, cb);
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
  const fullPath = processPathNoJson(fileOrDirPath);
  return ya.remove(fullPath, cb);
}

module.exports = {
  get,
  set,
  isPathExists,
  remove,
};
