# emitter
This Event Emitter module allows one or more functions to be attached to named events and those named events to be emitted.
---
```
var emitter = new EventEmitter();
emitter.on('sent', receive);
var data = {"foo": "bar"};
emitter.emit('sent', data);

function receive(data) {
  //handle data
}
```
---
##emitter.emit(eventName[, ...args])
- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `...args` [`<any>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Emits a named event with any number of arguments.

##emitter.on(eventName, callback)
- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Registers a handler function to be called whenever the named event is emitted.

##emitter.once(eventName, callback)
- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Registers a handler function to only be called the first time the named event is emitted.

##emitter.off(eventName[, callback])
- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Removes a specific previously-registered event handler and/or all previously-registered event handlers.

---

##Running Tests

```
$ npm test
```