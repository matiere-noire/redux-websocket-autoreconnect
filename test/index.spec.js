/* eslint-env mocha */
import td from 'testdouble';
import middleware from '../src/';

describe('middleware', () => {
  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');

    middleware()(next)(action);

    td.verify(next(action));
  });
});
