/* eslint-env browser */

/**
 * Formats args for creating the WebSocket instance
 */
 export const extractArgs = ({ args = [], url = '' } = {}) => {
   const argsArr = [].concat(args);
   if (argsArr.length) return argsArr;
   if (url) return [url];
   return [];
 };

export default payload => {
  const args = extractArgs(payload);
  return new payload.constructor(...args);
};
