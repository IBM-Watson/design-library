'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    clean = require('del');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {
  //////////////////////////////
  // Clean Server
  //////////////////////////////
  gulp.task('clean:server', function (cb) {
    return clean([
      '.www/**/*',
      '!.www/.gitkeep',
      '!.www/CNAME',
      '.tmp/'
    ], cb);
  });
}
