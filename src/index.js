"use strict";

function Emitter() {
  //constructor
  this.eventHandlers = {};
}
/**
 *  Emit an event
 * @param event string
 * @param arg1...argN - any arguments to be sent to callback functions
 */
Emitter.prototype.emit = function(event) {
  const args = Array.from(arguments).slice(1);
  if (this.eventHandlers.hasOwnProperty(event)) {
    let indexesToRemove = [];
    for (const index in this.eventHandlers[event]) {
      const handler = this.eventHandlers[event][index];
      handler.callback.apply(null, args);
      if (handler.hasOwnProperty('once')) {
        indexesToRemove.push(index);
      }
    }
    if (indexesToRemove.length) {
      for(const index in indexesToRemove) {
        this.eventHandlers[event].splice(index, 1);
      }
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
    if (callback !== undefined) {
      for (const index in this.eventHandlers[event]) {
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