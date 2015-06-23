'use strict';

var gutil           = require('gulp-util'),
    chalk           = require('chalk'),
    fs              = require('fs-extra'),
    transform       = require('stream').Transform,
    _s              = require('underscore.string'),
    PLUGIN_NAME     = 'gulp-toolkit';

//////////////////////////////
// Find
//////////////////////////////
var findTargets = function (file) {
  var regex = new RegExp(/(\/\*\! \@\{target\:\s*?).*?([^"]*?)(\} \*\/)/gi),
      replaceRegex = '',
      matches = '',
      match = '',
      parts = '',
      replace = '',
      endString = '',
      files = {},
      cut = '',
      start = 0,
      end = 0,
      result = {};

  matches = file.match(regex);

  for (var i in matches) {
    match = matches[i];
    regex = new RegExp(/(\/\*\! \@\{target\:\s*?).*?([^"]*?)(\} \*\/)/gi)

    parts = regex.exec(match);
    endString = '/*! {target:' + parts[2] + '}@ */'

    start = file.indexOf(parts[0]);
    end = file.indexOf(endString) + endString.length;

    cut = file.slice(start, end);
    file = file.slice(0, start - 1) + file.slice(end + 1);

    cut = cut.replace(parts[0], '').replace(endString, '');

    if (files[parts[2]]) {
      files[parts[2]].push(cut);
    }
    else {
      files[parts[2]] = [];
      files[parts[2]].push(cut);
    }
  }

  result.file = file;
  result.files = files;

  return result;
}

//////////////////////////////
// Export gulp-toolkit
//////////////////////////////
module.exports = function (options) {
  var stream = new transform({ objectMode: true });

  stream._transform = function (file, unused, done) {

    if (file.isNull()) {
      stream.push(file);
      done();
      return;
    }

    var targets = findTargets(String(file.contents));
    var base = options !== undefined && options.base !== undefined && typeof options.base === 'string' ? options.base : file.base;
        base = base.charAt(base.length - 1) !== '/' ? base += '/' : base;

    for (var i in targets.files) {
      var filename = _s.slugify(i) + '.css';
      var contents = targets.files[i].join('');

      gutil.log('Creating target file ' + chalk.magenta(filename));
      fs.outputFile(base + filename, contents, function (err) {
        if (err) {
          return new gutil.PluginError({
            plugin: PLUGIN_NAME,
            message: 'Error creating target file: ' + err
          });
        }
      });
    }

    file.contents = new Buffer(targets.file);
    stream.push(file);
    if (Object.keys(targets.files).length) {
      gutil.log('Removed targeted CSS from ' + chalk.magenta(file.path.replace(file.base + '/', '')));
    }

    done();
    return;
  }

  return stream;
}