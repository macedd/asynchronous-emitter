declare module 'asynchronous-emitter' {
    
    import { EventEmitter } from 'events';

    export = AsyncEventEmitter;
    
    class AsyncEventEmitter extends EventEmitter {
        constructor(...args: any[]);
    
        emit(type: any, args: any): Promise<void>;
        emit(type: any, args: any): any;
    
    }
}
