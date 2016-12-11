/* eslint-env mocha */
// import td from 'testdouble';
import { expect, assert } from 'chai';
import createWebsocket, { extractArgs } from '../src/createWebsocket';

describe('extractArgs()', () => {
  it('should return an empty array by default', () => {
    const result = extractArgs();

    expect(result).to.eql([]);
  });
  it('should return an array of args if args are provided', () => {
    const obj = { args: [1, 2, 3] };

    const result = extractArgs(obj);

    expect(result).to.eql(obj.args);
  });
  it('should return the url in an array if a url is provided', () => {
    const obj = { url: 'urlvalue' };

    const result = extractArgs(obj);

    expect(result).to.eql([obj.url]);
  });
  it('should return an array of args if args and url are both provided', () => {
    const obj = { args: [1, 2, 3], url: 'urlvalue' };

    const result = extractArgs(obj);

    expect(result).to.eql(obj.args);
  });
});

describe('createWebsocket()', () => {
  it('should return an instance of the constructor class', () => {
    class WebSocketStub {};
    const obj = { constructor: WebSocketStub };

    const result = createWebsocket(obj);

    expect(result).to.be.an.instanceOf(WebSocketStub);
  });
});
