/* eslint-env mocha */
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import td from 'testdouble';
import { WebSocket, Server } from 'mock-socket';

import middleware, { WEBSOCKET_CONNECT } from '../src/';
import { open } from '../src/actions';

const mockStore = configureMockStore([middleware]);

describe('middleware', () => {
  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');

    middleware()(next)(action);

    td.verify(next(action));
  });

  describe('WEBSOCKET_CONNECT', () => {
    const url = 'ws://localhost:8080';
    const store = mockStore({});
    const next = td.func('next');
    const action = { type: WEBSOCKET_CONNECT, payload: { url } };

    it('dispatches a WEBSOCKET_OPEN action', (done) => {
      const mockServer = new Server(url);
      // Calling the middleware with a WEBSOCKET_CONNECT instantly connects to
      // a WebSocket serve
      middleware(store)(next)(action);

      setTimeout(() => {
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0].type).toEqual(open().type);
        mockServer.stop(done);
      }, 100);
    });
  });
});
