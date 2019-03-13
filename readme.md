# Asynchronous Event Emitter

Nodejs Events runs in synchronous mode. This means that event listeners that are `async` cannot be `await`ed. This package extends the [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) class and enables the promises to chain into the `emit` event.

## Install

    npm install --save asynchronous-emitter

## Example

```javascript
const AsyncEventEmitter = require('asynchronous-emitter');
const events = new AsyncEventEmitter();

// it's the same core EventEmitter apis and behavior
events.on('event', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('event will resolve');
      resolve();
    }, 100);
  });
});

// but it await events
async function test() {
  await events.emit('event');
  console.log('event awaited');
}
test();
```
