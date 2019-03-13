const EventEmitter = require('events');
const _ = require('lodash');


class AsyncEventEmitter extends EventEmitter {
  async emit(type, ...args) {
    const handler = _.get(this._events, type);
    if (_.isEmpty(handler) && !_.isFunction(handler)) {
      return false;
    }

    const promises = [];

    if (typeof handler === 'function') {
      promises.push(Reflect.apply(handler, this, args));
    } else {
      const len = handler.length;
      const listeners = _.clone(handler, len);
      for (let i = 0; i < len; i += 1) {
        promises.push(Reflect.apply(listeners[i], this, args));
      }
    }

    await Promise.all(promises);

    return true;
  }
}

module.exports = AsyncEventEmitter;
