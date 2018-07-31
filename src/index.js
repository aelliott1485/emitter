"use strict";

function Emitter() {
  //constructor
  this.eventHandlers = {};
}
/**
 *  Emit an event
 * @param event string
 * @param arg1
 */
Emitter.prototype.emit = function() {
  const args = Array.from(arguments);
  const event = args.splice(0, 1); //remove event name
  if (this.eventHandlers.hasOwnProperty(event)) {
    for (const handler of this.eventHandlers[event]) {
      if (handler.hasOwnProperty('once')) {
        if (handler.hasOwnProperty('called')) {
          continue;
        }
        handler.called = true;
      }
      handler.callback.apply(null, Object.values(args));
    }
  }
};
/**
 * Register a callback for an event
 * @param event
 * @param callback
 */
Emitter.prototype.on = function(event, callback) {
  addHandler.call(this, event, {callback: callback});
};

/**
 * Register a callback for an event to be called only once
 * @param event
 * @param callback
 */
Emitter.prototype.once = function(event, callback) {
  addHandler.call(this, event, {callback: callback, once: true});
};
/**
* Un-register a single or all callbacks for a given event
* @param event
* @param callback optional
*/
Emitter.prototype.off = function(event, callback) {
  if (this.eventHandlers.hasOwnProperty(event)) {
    //console.log('callback: ',callback, event);
    if (callback !== undefined) {
      for (const index in this.eventHandlers[event]) {
      //  console.log('handler.callback:',''+this.eventHandlers[event][index].callback);
        if (callback.toString() == this.eventHandlers[event][index].callback.toString()) {
          this.eventHandlers[event].splice(index, 1);
        }
      }
    }
    else {
      delete this.eventHandlers[event];
    }
  }
}

module.exports = Emitter;


/** 
* Helper function to add an event handler
* @param event
* @param handlerObject
*/
function addHandler(event, handlerObject) {
  if (!(event in this.eventHandlers)) {
    this.eventHandlers[event] = [];
  }
  this.eventHandlers[event].push(handlerObject);
}