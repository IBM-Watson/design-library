'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    modernizr = require('../helpers/modernizr'),
    assets = require('../helpers/assets'),
    y2j = require('../helpers/yaml2json'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toAssets = [
  'library/config/**.yaml'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, AssetsPaths) {
  // Set value of paths to either the default or user entered
  AssetsPaths = AssetsPaths || toAssets;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var AssetsTask = function (path, options) {
    return gulp.src(AssetsPaths)
      .pipe(y2j())
      .pipe(modernizr())
      .pipe(assets(options))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('assets', function () {
    return AssetsTask(AssetsPaths, {
      'minify': true
    });
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('assets:watch', function () {
    return gulp.watch(AssetsPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return AssetsTask(event.path.absolute, {
          'minify': false
        });
      });
  });
}
