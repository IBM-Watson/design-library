'use strict';

var should = require('should'),
    sass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    importer = require('../index');

var filePath = function (file) {
  return path.join(path.join(__dirname, 'sass'), file);
};

describe('import-once', function () {
  it('should import files only once', function (done) {
    var file = filePath('basic-import-once.scss'),
        expectedIncludes = [
          file,
          'partial-with-selectors'
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/basic-import-once.css'), 'utf8')
      );
      done();
    });
  });

  it('should import `index` files from a folder', function (done) {
    var file = filePath('import-index.scss'),
        expectedIncludes = [
          file,
          'foo'
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'index': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-index.css'), 'utf8')
      );
      done();
    });
  });

  it('should import `css` files as Sass from a folder', function (done) {
    var file = filePath('import-css.scss'),
        expectedIncludes = [
          file,
          'imported-css'
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'css': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-css.css'), 'utf8')
      );
      done();
    });
  });

  it('should import `bower` files as Sass from a folder', function (done) {
    var file = filePath('import-bower.scss'),
        expectedIncludes = [
          file,
          'breakpoint',
          'breakpoint/context',
          'breakpoint/helpers',
          'breakpoint/no-query',
          'breakpoint/parsers',
          'breakpoint/respond-to',
          'double/default',
          'double/default-pair',
          'double/double-string',
          'parsers/double',
          'parsers/query',
          'parsers/resolution',
          'parsers/single',
          'parsers/triple',
          'resolution/resolution',
          'single/default',
          'toolkit/kickstart',
          'triple/default'
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'bower': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-bower.css'), 'utf8')
      );
      done();
    });
  });

  it('should import JSON files as a Sass map', function (done) {
    var file = filePath('import-json.scss'),
        expectedIncludes = [
          file,
          'colors.json'
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      // console.log(result.stats.includedFiles);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-json.css'), 'utf8')
      );
      done();
    });
  });

  it('should import YAML files as a Sass map', function (done) {
    var file = filePath('import-yaml.scss'),
        expectedIncludes = [
          file,
          'colors.yaml'
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      // console.log(result.stats.includedFiles);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-json.css'), 'utf8')
      );
      done();
    });
  });

  it('should support custom include paths', function (done) {
    var file = filePath('import-custom.scss'),
        expectedIncludes = [
          file,
          'custom-import'
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'includePaths': [
        'custom'
      ]
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      // console.log(result.stats.includedFiles);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-custom.css'), 'utf8')
      );
      done();
    });
  });

  it('should import Bootstrap as Sass', function (done) {
    var file = filePath('import-bootstrap.scss'),
        expectedIncludes = [
          file,
          'bootstrap'
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'css': true,
        'bower': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-bootstrap.css'), 'utf8')
      );
      done();
    });
  });

  it('should fall back to import paths and bower if data is passed in instead of a file name', function (done) {
    var file = filePath('basic-import-once.scss'),
        expectedIncludes = [
          'partial-with-selectors'
        ];

    sass.render({
      'data': fs.readFileSync(file, 'utf-8'),
      'importer': importer,
      'includePaths': [
        path.dirname(file)
      ]
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/basic-import-once.css'), 'utf8')
      );
      done();
    });
  });
});
