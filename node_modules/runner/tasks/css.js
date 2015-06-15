'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    // target = require('gulp-css-target'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toCss = [
  '.www/**/*.css'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, CssPaths) {
  // Set value of paths to either the default or user entered
  CssPaths = CssPaths || toCss;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var CssTask = function (path) {
    return gulp.src(CssPaths)
      // .pipe(target({
        // base: '.www/css'
      // }))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('css', function () {
    return CssTask(CssPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('css:watch', function () {
    return gulp.watch(CssPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return CssTask(event.path.absolute);
      });
  });
}
