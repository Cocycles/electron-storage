const chai = require('chai');
const { processPath } = require('../../dist/utils');
const electron = require('electron');
const app = electron.app || electron.remote.app;
const userData = app.getPath('userData');

describe('Electron Storage utils', () => {
  describe('utils.processPath', () => {
    console.log(userData);
    it('adds .json to the end of a file if needed', (done) => {
      const path = 'a/path/without/json';
      const fullPath = processPath(path);
      chai.expect(fullPath).to.equal(`${userData}/${path}.json`);
      done();
    });

    it('does not add .json to the end of a file if not needed', (done) => {
      const path = 'a/path/with/json.json';
      const fullPath = processPath(path);
      chai.expect(fullPath).to.equal(`${userData}/${path}`);
      done();
    });

    it('adds the electron appDataPath', (done) => {
      const path = 'data.json';
      const fullPath = processPath(path);
      chai.expect(fullPath).to.equal(`${userData}/${path}`);
      done();
    });
  });
});
