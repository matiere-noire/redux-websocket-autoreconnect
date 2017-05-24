/* eslint-env browser */
/* @flow */
import _ from 'lodash';

/**
 * Formats args for creating the WebSocket instance
 */
const formatArgs = (config: Config): Array<any> => {
  let args = [];
  if (config.url) {
    args = [config.url];
  } else if (config.args) {
    args = config.args;
  }
  return args;
};

/**
 * Create a Config object
 */
const makeConfig = (payload: Config): Config => {
  const defaults: Config = {
    constructor: WebSocket
  };
  return Object.assign({}, defaults, payload);
};


export const createWebsocket = (payload: Config) => {
  const config = makeConfig(payload);
  const args = formatArgs(config);

  return new config.constructor(...args);
};
