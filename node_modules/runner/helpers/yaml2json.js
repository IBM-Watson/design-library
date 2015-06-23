//////////////////////////////
// yaml2json
//  - A Gulp Plugin
//
// Converts YAML to JSON
//////////////////////////////
'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var through = require('through2'),
    gutil = require('gulp-util'),
    yaml = require('js-yaml'),
    path = require('path'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'yaml2json';

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (options) {
  options = options || {};

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
  var stream = through.obj(function (file, encoding, cb) {
    var ext = path.extname(file.path).toLowerCase(),
        contents = '';

    /////////////////////////////
    // Default plugin issues
    //////////////////////////////
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    //////////////////////////////
    // Manipulate Files
    //////////////////////////////
    if (ext === '.yml' || ext === '.yaml') {
      contents = JSON.stringify(yaml.safeLoad(file.contents.toString()));
      file.contents = new Buffer(contents);
      file.path = gutil.replaceExtension(file.path, '.json');
    }

    //////////////////////////////
    // Push the file back to the stream!
    //////////////////////////////
    this.push(file);

    //////////////////////////////
    // Callback to tell us we're done
    //////////////////////////////
    cb();
  })

  return stream;
}
