# redux-websocket

A Redux middleware for managing data over a WebSocket connection.

This middleware uses actions, dispatched with Redux to interact with a WebSocket server including connect, disconnect, message sending, and message receiving. All actions follow the [Flux Standard Action](https://github.com/acdlite/flux-standard-action) model. 

```bash
$ npm install @giantmachines/redux-websocket --save
```

## Middleware Installation

Once you have installed the library via npm, you can add it to your Redux middleware stack just like you would any other middleware.

```javascript
// ... other imports
import websocket from '@giantmachines/redux-websocket'

const app = combineReducers(reducers)
const store = createStore(
  app,
  applyMiddleware(
    websocket,
    ...
  )
)
```

## Available Action Types

The following types are available.

```javascript
// Action types to be dispatched by the user
WEBSOCKET_CONNECT
WEBSOCKET_DISCONNECT
WEBSOCKET_SEND

// Action types dispatched by the WebSocket implementation.
// These would be caught by reducers or other middleware.
WEBSOCKET_CONNECTING
WEBSOCKET_OPEN
WEBSOCKET_CLOSED
WEBSOCKET_MESSAGE
```

They can be imported from the standard package and used like so

```javascript
import { WEBSOCKET_CONNECT } from '@giantmachines/redux-websocket'

store.dispatch({
  type: WEBSOCKET_CONNECT,
  payload: {
    url: 'wss://localhost:8080'
  }
})
```

## Actions

### WEBSOCKET_CONNECT

```javascript
{
  type: WEBSOCKET_CONNECT,
  payload: {
    url: 'wss://'
  }
}
```
