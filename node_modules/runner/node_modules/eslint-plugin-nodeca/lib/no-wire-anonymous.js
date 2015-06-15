/**
 * @fileoverview Rule to flag use of anonymous functions
 * as callback of N.wire.on, N.wire.before, N.wire.after
 *
 * @author Nodeca Team <https://github.com/nodeca>
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

  return {
    'CallExpression': function (node) {
      if (!node.callee || !node.callee.property) {
        return;
      }

      var callee = node.callee;

      if ([ 'on', 'before', 'after' ].indexOf(callee.property.name) === -1) {
        return;
      }

      var calleeObj = node.callee.object;

      if ((calleeObj && calleeObj.property && calleeObj.property.name === 'wire') &&
          (calleeObj.object && calleeObj.object.name === 'N')) {

        node.arguments.forEach(function (arg) {
          // FunctionExpression with name will have 'id' property
          if (arg.type === 'FunctionExpression' && !arg.id) {
            context.report(node, 'Don\'t use anonymous function here.');
          }
        });
      }
    }
  };
};
