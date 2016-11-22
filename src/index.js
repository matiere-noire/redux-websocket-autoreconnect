const middleware = store => next => action => {
  console.log(action.type);
  return next(action);
};

export default middleware;
