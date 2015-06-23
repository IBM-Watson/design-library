'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    ifElse = require('gulp-if-else'),
    stylish = require('eslint/lib/formatters/stylish');

//////////////////////////////
// Internal Vars
//////////////////////////////
var toSassLint = [
  'patterns/**/*.scss',
  'patterns/**/*.sass'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, sassLintPaths) {
  // Set value of paths to either the default or user entered
  sassLintPaths = sassLintPaths || toSassLint;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var sassLintTask = function (path, fail) {
    return gulp.src(path);
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('scsslint', function () {
    return sassLintTask(sassLintPaths, true);
  });

  //////////////////////////////
  // Server Initialization Task
  //////////////////////////////
  gulp.task('scsslint:server', function () {
    return sassLintTask(sassLintPaths, false);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('scsslint:watch', function () {
    return gulp.watch(sassLintPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return sassLintTask(event.path.absolute, false);
      });
  });
}
