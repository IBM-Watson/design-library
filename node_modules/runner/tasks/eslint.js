'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var eslint = require('gulp-eslint'),
    gutil = require('gulp-util'),
    ifElse = require('gulp-if-else'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toEslint = [
  'patterns/**/*.js',
  '!patterns/**/tests/*.js',
  '!patterns/**/*.min.js'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, eslintPaths) {
  // Set value of paths to either the default or user entered
  eslintPaths = eslintPaths || toEslint;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var eslintTask = function (path, fail) {
    return gulp.src(path)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(ifElse(fail === true, eslint.failOnError))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('eslint', function () {
    return eslintTask(eslintPaths, true);
  });

  //////////////////////////////
  // Server Initialization Task
  //////////////////////////////
  gulp.task('eslint:server', function () {
    return eslintTask(eslintPaths, false);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('eslint:watch', function () {
    return gulp.watch(eslintPaths)
      .on('change', function (event) {
      	event.path = {
      	  absolute: event.path,
      	  relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
      	};

      	gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

      	return eslintTask(event.path.absolute, false);
      });
  });
}
