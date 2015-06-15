'use strict';

module.exports = {
  rules: {
    'indent': require('./lib/indent'),
    'no-async-aliases': require('./lib/no-async-aliases'),
    'no-lodash-aliases': require('./lib/no-lodash-aliases'),
    'no-wire-anonymous': require('./lib/no-wire-anonymous')
  }
};
