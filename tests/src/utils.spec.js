const chai = require('chai');
const { processPath } = require('../../dist/utils');
const electron = require('electron');
const app = electron.app || electron.remote.app;
const userData = app.getPath('userData');
const path = require('path');

describe('Electron Storage utils', () => {
  describe('utils.processPath', () => {
    it('adds .json to the end of a file if needed', (done) => {
      const filePath = path.join('a', 'filePath', 'without', 'json');
      const fullPath = processPath(filePath);
      chai.expect(fullPath).to.equal(path.join(userData, `${filePath}.json`));
      done();
    });

    it('does not add .json to the end of a file if not needed', (done) => {
      const filePath = path.join('a', 'filePath', 'without', 'json.json');
      const fullPath = processPath(filePath);
      chai.expect(fullPath).to.equal(path.join(userData, filePath));
      done();
    });

    it('adds the electron appDataPath', (done) => {
      const filePath = 'data.json';
      const fullPath = processPath(filePath);
      chai.expect(fullPath).to.equal(path.join(userData, filePath));
      done();
    });
  });
});
