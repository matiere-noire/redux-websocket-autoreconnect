/* eslint-env browser */

/**
 * Formats args for creating the WebSocket instance
 */
const extractArgs = (config) => {
  let args = [];
  if (config.args) {
    args = config.args;
  } else if (config.url) {
    args = [config.url];
  }
  return args;
};

/**
 * Create a Config object
 */
// const makeConfig = (payload: Config): Config => {
//   const defaults: Config = {
//     constructor: WebSocket
//   };
//   return { ...defaults, ...payload };
// };


export const createWebsocket = (payload) => {
  const args = extractArgs(payload);
  const constructor = (payload.constructor) ? payload.constructor : WebSocket;

  return new constructor(...args);
};
