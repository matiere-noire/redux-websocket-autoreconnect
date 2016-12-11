/* eslint-env mocha */
import td from 'testdouble';
import { expect, assert } from 'chai';
import createWebsocket, { extractArgs } from '../src/createWebsocket';

describe('extractArgs()', () => {
  it('should return an empty array by default', () => {
    const result = extractArgs();

    expect(result).to.eql([]);
  });
  it('should return an array of args if an array of args is provided', () => {
    const obj = { args: [1, 2, 3] };

    const result = extractArgs(obj);

    expect(result).to.eql(obj.args);
  });
  it('should return an array of args if a single arg is provided', () => {
    const obj = { args: 'only-arg' };

    const result = extractArgs(obj);

    expect(result).to.eql([obj.args]);
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
    const getArgs = td.func('extractor');
    td.when(getArgs(td.matchers.anything())).thenReturn({});

    const result = createWebsocket(obj, getArgs);

    expect(result).to.be.an.instanceOf(WebSocketStub);
  });
  it('should forward on argument object properties to an extractor function ', () => {
    class WebSocketStub {};
    const obj = {
      constructor: WebSocketStub,
      args: [],
      url: ''
    };
    const getArgs = td.func('extractor');
    td.when(getArgs(td.matchers.anything())).thenReturn({});

    const result = createWebsocket(obj, getArgs);

    td.verify(getArgs(obj), { times: 1 });
  });
});
