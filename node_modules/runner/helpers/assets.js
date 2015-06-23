'use strict';

var fs = require('fs-extra'),
    through = require('through2'),
    gutil = require('gulp-util'),
    util = require('util'),
    glob = require('glob'),
    uglify = require('uglifyjs'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'assets';

var inspect = function (object) {
  console.log(util.inspect(object, false, null));
}

module.exports = function (options) {
  options = options || {};

  var stream = through.obj(function (file, encoding, cb) {
    var assetObj = {},
        jsKeys = 0,
        _this = this,
        jsFiles = {};


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

    assetObj = JSON.parse(file.contents.toString());

    if (assetObj.js) {
      jsKeys = Object.keys(assetObj.js).length;

      Object.keys(assetObj.js).forEach(function (key) {
        var files = assetObj.js[key];

        jsFiles[key] = '';

        files.forEach(function (f) {
          var jelly;

          if (f === '<<modernizr>>') {
            jsFiles[key] += '\n/**\n  * Modernizr Build\n**/\n' + file.modernizr;
          }
          else {
            jelly = glob.sync(f);
            jelly.forEach(function (jam) {
              jsFiles[key] += '\n/**\n  * ' + jam + '\n**/\n' + fs.readFileSync(jam, 'utf-8');
            });
          }
        });

        if (options.minify) {
          jsFiles[key] = uglify.minify(jsFiles[key], {
            'fromString': true
          });

          jsFiles[key] = jsFiles[key].code;
        }

        fs.outputFileSync('.www/js/' + key + '.min.js', jsFiles[key]);
        gutil.log('Wrote ' + gutil.colors.magenta(key + '.min.js'));
      });
    }

    cb();
  });

  return stream;
}

/**
  *
**/
