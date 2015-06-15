'use strict';

var gutil = require('gulp-util'),
    path = require('path'),
    dir = require('node-dir');

//////////////////////////////
// Parses a directory's folders
//////////////////////////////
var parseDirectoryFolders = function (directory, cb) {
  // Create output
  var output = [];

  dir.subdirs(directory, function (err, subdirs) {
    // If there's an error, throw an error
    if (err) {
      var spError = new gutil.PluginError('Style Prototypes Directory (Folder) Parser', {
        message: err
      });
    }
    // No error, return the sorted relative paths
    else {
      // console.log(subdirs);
      subdirs.forEach(function (v) {
        output.push(v.replace(directory, ''));
      });
      return cb(output.sort());
    }
  });
}

//////////////////////////////
// Parses a directory's files
//////////////////////////////
var parseDirectoryFiles = function (directory, extensions, cb) {
  // Create output
  var output = [];
  // Parse the directory
  dir.files(directory, function (err, files) {
    // If there's an error, throw an error
    if (err) {
      var spError = new gutil.PluginError('Style Prototypes Directory (File) Parser', {
        message: err
      });
    }
    // No error, turn the URLs into relative files
    else {
      files.forEach(function (f) {
        // Push files onto the output tree
        if (extensions.indexOf(path.extname(f)) >= 0 ) {
          output.push(f.replace(directory, ''));
        }
      });
    }
    // Return the callback with the output sorted
    return cb(output.sort());
  });
}

//////////////////////////////
// Exports
//////////////////////////////
module.exports.folders = parseDirectoryFolders;
module.exports.files = parseDirectoryFiles;
