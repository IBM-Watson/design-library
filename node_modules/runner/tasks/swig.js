'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    swig = require('../helpers/pattern-build'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    dest = require('../helpers/relative-dest'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toSwig = [
  './patterns/**/*.html'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, SwigPaths) {
  // Set value of paths to either the default or user entered
  SwigPaths = SwigPaths || toSwig;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var SwigTask = function (path, page) {
    return gulp.src(path)
      .pipe(swig({
        'template': true,
        'page': false
      }))
      .pipe(rename(function (path) {
        path.basename = 'index';
      }))
      .pipe(dest('./.tmp/ui-patterns/patterns'));
      // .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('swig', function () {
    return SwigTask(SwigPaths, false);
  });

  //////////////////////////////
  // Server Initialization Task
  //////////////////////////////
  gulp.task('swig:server', function () {
    return SwigTask(SwigPaths, true);
  });

  gulp.task('swig:metadata:watch', function () {
    return gulp.watch([
        './patterns/**/*.md',
        './patterns/**/pattern.yml'
      ])
      .on('change', function (event) {
        var html;

        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Build HTML path from Markdown path
        html = event.path.absolute.split('/');
        html.pop();
        html.push(html[html.length - 1] + '.html');
        html = html.join('/');

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return SwigTask(html, true);
      });
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('swig:watch', function () {
    return gulp.watch(SwigPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return SwigTask(event.path.absolute, true);
      });
  });
}
