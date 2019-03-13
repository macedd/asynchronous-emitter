# Async Event Emitter

Nodejs Events runs in synchronous mode. This means that event listeners that are `async` cannot be `await`ed. This package class extends the [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) class and enables the promises to chain into the `emit` event.

```javascript
const AsyncEventEmitter = require('async-event-emitter');
const events = new AsyncEventEmitter();

// it's the same EventEmitter apis
events.on('event', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('event will resolve');
      resolve();
    }, 100);
  });
});

// it awaits events
async function test() {
  await events.emit('event');
  console.log('event awaited');
}
test();
```
