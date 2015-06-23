'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var sequence = require('run-sequence');

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp) {
  gulp.task('default', function (cb) {
    return sequence(
      'refresh:server',
      'serve',
      cb
    );
  });
}
