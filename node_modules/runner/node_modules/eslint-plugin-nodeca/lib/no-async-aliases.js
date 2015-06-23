/**
 * @fileoverview Rule to flag use of async (library) aliases
 * @author Nodeca Team <https://github.com/nodeca>
 */

'use strict';

var ASYNC_FN_ALIASES = {
  forEach:        'each',
  forEachSeries:  'eachSeries',
  forEachLimit:   'eachLimit',
  inject:         'reduce',
  foldl:          'reduce',
  foldr:          'reduceRight',
  select:         'filter',
  selectSeries:   'filterSeries',
  any:            'some',
  all:            'every'
};

var ASYNC_NAME = 'async';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  return {
    'CallExpression': function detectAsyncAlias(node) {

      var callee = node.callee;

      // Check patterns like `async.forEach(..)`,
      // that should be <Identifier.MemberExpression>

      if (callee.type === 'MemberExpression' &&
          ASYNC_FN_ALIASES.hasOwnProperty(callee.property.name)) {

        var parentName = callee.object.name;

        if (callee.object.type === 'Identifier' &&
            parentName === ASYNC_NAME) {

          context.report(
            node,
            '{{async}}.{{alias}}() is alias, use {{async}}.{{method}}() instead.',
            {
              async:  parentName,
              alias:  callee.property.name,
              method: ASYNC_FN_ALIASES[callee.property.name]
            }
          );
        }
      }
    }
  };
};
