/* eslint-env browser */
/* @flow */
import Types from './types';
import { connecting, open, closed, message } from './actions';
import { createWebsocket } from './websocket';

const createMiddleware = () => {
  // Hold a reference to the WebSocket instance in use.
  let websocket: ?WebSocket;

  const onOpen = store => (event: Event) => store.dispatch(open(event));
  const onClose = store => (event: Event) => store.dispatch(closed(event));
  const onMessage = store => (event: MessageEvent) => store.dispatch(message(event));
  const onConnecting = store => (event: Event) => store.dispatch(connecting(event, websocket));

  /**
   * A function to create the WebSocket object and attach the standard callbacks
   */
  const initialize = (store, config: Config) => {
    websocket = createWebsocket(config);

    websocket.onopen = onOpen(store);
    websocket.onclose = onClose(store);
    websocket.onmessage = onMessage(store);
    // An optimistic callback assignment for WebSocket objects that support this
    websocket.onconnecting = onConnecting(store);
  };

  /**
   * Close the WebSocket connection and cleanup
   */
  const close = () => {
    if (websocket) {
      console.warn(`Closing WebSocket connection to ${websocket.url} ...`);
      websocket.close();
      websocket = null;
    }
  };

  /**
   * The primary Redux middleware function.
   * Each of the actions handled are user-dispatched.
   */
  return (store: Object) => (next: Function) => (action: Action) => {
    switch (action.type) {
      // User request to connect
      case Types.WEBSOCKET_CONNECT:
        close();
        initialize(store, action.payload);
        break;

      // User request to disconnect
      case Types.WEBSOCKET_DISCONNECT:
        close();
        break;

      // User request to send a message
      case Types.WEBSOCKET_SEND:
        if (websocket) {
          websocket.send(JSON.stringify(action.payload));
        } else {
          console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first.');
        }
        break;

      default:
        next(action);
    }
  };
};

export const types = Types;

export default createMiddleware();
