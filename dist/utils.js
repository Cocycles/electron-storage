'use strict';

/* eslint object-shorthand: 0 */
/* eslint no-param-reassign: 0 */
/* eslint import/no-unresolved: 0 */

var electron = require('electron');
var app = electron.app || electron.remote.app;
var userData = app.getPath('userData');

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function tryParseJson(stringJson) {
  var object = void 0;
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

  var string = void 0;
  try {
    string = JSON.stringify(objectJson);
  } catch (e) {
    return e;
  }

  return string;
}

function getElectronFullPath(path) {
  return userData + '/' + path;
}

module.exports = {
  isFunction: isFunction,
  tryParseJson: tryParseJson,
  tryStringifyJson: tryStringifyJson,
  getElectronFullPath: getElectronFullPath
};