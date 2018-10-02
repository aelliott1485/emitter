"use strict";
/**
 * Throws an error if fn is not a function.
 * @param {function?} fn
 * @param {string} name
 */
function assertFunction(fn, name) {
  if (typeof fn !== 'function') {
    throw new Error(`Expected ${name} to be a function. Got ${typeof fn}.`);
  }
}

/**
 * Throws an error if arg is not defined.
 * @param {*} arg
 * @param {string} name
 */
function assertDefined(arg, name) {
  if (arg === undefined) {
    throw new Error(`Expected ${name} to be defined.`);
  }
}
class Emitter {
  constructor() {
    this.listeners = new Map();
  }
  getHandlers(event) {
    return this.listeners.get(event) || this.listeners.set(event, []).get(event);
  }
  /**
   *  Emit an event
   * @param event string
   * @param arg1...argN - any arguments to be sent to callback functions
  */
  emit(event, ...args) {
    assertDefined(event, 'event');
    this.getHandlers(event).slice().forEach(handler => {
      if (handler.once) {
        this.off(event, handler.callback);
      }
      handler.callback.apply(handler.context, args);
    });
  }

  /**
   * Register a callback for an event
   * @param event
   * @param callback
   * @param context (optional)
   */
  on(event, callback, context) {
    assertDefined(event, 'event');
    assertFunction(callback, 'callback');
    this.getHandlers(event).push({callback, context, once: false});
  }

  /**
   * Register a callback for an event to be called only once
   * @param event
   * @param callback
   */
  once(event, callback) {
    assertDefined(event, 'event');
    assertFunction(callback, 'callback');
    this.getHandlers(event).push({callback, context, once: true});
  }
  /**
  * Un-register a single or all callbacks for a given event
  * @param event
  * @param callback optional
  */
  off(event, callback) {
    if (event === undefined) {
      this.listeners.clear();
    } else if (callback === undefined) {
      this.listeners.delete(event);
    } else {
      const handlers = this.getHandlers(event).filter(handler => handler.callback !== callback);
      this.listeners.set(event, handlers);
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