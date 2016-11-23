import Types from './types';
import { connecting, connected } from './actions';

// This wrapper function is used to provide this middleware with a closure to store variables.
const middleware = () => {
  // This assumes a single WebSocket connection.
  // If we require multiple socket connections, this can be an Object (map) instead.
  let websocket;

  const onOpen = (store) => event => {
    console.log(event);
    // Send a handshake, or authenticate with remote end
    // Tell the store we're connected
    store.dispatch(connected());
  };

  // Close the connection, first by checking if we have a websocket object
  const close = () => {
    if (websocket != null) {
      console.warn(`Closing WebSocket connection to ${websocket.url}.`);
      websocket.close();
      websocket = null;
    }
  };

  return store => next => (action) => {
    console.log(action);

    switch (action.type) {
      case Types.WEBSOCKET_CONNECT:
        // Start a new connection to the server
        close();

        websocket = new action.WebSocket(action.url);
        websocket.onopen = onOpen(store);
        // Send an action that shows a "connecting..." status for now
        store.dispatch(connecting());

        break;

      // The user wants us to disconnect
      case Types.WEBSOCKET_DISCONNECT:
        close();
        // Set our state to disconnected
        // store.dispatch(actions.disconnected());
        break;

      // This action is not relevant to
      default:
        next(action);
    }
  };
};

// const middleware = store => next => action => {
//   console.log('redux-websocket', action.type);
//   return next(action);
// };

export default middleware;
