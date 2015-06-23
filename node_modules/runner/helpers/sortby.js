'use strict';

//////////////////////////////
// Array sort function for items with properties.
// Sorts on item[prop]
//////////////////////////////
var sortBy = function (a, b, prop) {
  var propA = a[prop],
      propB = b[prop];

  if (propA < propB) {
    return -1;
  }
  else if (propA > propB) {
    return 1;
  }
  else {
    return 0;
  }
}

//////////////////////////////
// Sorts on item.name
//////////////////////////////
var byName = function (a, b) {
  return sortBy(a, b, 'name');
}

//////////////////////////////
// Sorts on item.title
//////////////////////////////
var byTitle = function (a, b) {
  return sortBy(a, b, 'title');
}

//////////////////////////////
// Exports
//////////////////////////////
module.exports.property = sortBy;
module.exports.name = byName;
module.exports.title = byTitle;