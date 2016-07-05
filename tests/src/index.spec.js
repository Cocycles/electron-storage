/* eslint func-names: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint consistent-return: 0 */

const chai = require('chai');
const fs = require('fs');
const rimraf = require('rimraf');
const proxyquire = require('proxyquire');
const fakeAppDataDir = `${process.cwd()}/fake-appData`;
const mockGetElectronFullPath = (path) => `fake-appData/${path}`;
const storage = proxyquire('../../src/index', {
  './utils': { getElectronFullPath: mockGetElectronFullPath },
});

describe('Electron Storage', function () {
  beforeEach('create the fake-appData folder', function () {
    fs.mkdirSync(fakeAppDataDir);
  });

  afterEach('delete the fake-appData folder', function () {
    rimraf.sync(fakeAppDataDir);
  });

  describe('storage.get()', function () {
    it('receives the data from a json file', function (done) {
      const json = JSON.stringify({ awesome: 'data' });
      fs.writeFile(`${fakeAppDataDir}/my-awesome-data.json`, json, (err) => {
        if (err) {
          return console.error(err);
        }

        storage.get('my-awesome-data.json', (error, data) => {
          chai.expect(error).to.equal(null);
          chai.expect(data).to.deep.equal({ awesome: 'data' });
          done();
        });
      });
    });
  });

  describe('storage.set()', function () {
    it('sets a json file that you can later get', function (done) {
      storage.set('data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.get('data.json', (error, data) => {
          chai.expect(data).to.deep.equal({ js: 'on' });
          done();
        });
      });
    });

    it('creates folders if needed', function (done) {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.get('in/some/folders/data.json', (error, data) => {
          chai.expect(data).to.deep.equal({ js: 'on' });
          done();
        });
      });
    });
  });

  describe('storage.isPathExists()', function () {
    it('return true if the path exists', function (done) {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.isPathExists('in/some/folders/data.json', (data) => {
          chai.expect(data).to.equal(true);
          done();
        });
      });
    });
    it('return false if the path doesn\'t exists', function (done) {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.isPathExists('in/some/other/folders/data.json', (data) => {
          chai.expect(data).to.equal(false);
          done();
        });
      });
    });
  });
});
