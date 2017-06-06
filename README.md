# redux-websocket-autoreconnect

## Summary

This repo is based on [@giantmachines/redux-websocket](https://github.com/giantmachines/redux-websocket) work.

This is a Redux middleware for managing data over a WebSocket connection.

This middleware uses actions, dispatched with Redux to interact with a WebSocket server including connect, disconnect, message sending, and message receiving. All actions follow the [Flux Standard Action](https://github.com/acdlite/flux-standard-action) model. 

## Installation

```bash
$ yarn add matiere-noire/redux-websocket-autoreconnect
```
OR

```bash
$ npm install matiere-noire/redux-websocket-autoreconnect --save
```

## Middleware Installation

Once you have installed the library, you can add it to your Redux middleware stack just like you would any other middleware.

```javascript
// ... other imports
import websocket from 'matiere-noire/redux-websocket-autoreconnect'

const app = combineReducers(reducers)
const store = createStore(
  app,
  applyMiddleware(
    websocket,
    ...
  )
)
```

Another example that add the library to Redux middleware inside an [Ignite](https://github.com/infinitered/ignite) Project (in App/redux/CreateSore.js) :


```javascript
import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'
import websocket from '../Lib/redux-websocket'


// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Websocket Middleware ------------- */

  middleware.push(websocket)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
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
import { WEBSOCKET_CONNECT } from 'matiere-noire/redux-websocket-autoreconnect'

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

