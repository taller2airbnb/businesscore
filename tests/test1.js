'use strict';
const Suite = require('node-test');
const suite = new Suite('My Suite Name');

suite.test('Test 4', t => {
    t.equal(1,1);
});