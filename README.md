# redux-websocket

## Summary

A Redux middleware for managing data over a WebSocket connection.

This middleware uses actions, dispatched with Redux to interact with a WebSocket server including connect, disconnect, message sending, and message receiving. All actions follow the [Flux Standard Action](https://github.com/acdlite/flux-standard-action) model. 

## Is it any good?

Yes. Yes it is.

## Installation

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

## Actions: User Dispatched

The following actions are to be dispatched by the user. They will be handled by the middleware. All examples are essentially Flow types to show expectations. The constants can (and should) be imported from the library module (see above)

### WEBSOCKET_CONNECT

Open a connection to a WebSocket server.

```javascript
{
  type: WEBSOCKET_CONNECT,
  payload: {
    url: string // something like 'wss://'
  }
}
```

### WEBSOCKET_DISCONNECT

Disconnect from a WebSocket server (and cleanup).

```javascript
{
  type: WEBSOCKET_DISCONNECT,
}
```

### WEBSOCKET_SEND

Send a message over an open WebSocket connection. The payload can be an arbitrary JavaScript object or type. The library `JSON.stringify()` the payload before sending it.

```javascript
{
  type: WEBSOCKET_SEND,
  payload: Object|number|string
}
```

## Actions: User Handled

User handled actions correspond to the callbacks on a WebSocket object. These actions are to be handled in app-space at the reducers or in another piece of middleware to handle message parsing and routing.

### WEBSOCKET_MESSAGE

Dispatched from redux-websocket when the WebSocket `onmessage` callback is executed. This action represents discrete messages sent from the server to the client. Its inverse is `WEBSOCKET_SEND`. The data is a `string` and it is the client's responsibility to deserialize as necessary. That is, this lib makes no assumptions about the format of the data.

```javascript
{
  type: WEBSOCKET_CLOSED,
  payload: {
    timestamp: Date,
    event: Event,
    data: string
  }
}
```

### WEBSOCKET_OPEN

Dispatched from redux-websocket when the WebSocket `onopen` callback is executed. This typically signals a successful connection.

```javascript
{
  type: WEBSOCKET_OPEN,
  payload: {
    timestamp: Date,
    event: Event
  }
}
```

### WEBSOCKET_CLOSED

Dispatched from redux-websocket when the WebSocket `onclosed` callback is executed. This typically signals a disconnecton event. Codes can be found in the `event`.

```javascript
{
  type: WEBSOCKET_CLOSED,
  payload: {
    timestamp: Date,
    event: Event
  }
}
```

## Contributing

If you like this library and would like to make modifications or additions, please fork the repo and issue a pull request. Here are a couple things that we know are needed.

- [ ] Better test coverage
- [ ] More refined Flow types
- [ ] More complete usage examples

