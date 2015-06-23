//////////////////////////////
// library-build
//  - A Gulp Plugin
//
// 'Builds markdown files into HTML'
//////////////////////////////
'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs-extra'),
    marked = require('./markdown'),
    swig = require('./swig'),
    yaml = require('js-yaml'),
    path = require('path'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'library-build';

//////////////////////////////
// Set up subcontent imports
//////////////////////////////
var subcontent = fs.readdirSync('library/templates/subcontent'),
    scImport = '';

subcontent.forEach(function (file) {
  var macroName = path.basename(file, path.extname(file));
  scImport += '{% import "' + process.cwd() + '/library/templates/subcontent/' + file + '" as ' + macroName + ' %}\n';
});

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
  var compile = through.obj(function (file, encoding, cb) {
    var paths = {
      'relative': file.path.replace(process.cwd() + '/', ''),
      'folder': file.path.replace(process.cwd() + '/', '').split('/').slice(0, -1).join('/'),
      'inner': file.path.replace(process.cwd() + '/', '').split('/').slice(1, -1).join('/')
    };

    var renderedPage = '',
        frontmatter = yaml.safeDump(file.meta);

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
    renderedPage = marked(file.contents.toString());

    if (file.meta && file.meta.variables) {
      renderedPage = scImport + renderedPage;

      var compile = swig.compile(renderedPage, {
        filename: file.path
      });

      renderedPage = compile(file.meta.variables);
    }


    if (Object.keys(file.meta).length) {
      frontmatter = '---\n' + frontmatter + '---\n';
    }
    else {
      frontmatter = '';
    }

    renderedPage = frontmatter + '<div class="base--STYLED">\n' + renderedPage + '</div>';

    file.contents = new Buffer(renderedPage);
    // console.log(file.path);
    if (file.path.split('/').pop() === '404.md') {
      file.path = paths.folder + '/404.html';
    }
    else {
      file.path = paths.folder + '/index.html';
    }


    gutil.log('Page ' + gutil.colors.magenta(paths.relative) + ' compiled');

    //////////////////////////////
    // Push the file back to the stream!
    //////////////////////////////
    this.push(file);

    //////////////////////////////
    // Callback to tell us we're done
    //////////////////////////////
    cb();
  })

  return compile;
}
