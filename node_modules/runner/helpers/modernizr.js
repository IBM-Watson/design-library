'use strict';

var through = require('through2'),
    gutil = require('gulp-util'),
    modernizr = require('modernizr'),
    time = require('microtime'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'modernizr';

module.exports = function (options) {
  options = options || {};

  var stream = through.obj(function (file, encoding, cb) {
    var mdnzr,
        assetObj,
        start = time.now(),
        _this = this;

    //////////////////////////////
    // Basic Plugin Issues
    //////////////////////////////
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    assetObj = JSON.parse(file.contents.toString());

    if (assetObj.modernizr) {
      modernizr.build(assetObj.modernizr, function (result) {

        gutil.log('Custom Modernizr built in ' + gutil.colors.magenta(Math.round((time.now() - start)  / 1000) + 'ms'));

        file.modernizr = result;
        _this.push(file);
        cb();
      });
    }
    else {
      file.modernizr = null;
      _this.push(file);
      cb();
    }

  });

  return stream;
}
