'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs-extra'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'relative-copy';

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (path, options) {
  path = path || './';
  options = options || {};

  //////////////////////////////
  // Massage Path
  //////////////////////////////
  if (path.substr(path.length - 1) !== '/') {
    path += '/';
  }

  //////////////////////////////
  // Command line arguments for each option
  //////////////////////////////
  process.argv.forEach(function (val, index, array) {
    if (index >= 3) {
      switch (val) {
        case '--fail': options.failOnError = true; break;
      }
    }
  });

  //////////////////////////////
  // Through Object
  //////////////////////////////
  var compile = through.obj(function (file, encoding, cb) {
    var relative = path + file.path.replace(process.cwd() + '/', '').split('/').slice(1).join('/'),
        self = this;

    /////////////////////////////
    // Deal with errors and such
    //////////////////////////////
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    //////////////////////////////
    // Write
    //////////////////////////////
    fs.outputFile(relative, file.contents, function (err) {
      if (err) {
        self.emit('error', new PluginError(PLUGIN_NAME, err.toString()));
      }
      self.push(file);
      return cb();
    });
  })

  return compile;
}
