'use strict';

var walker = require('fs-walk-glob-rules'),
    parse = require('./parse'),
    patterns = require('./patterns'),
    sortBy = require('./sortby');

//////////////////////////////
// Build the Menu
//////////////////////////////
var buildMenuJSON = function (directory, extensions, all, cb) {
  var start = process.hrtime(),
      sections = loadSections(),
      folderHolder = {},
      folderReverse = {},
      folderSort = {},
      output = [];

  // Get the files and folders
  parse.folders(directory, function (folders) {

    // Builds basic folder information
    folders.forEach(function (v) {

      var pattern = patterns.info(v);
      var id = pattern.id;
      var group = pattern.group;
      if (pattern.section !== pattern.id) {
        id = pattern.section + '-' + pattern.id
        group = pattern.section;
        if (pattern.group !== '') {
          group +=  '-' + pattern.group;
        }
      }

      folderHolder[id] = {
        title: pattern.title,
        group: group,
        submenu: [],
        all: []
      };

      // console.log(pattern);

      if (pattern.section === pattern.id) {
        folderHolder[id].all.push({
          title: 'View All',
          href: '/' + pattern.id
        });
      }
      // // If we're in a subsection, make sure it's prefixed
      // else {
      //   folderHolder[id].all.push({
      //     title: 'View All',
      //     href: '#/' + pattern.section + '?group=' + pattern.id
      //   });
      // }
    });


    parse.files(directory, extensions, function (files) {

      // Sorts files into their groups
      files.forEach(function (v) {
        var pattern = patterns.info(v);
        var item = {
          title: pattern.title,
          href: '/' + pattern.section + '/' + pattern.id
        }


        // if (pattern.group === '') {
        if (folderHolder[pattern.section] && folderHolder[pattern.section].submenu) {
          folderHolder[pattern.section].submenu.push(item);
        }
        // }
        // else {
        //   folderHolder[pattern.section + '-' + pattern.group].submenu.push(item);
        // }
      });


      // console.log(folderHolder);
      // Grab the core groups
      for (var k in folderHolder) {
        var folder = folderHolder[k];
        var group = folder.group;

        if (folder.group === '') {
          if (sections[k] && sections[k].title) {
            folder.title = sections[k].title;
          }
          else {
            folder.title = patterns.titleize(k);
          }
          // console.log(folder.title);
          folderSort[k] = folder;
          delete folderHolder[k];
        }
      }
      // Reverse the remaining
      var reverseKeys = Object.keys(folderHolder).reverse();
      reverseKeys.forEach(function (v) {
        folderReverse[v] = folderHolder[v];
      });

      // Deep Nested Items
      for (var k in folderReverse) {
        var folder = folderReverse[k];
        var group = folder.group;

        if (folderReverse[group]) {
          var subMenu = folder.submenu.sort(function (a, b) {
                return sortBy.title(a, b);
              });
          if (all) {
            subMenu = subMenu.concat(folder.all);
          };
          folderReverse[group].submenu.push({
            title: folder.title,
            submenu: subMenu
          });
          delete folderReverse[k];
        }
      }

      // First Level Items (below core folders)
      for (var k in folderReverse) {
        var folder = folderReverse[k];
        var group = folder.group;

        if (folderSort[group]) {
          var subMenu = folder.submenu.sort(function (a, b) {
                return sortBy.title(a, b);
              });
          if (all) {
            subMenu = subMenu.concat(folder.all);
          };
          folderSort[group].submenu.push({
            title: folder.title,
            submenu: subMenu
          });
        }
      }

      // Core folders
      for (var k in folderSort) {
        var folder = folderSort[k];
        var subMenu = folder.submenu.sort(function (a, b) {
              return sortBy.title(a, b);
            });
        if (all) {
          subMenu = subMenu.concat(folder.all);
        };

        if (folder.submenu.length) {
          output.push({
            title: folder.title,
            submenu: subMenu
          });
        }
      }

      // time.elapsed(start, 'build.menuJSON');
      return cb(output);
    });
  });
}

var loadSections = function loadSections () {
  var sections = [];
  var walked = walker.transformSync({
    root: process.cwd() + '/.tmp/',
    rules: {
      '**/*.html': '$1'
    }
  });

  walked.forEach(function (file) {
    var path = file.relative.split('/'),
        pFinal = '',
        pHolder = '';
    path.pop();
    path.shift();
    pFinal = path.join('/');

    if (pHolder !== '' && sections.indexOf(pHolder) === -1) {
      sections.push(pHolder);
    }
  });

  return sections;
}

module.exports = buildMenuJSON;
