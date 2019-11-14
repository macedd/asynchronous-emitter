# Asynchronous Event Emitter

Nodejs core _Events system_ is synchronous. This means we can't `await` for listeners and `async` listeners can't be caught.
This package extends [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) and enables event emmiters to `await` for listeners to resolve in a concise way.

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
async function main() {
  await events.emit('event');
  console.log('event awaited');
}

main();
```
