const EventEmitter = require("../src/");
const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

describe("Event Emitter", function() {
  let emitter;
  before(function() {
    emitter = new EventEmitter();
  });
  it("Allows registering handler functions for named events that are passed the appropriate arguments on emission.", function() {
    const callback = sinon.fake();
    emitter.on('scrape', callback);
    emitter.emit('scrape');
    callback.should.have.been.called;

    const testValue1 = 'testValue1';
    emitter.emit('scrape', testValue1);
    callback.should.have.been.calledWith(testValue1);

    const multiArgs = ['a', 'scraped', 'value'];
    emitter.emit('scrape', ...multiArgs);
    callback.should.have.been.calledWith(...multiArgs);
  });    
  it("Allows Registering a \"one-time\" handler that will be called at most one time.", function() {
    const callback = sinon.fake();
    const callback2 = sinon.fake();
    emitter.once('pull', callback);
    emitter.on('pull', callback2);

    emitter.emit('pull');
    emitter.emit('pull');

    callback.should.have.been.calledOnce;
    callback2.should.have.been.calledTwice;
  });
  it("Allows Removing specific previously-registered event handlers and/or all previously-registered event handlers.", function() {
    const callback = sinon.fake();
    const callback2 = sinon.fake();
    const callback3 = sinon.fake();
    const callback4 = sinon.fake();

    emitter.on('push', callback);
    emitter.on('push', callback2);
    emitter.off('push', callback);
    emitter.emit('push');

    callback.should.not.have.been.called;
    callback2.should.have.been.called;
    
    emitter.on('push', callback3);
    emitter.off('push');
    emitter.emit('push');
        
    emitter.on('unshift', callback4);
    emitter.emit('unshift');
    
    callback3.should.not.have.been.called;
    callback4.should.have.been.called;    
  });
});