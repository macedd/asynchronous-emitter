const assert = require('assert');

describe('async-event-emitter', () => {
  let AsyncEventEmitter, events;
  let resolved = false;

  it('loads', () => {
    AsyncEventEmitter = require('./index');
    events = new AsyncEventEmitter();
  });

  it('listen async event', () => {
    events.on('event', () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolved = true;
          resolve();
        }, 100);
      });
    });
    assert(!resolved);
  });

  it('emit and awaits event resolving', async () => {
    await events.emit('event');
    assert(resolved);
  });

  it('listen multiple', async () => {
    resolved = false;
    let another = false;

    events.on('event', () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          another = true;
          resolve();
        }, 200);
      });
    });

    await events.emit('event');
    assert(resolved && another);
  });

});
