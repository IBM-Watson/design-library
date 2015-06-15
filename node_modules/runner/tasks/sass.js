'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    fs = require('fs-extra'),
    ifElse = require('gulp-if-else'),
    importOnce = require('node-sass-import-once'),
    inline_base64 = require('gulp-css-base64'),
    autoprefixer = require('gulp-autoprefixer'),
    dest = require('../helpers/relative-dest');

//////////////////////////////
// Internal Vars
//////////////////////////////
var toWatch = [
  'patterns/**/*.scss',
  'patterns/**/*.sass',
  'library/sass/**/*.scss',
  'library/sass/**/*.sass'
];

var toSass = process.cwd() + '/library/sass/style.scss';

var sassSettings = {
  'outputStyle': 'compressed',
  'importer': importOnce,
  'importOnce': {
    'index': true,
    'css': false,
    'bower': true
  }
};

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, sassPaths) {
  //////////////////////////////
  // TERRIBLE HORRIBLE HACK BECAUSE THINGS ARE TERRIBLE AND HORRIBLE WITH LIBSASS RIGHT NOW
  //////////////////////////////
  gulp.task('sass:fix-libsass', function (cb) {
    var files = [
      'bower_components/modular-scale/stylesheets/modular-scale/_sort-list.scss'
    ];

    files.forEach(function (path) {
      var file = fs.readFileSync(path, 'utf-8');
      file = file.replace(/\@elseif/g, '@else if');
      fs.writeFileSync(path, file);
    });

    cb();
  });

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var sassTask = function (path) {
    return gulp.src(path)
      .pipe(sass(sassSettings).on('error', sass.logError))
      .pipe(rename(function (path) {
        path.dirname = '..';
      }))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(dest('./.www/css/'));
  };

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('sass', function () {
    return gulp.src(toSass)
      .pipe(sass(sassSettings))
      .pipe(rename(function (path) {
        path.dirname = '..';
      }))
      .pipe(inline_base64({
        'baseDir': './.www',
        'maxWeightResource': 13 * 1024,
        'extensionsAllowed': [
          '.svg',
          '.woff'
        ]
      }))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(dest('./.www/css/'));
  });

  //////////////////////////////
  // Server Initialization Task
  //////////////////////////////
  gulp.task('sass:server', function () {
    return sassTask(toSass);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('sass:watch', function () {
    return gulp.watch(toWatch)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return sassTask(toSass);
      });
  });
}
