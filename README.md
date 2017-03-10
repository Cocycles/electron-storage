# electron-storage

> simple storage managing module for electron

Electron saves data in app.getPath("userData") folder, which is different in every os.
```electron-storage``` gives simple methods to get and set json files to this directory.

* Creates subdirectories if needed - that means you can write ```movies/StarWars.json``` as path, a movies folder will be created and a StarWars.json file inside.
* Supports callbacks and promises.
* The data inserted can be a javascript object, or stringified json.
* You don't have to write ```.json``` in the end of a file path, it will add it for you.

[![NPM](https://nodei.co/npm/electron-storage.png?downloads=true&downloadRank=true)](https://nodei.co/npm/electron-storage/)
[![Package Quality](http://npm.packagequality.com/badge/electron-storage.png)](http://packagequality.com/#?package=electron- storage)

[![npm version](https://badge.fury.io/js/electron-storage.svg)](https://badge.fury.io/js/electron-storage)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Cocycles/electron-storage)
[![issues](https://img.shields.io/github/issues/Cocycles/electron-storage.svg)](https://github.com/Cocycles/electron-storage)
[![forks](https://img.shields.io/github/forks/Cocycles/electron-storage.svg)](https://github.com/Cocycles/electron-storage)
[![stars](https://img.shields.io/github/stars/Cocycles/electron-storage.svg)](https://github.com/Cocycles/electron-storage)
[![twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000)](https://twitter.com/intent/tweet?text=https://github.com/Cocycles/electron-storage&url=%5Bobject%20Object%5D)

## Installation

```
$ npm install --save electron-storage
```
## usage
```js

const storage = require('electron-storage');
```
## API

### get
get a json file from storage.

#### storage.get(filePath, cb)
```js
storage.get(filePath, (err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data);
  }
});
```

#### storage.get(filePath)
```js
storage.get(filePath)
.then(data => {
  console.log(data);
})
.catch(err => {
  console.error(err);
});
```

### set
set a json file to storage.

#### storage.set(filePath, data, cb)
```js
storage.set(filePath, data, (err) => {
  if (err) {
    console.error(err)
  }
});
```

#### storage.set(filePath, data)
```js
storage.set(filePath, data)
.then(() => {
  console.log('The file was successfully written to the storage');
})
.catch(err => {
  console.error(err);
});
```

### isPathExists
check if a file or directory exists.

```js
// you have to write .json suffix for json files.
// this method works on directories as well, if you don't write `.json` suffix it checks for a directory.
```

#### storage.isPathExists(path, cb)
```js
storage.isPathExists(path, (itDoes) => {
  if (itDoes) {
    console.log('pathDoesExists !')
  }
});
```

#### storage.isPathExists(path)
```js
storage.isPathExists(path)
.then(itDoes => {
  if (itDoes) {
    console.log('pathDoesExists !')
  }
});
```

### remove
remove a file or a directory from storage

#### storage.remove(path, cb)
```js
storage.remove(path, err => {
  if (err) {
    console.log(err)
  }
});
```

#### storage.remove(path)
```js
storage.remove(path)
.then(err => {
  if (err) {
    console.log(err)
  }
});
```

## Development
``` npm run build ```
for creating es5 files in dist folder

## Contribute
Contributions are welcome! please open issues and pull request :)

## License
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
