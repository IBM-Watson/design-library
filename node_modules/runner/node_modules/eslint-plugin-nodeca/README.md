ESLint indentation check and other rules
========================================

[![Build Status](https://travis-ci.org/nodeca/eslint-plugin-nodeca.svg?branch=master)](https://travis-ci.org/nodeca/eslint-plugin-nodeca)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-nodeca.svg)](https://www.npmjs.org/package/eslint-plugin-nodeca)

May be you know, that indentation check was removed from jshint 2.5.0,
and not yet implemented in eslint. Now you can check code indentation again,
with awesome [eslint](http://eslint.org/) and this plugin.

install:

```bash
npm install eslint-plugin-nodeca --save
```

Then update `.eslintrc` from instruction below.


Indent rule
-----------

Params:

- __indent type__ - 'tabs' / 'spaces' (default - spaces)
- __indent size__ - 2 (default)

Config example (yaml):

```yaml
# acivate plugin

plugins:
  - nodeca

# enable rules

rules:
  nodeca/indent: [ 2, spaces, 2 ]

  # If you are ok with defaults:
  #
  # nodeca/indent: 2
```

Other rules
-----------

Probably, you never need this ones. Those are for internal nodeca needs.

- __no-async-aliases__ - warn on deprecated methods in `async` module.
- __no-lodash-aliases__ - warn on deprecated methods in `lodash` module.
- __no-wire-anonymous__ - prohibit anon functions in event handlers of nodeca wire mediator.


Authors
-------

- Kirill Efimov [github/Kirill89](https://github.com/Kirill89)
- Vitaly Puzrin [github/puzrin](https://github.com/puzrin)


License
-------

[MIT](https://github.com/nodeca/eslint-plugin-nodeca/blob/master/LICENSE)