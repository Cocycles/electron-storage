# electron-storage

> simple electron-storage module

electron saves data in app.getPath("appData") folder, which is different in every os.
electron-storage gives simple methods to get and set json files to this directory,
creates subdirectories if needed and supports callbacks and promises.

## Installation

```
$ npm install --save electron-storage
```
### usage
```js

const storage = require('electron-storage');
```
### API

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
.then(data => {
  console.log(data);
})
.catch(err => {
  console.error(err);
});
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

## License
The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
