
# gulp

  Use gulp plugins in Duo without any extra work.

## Installation

```bash
npm install duo-gulp
```

## Example

```js
var gulp = require('duo-gulp');
var duo = Duo(root).entry(entry);

// gulp plugins
var coffee = require('gulp-coffee');
var uncss = require('gulp-uncss');
var less = require('gulp-less');

// plugins
duo.use(gulp('*.coffee', coffee)());
duo.use(gulp('*.less', less)());
duo.use(gulp('*.css', uncss)(opts));

duo.run(fn);
```

## API

### gulp([glob], plugin)([opts])

Wrap the gulp `plugin`. Optionally filter plugins using `glob`.

The function returns another function that you can use to pass options to the gulp plugin.

## Test

```
npm install
make test
```

## License

(The MIT License)

Copyright (c) 2014 Matthew Mueller &lt;mattmuelle@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
