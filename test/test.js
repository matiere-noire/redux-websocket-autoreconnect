/* eslint-env mocha */
const td = require('testdouble');
const chai = require('chai');

const { expect, assert } = chai;

const middleware = require('../dist/').default;

describe('middleware', () => {
  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');
    middleware()(next)(action);

    td.verify(next(action));
  });
});
