/* eslint-env mocha */
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import td from 'testdouble';
import middleware, { WEBSOCKET_CONNECT } from '../src/';

const mockStore = configureMockStore([middleware]);

describe('middleware', () => {
  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');

    middleware()(next)(action);

    td.verify(next(action));
  });

  describe('WEBSOCKET_CONNECT', () => {
    const action = { type: WEBSOCKET_CONNECT };
    const next = td.func('next');
    class WebSocketStub {}
    global.WebSocket = WebSocketStub;

    it('call next action', () => {
      middleware(mockStore)(next)(action);
      td.verify(next(action));
    });

    it('', () => {
      middleware(mockStore)(next)(action);
      expect(middleware.websocket);
    });
  });
});
