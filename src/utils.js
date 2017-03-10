/* eslint object-shorthand: 0 */
/* eslint no-param-reassign: 0 */
/* eslint import/no-unresolved: 0 */

const electron = require('electron');
const app = electron.app || electron.remote.app;
const userData = app.getPath('userData');
const path = require('path');

function getElectronFullPath(filePath) {
  return path.join(userData, filePath);
}

function addDotJsonIfNeeded(filePath) {
  if (filePath.substring(filePath.length - 5, filePath.length) === '.json') {
    return filePath;
  }

  return `${filePath}.json`;
}

function processPath(filePath) {
  return addDotJsonIfNeeded(getElectronFullPath(filePath));
}

function processPathNoJson(filePath) {
  return getElectronFullPath(filePath);
}

module.exports = {
  processPath,
  processPathNoJson,
};
