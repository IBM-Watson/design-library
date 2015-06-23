'use strict';

var fs            = require('fs');
var path          = require('path');
var yaml          = require('js-yaml');


var linter        = require('eslint').linter;
var ESLintTester  = require('eslint-tester');


var eslintTester = new ESLintTester(linter);


var fixtures = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'fixtures.yml'), 'utf8'));


eslintTester.addRuleTest('lib/indent', fixtures.indent);
