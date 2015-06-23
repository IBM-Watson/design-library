---
title: Getting Started with UI Patterns
resources:
  links:
    - name: "Bower"
      source: http://bower.io/
    - name: "Sass"
      source: http://sass-lang.com/
    - name: "Compass"
      source: http://compass-style.org/
    - name: "LibSass"
      source: https://github.com/sass/libsass
    - name: "Node Sass"
      source: https://github.com/sass/node-sass
    - name: "Eyeglass"
      source: https://github.com/sass-eyeglass/eyeglass
    - name: "Gulp"
      source: http://gulpjs.com/
    - name: "Gulp Sass"
      source: https://github.com/dlmanning/gulp-sass/issues
    - name: "Node Sass Import Once"
      source: https://github.com/at-import/node-sass-import-once
---
Welcome to the IBM Watson Design Guide's Pattern Library!

The Pattern Library is a set of usable patterns expressed in HTML, Sass, and JavaScript, that can be used as a base for developing new or updating existing web projects, especially those that are powered by Watson.

## Installation

The Pattern Library can be installed through [Bower](http://bower.io):

```bash
$ bower install watson-design-library --save
```

This will install the patterns, as well as its dependencies and the documentation from the rest of this site, into the project's local `bower_components` folder.

## Working with the Pattern Library

Each pattern in the Pattern Library comes with HTML written in [Swig](http://paularmstrong.github.io/swig/) and self-contained Sass and JavaScript that can be brought in to a project as needed. While the Sass and JavaScript can be used across any web project, the HTML will likely need to be implemented on a project-by-project basis, depending on how HTML gets rendered for that project.

### Styling a Project

Styling for projects is done through [Sass](http://sass-lang.com). No CSS files are included intentionally. The styling that is available is basic and will not fit all projects; teams should include designers and developers to flesh out the styling of a project. What *is* provided are a set of patterns that encapsulate the design guidelines presented within the Watson Design Guide that are customizable to a project's needs within those guidelines.

All styling is written following our Sass and CSS Development Guidelines *(coming soon)*.

The Pattern Library is best used when it is customized for the needs of a given project. [Settings](/ui-patterns/documentation/settings) for customization are provided by [Toolkit](https://github.com/at-import/toolkit), so a project's main Sass file should be set up as follows:

```scss
@import "toolkit";

// Settings Go here

@import "watson-design-library/patterns/watson-patterns";

// Custom project styling
```

Import paths vary based on their precise location in regards to the main Sass file. Imports should only be imported once; this can be accomplished using [Compass Import Once](https://github.com/Compass/compass/tree/master/import-once) or [Node Sass Import Once](https://github.com/at-import/node-sass-import-once), amongst other tools.

Each pattern also includes an *Application Methods* section that will include the available mixins, extends, classes, and settings, as needed.

### JavaScript Interactivity

Some patterns will include JavaScript. When they do, the *Application Methods* section of a pattern will explain what files are needed (internally or as a 3rd party dependency) or if files can be ignored in favor of adding something else (for instance, including a [Modernizr](http://modernizr.com/) detect to a custom Modernizr build).

All JavaScript is written following our JavaScript Development Guidelines *(coming soon)*.
