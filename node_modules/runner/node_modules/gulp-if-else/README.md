# gulp-if-else

[![Actual version published on NPM](https://badge.fury.io/js/gulp-if-else.png)](https://www.npmjs.org/package/gulp-if-else)
[![Dependencies](https://david-dm.org/Nicolab/gulp-if-else.png)](https://david-dm.org/Nicolab/gulp-if-else)
[![npm module downloads per month](http://img.shields.io/npm/dm/gulp-if-else.svg)](https://www.npmjs.org/package/gulp-if-else)

A plugin for Gulp, allows conditional task, with "if" callback and "else" callback (optional).


## Install

```shell
npm install gulp-if-else
```


## Usage

ifElse(condition, ifCallback [, elseCallback])

```js
var ifElse = require('gulp-if-else');

// your code ...

gulp.src(source)
  .pipe( ifElse(condition, ifCallback, elseCallback) )
```

Works as a basic condition.

To understand the logic, `ifElse` is equivalent to
```js
if(condition) {

  // condition is truthy

  return ifCallback();
}else{

  // condition is falsy

  // if "elseCallback" is provided
  if(elseCallback) {
    return elseCallback();
  }

  // if not "elseCallback" returns the stream
  return stream;
}
```

Examples
```js
gulp.task('css', function() {

  gulp.src('./public/css/*.css')
    .pipe(ifElse(process.env.NODE_ENV === 'production',

      // called if "NODE_ENV" is "production"
      minifyCSS,

      // called if "NODE_ENV" is "not" "production" (else)
      function() {
        return minifyCSS({debug: true});
    }))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function() {

  var isDev = process.env.NODE_ENV === 'development';

  gulp.src('./public/js/app.js')
    .pipe(browserify())

    // here, "uglify" (function) is called only if "isDev" is "true"
    .pipe(ifElse(isDev, uglify))
    .pipe(gulp.dest('./dist/js'))
});

```


## Unit tests

`gulp-if-else` is unit tested with [Unit.js](http://unitjs.com)

Run the tests
```shell
cd node_modules/gulp-if-else

npm test
```


## Other conditional plugins for Gulp

  * [gulp-if](https://github.com/robrich/gulp-if)
  * [gulp-cond](https://github.com/nfroidure/gulp-cond)


## LICENSE

[MIT license](https://github.com/Nicolab/gulp-if-else/blob/master/LICENSE)


## Author

| [![Nicolas Tallefourtane - Nicolab.net](http://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](http://nicolab.net) |
|---|
| [Nicolas Talle](http://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |
