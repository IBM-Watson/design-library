'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync'),
    dest = require('../helpers/relative-dest'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toImagemin = [
  'language/images/**/*',
  'library/images/**/*'
];

var imageminSettings = {
  progressive: true,
  svgoPlugins:[
    { 'removeViewBox': false },
    { 'removeUselessDefs': false },
    { 'convertTransform': false }
  ],
  use: [pngquant()]
};

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, ImageminPaths) {
  // Set value of paths to either the default or user entered
  ImageminPaths = ImageminPaths || toImagemin;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var ImageminTask = function (path) {
    return gulp.src(path)
      .pipe(imagemin(imageminSettings))
      .pipe(dest('.www'))
      .pipe(reload({stream: true}));
  }

  var ImageminPatternTask = function (path) {
    return gulp.src(path)
      .pipe(imagemin(imageminSettings))
      .pipe(dest('.www/ui-patterns/patterns'))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('imagemin', function () {
    return ImageminTask(ImageminPaths);
  });

  gulp.task('imagemin:patterns', function () {
    return ImageminPatternTask('patterns/**/images/*');
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('imagemin:watch', function () {
    return gulp.watch(ImageminPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return ImageminTask(event.path.absolute);
      });
  });

  gulp.task('imagemin:patterns:watch', function () {
    return gulp.watch('patterns/**/images/*')
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return ImageminPatternTask(event.path.absolute);
      });
  });
}
