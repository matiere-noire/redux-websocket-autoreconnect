/* eslint-env browser */
// @flow
import * as Types from './types';

// These actions are more concerned with connection state
// and are trigged async by the WebSocketMiddleware

export const connecting = (event: Event, websocket: ?WebSocket): Action => ({
  type: Types.WEBSOCKET_CONNECTING,
  payload: {
    timestamp: new Date(),
    event,
    websocket
  }
});

export const open = (event: Event): Action => ({
  type: Types.WEBSOCKET_OPEN,
  payload: {
    timestamp: new Date(),
    event
  }
});

export const closed = (event: Event): Action => ({
  type: Types.WEBSOCKET_CLOSED,
  payload: {
    timestamp: new Date(),
    event
  }
});

export const message = (event: MessageEvent): Action => ({
  type: Types.WEBSOCKET_MESSAGE,
  payload: {
    timestamp: new Date(),
    data: event.data,
    event
  }
});

export default {};
