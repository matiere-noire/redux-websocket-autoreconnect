/* eslint-env browser */

/**
 * Converts an object containing argument information, used to instantiate
 * a websocket, into an array of args, according to priority.
 *
 * @return {*[]} The array of arguments to be passed to a constructor function.
 */
 export const extractArgs = ({ args = [], url = '' } = {}) => {
   const argsArr = [].concat(args);
   if (argsArr.length) return argsArr;
   if (url) return [url];
   return [];
 };

 /**
  * Assemble arguments and instantiate a new websocket.
  */
export default (payload, getArgs) => {
  return new payload.constructor(...getArgs(payload));
};
