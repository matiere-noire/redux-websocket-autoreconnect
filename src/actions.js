/* eslint-env browser */

import Types from './Types';

export const connect = (url = 'ws://localhost:8010') => ({
  type: Types.CONNECT,
  WebSocket,
  url
});

// These actions are more concerned with connection state
// and are trigged async by the WebSocketMiddleware

export const connecting = () => ({
  type: Types.CONNECTING,
  timestamp: new Date()
});

export const connected = () => ({
  type: Types.CONNECTED,
  timestamp: new Date()
});

export default {};
