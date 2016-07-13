/* eslint object-shorthand: 0 */
/* eslint no-param-reassign: 0 */
/* eslint import/no-unresolved: 0 */

const electron = require('electron');
const app = electron.app || electron.remote.app;
const userData = app.getPath('userData');

function isFunction(functionToCheck) {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function tryParseJson(stringJson) {
  let object;
  try {
    object = JSON.parse(stringJson);
  } catch (e) {
    return e;
  }

  return object;
}

function tryStringifyJson(objectJson) {
  if (typeof objectJson === 'string') {
    return objectJson;
  }

  let string;
  try {
    string = JSON.stringify(objectJson);
  } catch (e) {
    return e;
  }

  return string;
}

function getElectronFullPath(path) {
  return `${userData}/${path}`;
}

function addDotJsonIfNeeded(path) {
  if (path.substring(path.length - 5, path.length) === '.json') {
    return path;
  }

  return `${path}.json`;
}

function processPath(path) {
  return getElectronFullPath(addDotJsonIfNeeded(path));
}

module.exports = {
  isFunction,
  tryParseJson,
  tryStringifyJson,
  processPath,
};
