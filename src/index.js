function Emitter() {
  //constructor
  this.eventHandlers = {};
}
/**
 *  Emit an event
 * @param event string
 */
Emitter.prototype.emit = function(event) {
  var args = arguments;
  delete args['0'];
  if (event in this.eventHandlers) {
    for (const handler of this.eventHandlers[event]) {
      handler.apply(null, Object.values(args));
    }
  }
};
/**
 * Register a callback for an event
 * @param event
 * @param handler
 */
Emitter.prototype.on = function(event, handler) {
  if (!(event in this.eventHandlers)) {
    this.eventHandlers[event] = [];
  }
  this.eventHandlers[event].push(handler);
};

module.exports = Emitter;