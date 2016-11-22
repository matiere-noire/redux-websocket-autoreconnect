/* eslint-env mocha */
// import deepFreeze from 'deep-freeze';
import td from 'testdouble';
import chai from 'chai';

const { expect, assert } = chai;

// Export an object with spec helper functions or libraries.
// export { describe, it, beforeEach, afterEach, deepFreeze, td, expect, assert };

// import { describe, it, td } from '../../spec_helper';
import middleware from '../src/';

describe('middleware', () => {
  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');

    middleware()(next)(action);

    td.verify(next(action));
  });
});
