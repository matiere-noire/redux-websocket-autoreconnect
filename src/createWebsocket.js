/* eslint-env browser */

/**
 * Converts an object containing argument information, used to instantiate
 * a websocket, into an array of args, according to priority.
 *
 * @param {object} payload - The payload containing constructor and arg data.
 *
 * @return {*[]} The array of arguments extracted from the object that was passed in.
 */
 export const extractArgs = ({ args = [], url = '' } = {}) => {
   const argsArr = [].concat(args);
   if (argsArr.length) return argsArr;
   if (url) return [url];
   return [];
 };

 /**
  * Assemble arguments and instantiate a new websocket.
  * @param {object} payload - The payload containing constructor and arg data.
  * @param {function} getArgs - A getter funcion for extracting arguments from
  * the payload.
  *
  * @return [*|WebSocket] An instance of WebSocket or a similar object.
  */
export default (payload, getArgs) => {
  return new payload.constructor(...getArgs(payload));
};
