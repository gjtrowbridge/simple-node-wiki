var test = require('tape');
var shared = require('./shared.js');

testAddDefaultParams = function(name, cb) {
  var decoratedFunction = shared.decorators.addDefaultParams({
    value1: 0,
    value2: 10,
    requiredValue: shared.constants.IS_REQUIRED
  }, function(parameters) {
    return parameters;
  });

  return test('A function decorated with addDefaultParams ' + name, function(assert) {
    cb(assert, decoratedFunction);
  });
};

testAddDefaultParams('throws if more or less than 1 argument is passed',
    function(assert, decoratedFunction) {
  assert.plan(2);

  var throw_regex = /only accepts one argument/;
  assert.throws(function() {
    decoratedFunction({ requiredValue: 'hi' }, 2);
  }, throw_regex);
  assert.throws(function() {
    decoratedFunction();
  }, throw_regex);
});

testAddDefaultParams('throws if the argument is not an object',
    function(assert, decoratedFunction) {
  assert.plan(1);
  assert.throws(function() {
    decoratedFunction(5);
  }, /The only argument.*should be an object/);
});

testAddDefaultParams('throws if required value is not provided',
    function(assert, decoratedFunction) {
  assert.plan(1);
  assert.throws(function() {
    decoratedFunction({});
  }, /required parameter.*was not provided/);
});

testAddDefaultParams('throws if an unexpected parameter is provided',
    function(assert, decoratedFunction) {
  assert.plan(1);
  assert.throws(function() {
    decoratedFunction({
      requiredValue: 5,
      unexpected_value: 2
    });
  }, /an unexpected parameter was passed/);
});

testAddDefaultParams('gives default value if non-required value is not provided',
    function(assert, decoratedFunction) {
  assert.plan(2);
  var parameters = decoratedFunction({
    requiredValue: 5
  });
  assert.equals(0, parameters.value1);
  assert.equals(10, parameters.value2);
});

testAddDefaultParams('overrides default value if non-required value is provided',
    function(assert, decoratedFunction) {
  assert.plan(2);
  var parameters = decoratedFunction({
    requiredValue: 5,
    value1: 12,
    value2: 'Ooga booga'
  });
  assert.equals(12, parameters.value1);
  assert.equals('Ooga booga', parameters.value2);
});
