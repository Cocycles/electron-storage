/* eslint consistent-return: 0 */

const chai = require('chai');
const fs = require('fs');
const rimraf = require('rimraf');
const proxyquire = require('proxyquire');
const fakeAppDataDir = `${process.cwd()}/fake-appData`;
const mockGetElectronFullPath = (path) => `fake-appData/${path}`;
const storage = proxyquire('../../dist/index', {
  './utils': { getElectronFullPath: mockGetElectronFullPath },
});

describe('Electron Storage', () => {
  beforeEach('create the fake-appData folder', () => {
    fs.mkdirSync(fakeAppDataDir);
  });

  afterEach('delete the fake-appData folder', () => {
    rimraf.sync(fakeAppDataDir);
  });

  describe('storage.get()', () => {
    it('receives the data from a json file', (done) => {
      const json = JSON.stringify({ awesome: 'data' });
      fs.writeFile(`${fakeAppDataDir}/my-awesome-data.json`, json, (err) => {
        if (err) {
          throw err;
        }

        storage.get('my-awesome-data.json', (error, data) => {
          chai.expect(error).to.equal(null);
          chai.expect(data).to.deep.equal({ awesome: 'data' });
          done();
        });
      });
    });
  });

  describe('storage.get()', () => {
    it('receives the data from a json file', (done) => {
      const json = JSON.stringify({ awesome: 'data' });
      fs.writeFile(`${fakeAppDataDir}/my-awesome-data.json`, json, (err) => {
        if (err) {
          throw err;
        }

        storage.get('my-awesome-data.json').then(data => {
          chai.expect(data).to.deep.equal({ awesome: 'data' });
          done();
        });
      });
    });
  });

  describe('storage.set()', () => {
    it('sets a json file that you can later get', (done) => {
      storage.set('data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.get('data.json', (error, data) => {
          chai.expect(data).to.deep.equal({ js: 'on' });
          done();
        });
      });
    });

    it('creates folders if needed', (done) => {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.get('in/some/folders/data.json', (error, data) => {
          chai.expect(data).to.deep.equal({ js: 'on' });
          done();
        });
      });
    });
  });

  describe('storage.isPathExists()', () => {
    it('return true if the path exists', (done) => {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.isPathExists('in/some/folders/data.json', (data) => {
          chai.expect(data).to.equal(true);
          done();
        });
      });
    });

    it('return false if the path doesn\'t exists', (done) => {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.isPathExists('in/some/other/folders/data.json', (data) => {
          chai.expect(data).to.equal(false);
          done();
        });
      });
    });
  });

  describe('storage.remove() - file', () => {
    it('removes the file in path', (done) => {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.remove('in/some/folders/data.json', error => {
          storage.isPathExists('in/some/other/folders/data.json', (data) => {
            chai.expect(data).to.equal(false);
            chai.expect(error).to.equal(null);
            done();
          });
        });
      });
    });
  });

  describe('storage.remove() - folder', () => {
    it('removes the folder in path', (done) => {
      storage.set('in/some/folders/data.json', { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.remove('in/some/folders', error => {
          storage.isPathExists('in/some/folders', (data) => {
            chai.expect(data).to.equal(false);
            chai.expect(error).to.equal(null);
            done();
          });
        });
      });
    });
  });
});
