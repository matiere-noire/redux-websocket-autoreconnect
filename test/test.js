/* eslint-env mocha */

import td from 'testdouble';
import expect from 'expect';
import middleware from '../src/';
import { createWebsocket } from '../src/websocket';

// This does not exist in the Node env, but does in the browser
import WebSocket from 'ws';
global.WebSocket = WebSocket;

class Socket {

}

describe('middleware', () => {

  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');

    middleware()(next)(action);

    td.verify(next(action));
  });

  context('createWebsocket', () => {
     it('should accept a default payload', () => {
       const payload = { url: 'ws://localhost' };

       const ws = createWebsocket(payload);
       expect(ws).toBeA(WebSocket);
     });

     it('accepts an alternative WebSocket', () => {
       const ws = createWebsocket({ websocket: Socket });
       expect(ws).toBeA(Socket);
     });
  });


});
