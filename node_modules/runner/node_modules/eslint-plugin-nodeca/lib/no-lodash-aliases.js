/**
 * @fileoverview Rule to flag use of lodash (library) aliases
 * @author Nodeca Team <https://github.com/nodeca>
 */

'use strict';

var LODASH_FN_ALIASES = {
  drop:      'rest',
  head:      'first',
  object:    'zipObject',
  tail:      'rest',
  take:      'first',
  unique:    'uniq',
  unzip:     'zip',
  all:       'every',
  any:       'some',
  collect:   'map',
  detect:    'find',
  each:      'forEach',
  eachRight: 'forEachRight',
  findWhere: 'find',
  foldl:     'reduce',
  foldr:     'reduceRight',
  include:   'contains',
  inject:    'reduce',
  select:    'filter',
  extend:    'assign',
  methods:   'functions'
};

var LODASH_NAMES = [ 'lodash', '_' ];

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  return {
    'CallExpression': function detectLodashAlias(node) {

      var callee = node.callee;

      // Check patterns like `_.each(..)`,
      // that should be <Identifier.MemberExpression>

      if (callee.type === 'MemberExpression' &&
          LODASH_FN_ALIASES.hasOwnProperty(callee.property.name)) {

        var parentName = callee.object.name;

        if (callee.object.type === 'Identifier' &&
            LODASH_NAMES.indexOf(parentName) !== -1) {

          context.report(
            node,
            '{{ldh}}.{{alias}}() is alias, use {{ldh}}.{{method}}() instead.',
            {
              ldh:    parentName,
              alias:  callee.property.name,
              method: LODASH_FN_ALIASES[callee.property.name]
            }
          );
        }
      }
    }
  };
};
