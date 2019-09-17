const assert = require('assert');

describe('async-event-emitter', () => {
  it('loads', () => {
    const AsyncEventEmitter = require('./index');
    const emitter = new AsyncEventEmitter();
  });

  it('listen async event', () => {
    const AsyncEventEmitter = require('./index');
    const emitter = new AsyncEventEmitter();
    let resolved = false;

    emitter.on('event', () => {
      return new Promise((resolve, reject) => {
        resolved = true;
        resolve();
      });
    });

    assert(!resolved);
  });

  it('emit and awaits event resolving', async () => {
    const AsyncEventEmitter = require('./index');
    const emitter = new AsyncEventEmitter();

    emitter.on('event', () => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
      });
    });

    const maybePromise = emitter.emit('event');

    assert(maybePromise);
    assert(maybePromise.then);

    const result = await maybePromise;
    assert(result);
  });

  it('emit and catches event rejecting', async () => {
    const AsyncEventEmitter = require('./index');
    const emitter = new AsyncEventEmitter();

    emitter.on('event', () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new TypeError('This is an error')), 100);
      });
    });

    const promise = emitter.emit('event');
    let rejected = false;
    await promise.catch((error) => {
      rejected = true;
      assert(error.message === 'This is an error');
    });
    assert(rejected);
  });

  it('listen multiple', async () => {
    const AsyncEventEmitter = require('./index');
    const emitter = new AsyncEventEmitter();
    let resolved = another = false;

    emitter
      .on('event', () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolved = true;
            resolve();
          }, 100);
        });
      })
      .on('event', () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            another = true;
            resolve();
          }, 200);
        });
      });

    await emitter.emit('event');
    assert(resolved && another);
  });

  it('listen deep', async () => {
    const AsyncEventEmitter = require('./index');
    const emitter = new AsyncEventEmitter();
    let resolved = false;

    emitter
      .on('event', () => emitter.emit('deep.event'))
      .on('deep.event', () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolved = true;
            resolve();
          }, 100);
        });
      })

    await emitter.emit('event');
    assert(resolved);
  });
});
