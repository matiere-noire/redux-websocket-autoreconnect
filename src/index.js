/* eslint-env browser */

import Types from './types';
import { connecting, connected, disconnected } from './actions';


function ConfigException(message) {
  this.message = message;
  this.name = 'ConfigException';
}

// This wrapper function is used to provide this middleware with a closure to store variables.
const createMiddleware = () => {
  // This assumes a single WebSocket connection.
  // If we require multiple socket connections, this can be an Object (map) instead.
  let websocket;


  const onOpen = (store) => event => {
    console.log(event);
    // Send a handshake, or authenticate with remote end
    // Tell the store we're connected
    store.dispatch(connected());
  };

  const onClose = store => {
    store.dispatch(disconnected());
  };

  const onMessage = store => {
    console.log(store);
  };

  // Close the connection, first by checking if we have a websocket object
  const websocketClose = () => {
    if (websocket != null) {
      console.warn(`Closing WebSocket connection to ${websocket.url}.`);
      websocket.close();
      websocket = null;
    }
  };

  const configure = (store, config) => {
    const WebsocketClass = config.websocket || WebSocket;
    const url = config.url;
    if (!url) {
      throw new ConfigException('A websocket URL is required.');
    }

    websocket = new WebsocketClass(url);
    websocket.onopen = onOpen(store);
    websocket.onclose = onClose(store);
    websocket.onmessage = onMessage(store);
  };


  /**
   * The primary Redux middleware function
   */
  return store => next => (action) => {
    console.log(action);

    switch (action.type) {
      case Types.WEBSOCKET_CONNECT:
        // Start a new connection to the server
        websocketClose();
        configure(store, action.payload);
        // Send an action that shows a "connecting..." status for now
        store.dispatch(connecting());
        break;

      // The user wants us to disconnect
      case Types.WEBSOCKET_DISCONNECT:
        websocketClose();
        break;

      case Types.WEBSOCKET_SEND:
        websocket.send(action.payload);
        break;
      // This action is not relevant to
      default:
        next(action);
    }
  };
};

// const example = store => next => action => {
//   console.log('redux-websocket', action.type);
//   return next(action);
// };

export const types = Types;

export default createMiddleware();
