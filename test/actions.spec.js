/* eslint-env mocha */
import { expect } from 'chai';
import { connecting, open, closed, message } from '../src/actions';
import {
  WEBSOCKET_CONNECTING,
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE
} from '../src/';

describe('action creators', () => {
  describe('connecting()', () => {
    it('should return an action with the type: WEBSOCKET_CONNECTING', () => {
      const event = {};
      const ws = {};
      const result = connecting(event, ws);

      expect(result.type).to.equal(WEBSOCKET_CONNECTING);
    });
    it('should return an action whose payload contains timestamp', () => {
      const event = {};
      const ws = {};
      const result = connecting(event, ws);

      expect(result.payload.timestamp).to.be.an.instanceOf(Date);
    });
    it('should return an action whose payload contains event', () => {
      const event = {};
      const ws = {};
      const result = connecting(event, ws);

      expect(result.payload.event).to.equal(event);
    });
    it('should return an action whose payload contains websocket', () => {
      const event = {};
      const ws = {};
      const result = connecting(event, ws);

      expect(result.payload.websocket).to.equal(ws);
    });
  });
  describe('open()', () => {
    it('should return an action with the type: WEBSOCKET_OPEN', () => {
      const event = {};
      const result = open(event);

      expect(result.type).to.equal(WEBSOCKET_OPEN);
    });
    it('should return an action whose payload contains timestamp', () => {
      const event = {};
      const result = open(event);

      expect(result.payload.timestamp).to.be.an.instanceOf(Date);
    });
    it('should return an action whose payload contains event', () => {
      const event = {};
      const result = open(event);

      expect(result.payload.event).to.equal(event);
    });
  });
  describe('closed()', () => {
    it('should return an action with the type: WEBSOCKET_CLOSED', () => {
      const event = {};
      const result = closed(event);

      expect(result.type).to.equal(WEBSOCKET_CLOSED);
    });
    it('should return an action whose payload contains timestamp', () => {
      const event = {};
      const result = closed(event);

      expect(result.payload.timestamp).to.be.an.instanceOf(Date);
    });
    it('should return an action whose payload contains event', () => {
      const event = {};
      const result = closed(event);

      expect(result.payload.event).to.equal(event);
    });
  });
  describe('message()', () => {
    it('should return an action with the type: WEBSOCKET_MESSAGE', () => {
      const event = { data: {} };
      const result = message(event);

      expect(result.type).to.equal(WEBSOCKET_MESSAGE);
    });
    it('should return an action whose payload contains timestamp', () => {
      const event = {};
      const result = message(event);

      expect(result.payload.timestamp).to.be.an.instanceOf(Date);
    });
    it('should return an action whose payload contains event', () => {
      const event = {};
      const result = message(event);

      expect(result.payload.event).to.equal(event);
    });
    it('should return an action whose payload contains data', () => {
      const event = { data: {} };
      const result = message(event);

      expect(result.payload.data).to.equal(event.data);
    });
  });

});
