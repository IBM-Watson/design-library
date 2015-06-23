gulp-css-target
============

Break a CSS file down into multiple targets allowing for better targeting and performance. See the `test` directory for a working example.

## Installation

```bash
npm install --save gulp-css-target
```

## Usage

### In CSS

```css
/**
  * Target
**/
.target {
  _test: "@include target(test-target) { content: bar }";
}
/*! @{target: My Awesome Target} */
.target {
  content: bar;
}

/*! {target: My Awesome Target}@ */
/*! @{target:a-target-without-space} */
.baz {
  content: qux;
}

/*! {target:a-target-without-space}@ */
```

### JavaScript
```javascript
var target = require('../index.js');

// Same Directory
gulp.task('target', function () {
  return gulp.src('css/**/*.css')
    .pipe(target())
    .pipe(gulp.dest('css/'));
});

// New Directory
gulp.task('target-new', function () {
  return gulp.src('css/**/*.css')
    .pipe(target({
      base: 'output'
    }))
    .pipe(gulp.dest('output/'));
});
```

## Options

**base**: Specifies the relative directory (to where you run `gulp` from) to place the CSS files that will be created. If not included, will place into the same directory as the file being read.

## Important

Only the original file will be returned into the stream to be worked on, with the target sections removed. The files that get spun out of the original file can be picked back up again if you're glob watching, but they do not become part of the stream.