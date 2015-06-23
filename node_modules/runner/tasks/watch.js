'use strict';

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('watch', ['lint:watch', 'sass:watch', 'css:watch', 'swig:watch', 'swig:metadata:watch', 'language:watch', 'page-build:watch', 'imagemin:watch', 'imagemin:patterns:watch', 'copy:watch', 'copy:index:watch', 'assets:watch']);
}
