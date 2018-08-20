# emitter [![Build Status](https://travis-ci.org/aelliott1485/emitter.svg?branch=master)](https://travis-ci.org/aelliott1485/emitter)

This Event Emitter module allows one or more functions to be attached to named events and those named events to be emitted.

[Code Review](https://codereview.stackexchange.com/q/201326/120114)

---

## Installation

First, clone the repository:

```
$ git clone https://github.com/aelliott1485/emitter.git
```

Then go into the local directory for the repository:

```
$ cd emitter
```

Next install the dependencies (e.g. test frameworks)

```
$ npm install
```

Then the tests can be run to ensure it works as expected:

```
$ npm test
```


#### Example:
```
var emitter = new EventEmitter();
//register the handler function (defined below)
emitter.on('sent', receive);
//later, emit the event and pass data, which will be sent to the handler function(s)
emitter.emit('sent', {"foo": "bar"});

function receive(data) {
  //handle data
}
```
---

## API

### emitter.emit(eventName[, ...args])

- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `...args` [`<any>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types)

Emits a named event with any number of arguments.

### emitter.on(eventName, callback)

- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Registers a handler function to be called whenever the named event is emitted.

### emitter.once(eventName, callback)

- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Registers a handler function to only be called the first time the named event is emitted.

### emitter.off(eventName[, callback])

- `eventName` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) the name of the event
- `callback` [`<Function>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Removes a specific previously-registered event handler and/or all previously-registered event handlers.
