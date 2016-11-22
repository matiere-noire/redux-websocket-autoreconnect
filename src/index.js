const middleware = store => next => action => {
  console.log('redux-websocket', action.type);
  return next(action);
};

export default middleware;
