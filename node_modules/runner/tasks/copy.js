'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    dest = require('../helpers/relative-dest'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toCopy = [
  'language/assets/**',
  'language/videos/**',
  'library/assets/**',
  'library/videos/**',
  'library/fonts/**'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, CopyPaths) {
  // Set value of paths to either the default or user entered
  CopyPaths = CopyPaths || toCopy;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var CopyTask = function (path) {
    return gulp.src(CopyPaths)
      .pipe(dest('./.www'))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('copy', function () {
    return CopyTask(CopyPaths);
  });

  gulp.task('copy:index', function () {
    return gulp.src('language/index.html')
      .pipe(dest('./.tmp'))
      .pipe(reload({stream: true}));
  });

  gulp.task('copy:index:watch', function () {
    return gulp.watch('language/index.html', ['copy:index']);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('copy:watch', function () {
    return gulp.watch(CopyPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return CopyTask(event.path.absolute);
      });
  });
}
