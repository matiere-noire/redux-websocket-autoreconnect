/* eslint-env browser */

import Types from './types';

// These actions are more concerned with connection state
// and are trigged async by the WebSocketMiddleware

export const connecting = () => ({
  type: Types.WEBSOCKET_CONNECTING,
  timestamp: new Date()
});

export const connected = () => ({
  type: Types.WEBSOCKET_CONNECTED,
  timestamp: new Date()
});

export const disconnected = () => ({
  type: Types.WEBSOCKET_DISCONNECTED,
  timestamp: new Date()
});


export default {};
