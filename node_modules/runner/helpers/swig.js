'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var swig = require('swig'),
    path = require('path'),
    fs = require('fs-extra'),
    marked = require('./markdown'),
    fs = require('fs-extra');

var ibmColors = fs.readJSONSync(process.cwd() + '/bower_components/ibm-colors/ibm-colors.json');

//////////////////////////////
// Pattern Swig Tag
//////////////////////////////
var swigPatternTag = {
  parse: function (str, line, parser, types, options) {
    // Start of a parse
    parser.on('start', function () {

    });

    // Match of any token
    parser.on('*', function (token) {
      if (token.type !== 0 && token.match !== 'from') {
        this.out.push(token.match)
      }
    });

    // End of parse
    parser.on('end', function () {
      this.out.push(options.filename || null);
    });

    // Parser is good to go
    return true;
  },
  compile: function (compiler, args) {
    var file = '"patterns/' + args[1] + '/' + args[0] + '/' + args[0] + '.html"',
        pattern = 'pattern ' + args[0] + ' from ' + args[1];

    return '_output += "\\n<!-- {% ' + pattern + ' %} -->\\n" + _swig.compileFile(' + file + ')(_ctx) + "<!-- {% end ' + pattern + ' %} -->\\n";\n';
  },
  ends: false
}

swig.setTag(
  'pattern',
  swigPatternTag.parse,
  swigPatternTag.compile,
  swigPatternTag.ends
);

//////////////////////////////
// Color Filters
//////////////////////////////
var getIBMColor = function getIBMColor (palette, tint) {
  palette = palette.toLowerCase();

  return ibmColors[palette][tint];
}

swig.setFilter('ibmTextColor', function (tint) {
  if (tint === 'core' || tint >= 50) {
    return getIBMColor('white', 'core');
  }
  else {
    return getIBMColor('gray', 90);
  }
});

swig.setFilter('ibmSass', function (palette, tint) {
  if (typeof tint === 'string' && tint.toLowerCase() === 'core') {
    tint = ''
  }
  else {
    tint = ', ' + tint;
  }

  return 'color(\'' + palette.toLowerCase() + '\'' + tint + ')';
});

swig.setFilter('ibmHex', function (palette, tint) {
  return getIBMColor(palette, tint);
});

swig.setFilter('ibmRGB', function (palette, tint) {
  var hex = getIBMColor(palette, tint),
      r, g, b;

  hex = hex.substr(1);

  if (hex.length === 3) {
    r = parseInt(hex[0] + '' + hex[0], 16);
    g = parseInt(hex[1] + '' + hex[1], 16);
    b = parseInt(hex[2] + '' + hex[2], 16);
  }
  else if (hex.length === 6) {
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  }
  else {
    throw new Error('Invalid Hex color ' + hex);
  }

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
});

//////////////////////////////
// File Types
//////////////////////////////
var getFileExtension = function getFileExtension(file) {
  return path.extname(file).replace('.', '');
}

swig.setFilter('fileExtension', function (file) {
  return getFileExtension(file);
});

swig.setFilter('mp4', function (file) {
  file = file.replace('.' + getFileExtension(file), '.mp4');
  return file;
});

swig.setFilter('smallerVideo', function (file) {
  var webm = fs.statSync('./language' + file);
  var mp4 = fs.statSync('./language' + file.replace('.' + getFileExtension(file), '.mp4'));

  if (webm.size < mp4.size) {
    return 'webm';
  }
  else {
    return 'mp4';
  }
});

swig.setFilter('fileType', function (file) {
  var ext = getFileExtension(file);
  if (ext !== 'webm' && ext !== 'mp4') {
    return 'image';
  }
  else {
    return 'video';
  }
});

//////////////////////////////
// Markdown Filter
//////////////////////////////
swig.setFilter('markdown', function (text) {
  return marked(text);
});

//////////////////////////////
// Export Swig
//////////////////////////////
module.exports = swig;
