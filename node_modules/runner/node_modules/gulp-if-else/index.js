/**
 * @name gulp-if-else
 * @requires gulp-util
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 * @link https://github.com/Nicolab/gulp-if-else
 * @license MIT https://github.com/Nicolab/gulp-if-else/blob/master/LICENSE
 */
var gutil = require('gulp-util');

/**
 * Expose
 *
 * @example
 * var gulp   = require('gulp');
 * var ifElse = require('gulp-if-else');
 *
 * // your code ...
 * 
 * gulp.src(source)
 *   .pipe(A)
 *   .pipe(ifElse(condition, B))
 *   .pipe(C)
 * 
 * @param  {bool}     condition       A condition (truthy or falsy)
 * @param  {function} callback        A callback if `condition` is truthy
 * @param  {function} [elseCallback]  A callback if `condition` is falsy
 * @return {Stream.prototype.pipe}    This function returns the destination stream.
 * @throws {PluginError}              If `callback` argument is not a function.
 */
module.exports = function ifElse(condition, callback, elseCallback){

  if(typeof callback != 'function') {
    throw new gutil.PluginError(
      'gulp-if-else', '"callback" argument must be a function.'
    );
  }

  if(condition) {
    return callback();
  }

  return typeof elseCallback == 'function'
    ? elseCallback() 
    : gutil.noop();
};