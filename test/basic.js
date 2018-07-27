var expect = require("chai").expect;
var EventEmitter = require("../src/");

describe("Event Emitter", function() { 
  describe("Event Emission", function() {
    it("Allows Events to be emitted with various numbers of arguments", function() {
      var emitter = new EventEmitter();
      var scraped = false;
      var callbackArgs;
      emitter.on('scrape', function() {
        scraped = true;
        callbackArgs = arguments;
      });
      emitter.emit('scrape');
      expect(scraped).to.equal(true);
      expect(Object.values(callbackArgs).length).to.equal(0);
      
      var testValue1 = 'testValue1';
      emitter.emit('scrape', testValue1);
      expect(Object.values(callbackArgs).length).to.equal(1);
      expect(Object.values(callbackArgs)[0]).to.equal(testValue1);
      
      var multiArgs = ['a', 'scraped', 'value'];
      emitter.emit('scrape', ...multiArgs);
      expect(Object.values(callbackArgs).length).to.equal(3);
      multiArgs.forEach(function(argument, index) {        
        expect(Object.values(callbackArgs)[index]).to.equal(argument);
      });
    });    
  });
});