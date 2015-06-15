'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    sequence = require('run-sequence');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('build', function (cb) {
    return sequence(
      // Linting
      ['lint', 'sass:fix-libsass'],

      // Pre-Compiled Files
      ['swig', 'language', 'imagemin', 'imagemin:patterns', 'copy', 'copy:index', 'assets'],
      // Sass needs to go after these so base64 assets can base64
      ['sass'],

      // Post-Compiled Files
      ['css', 'page-build'],

      // Sequence Callback
      cb
    );
  });

  //////////////////////////////
  // Server Initialization Task
  //////////////////////////////
  gulp.task('build:server', function (cb) {
    return sequence(
      // Linting
      ['lint:server', 'sass:fix-libsass'],

      // Pre-Compiled Files
      ['sass:server', 'swig:server', 'language', 'imagemin', 'imagemin:patterns', 'copy', 'copy:index', 'assets'],

      // Post-Compiled Files
      ['css', 'page-build'],

      // Sequence Callback
      cb
    );
  });
}
