// observer方法遍历并包装对象属性
function observer (target) {
    // 若target是一个对象，则遍历它
    if (target && typeof target === 'object') {
        Object.keys(target).forEach(key => {
            // defineReactive方法会给目标属性装上"监听器"
            defineReactive(target, key, target[key]);
        })
    }
}

// 定义defineReactive方法
function defineReactive (target, key, val) {
    const dep = new Dep();
    // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
    observer(val);
    // 为当前属性安装监听器
    Object.defineProperty(target, key, {
        // 可枚举
        // enumerable: true,
        // // 不可配置
        // configurable: false,
        // get: function () {
        //     return val;
        // },
        // 监听器函数
        set: function (value) {
            // console.log(`${target}属性的${key}属性从${val}值变成了${value}`);
            // val = value;
            dep.notify();
        }
    })
}

// 定义订阅者类Dep
class Dep {
    constructor () {
        // 初始化订阅队列
        this.subs = [];
    }

    // 增加订阅者
    addSub (sub) {
        this.subs.push(sub);
    }

    // 通知订阅者(是不是所有的代码都似曾相识)
    notify () {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}

// 实现一个Event Bus/Event Emitter
class EventEmitter {
    constructor () {
        // handlers是一个map，用于存储事件与回调之间的对应关系
        this.handlers = {};
    }

    // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
    on (eventName, cb) {
        // 先检查一下目标事件名有没有对应的监听函数队列
        if (!this.handlers[eventName]) {
            // 如果没有，那么首先初始化一个监听函数队列
            this.handlers[eventName] = [];
        }

        // 把回调函数推入目标事件的监听函数队列里去
        this.handlers[eventName].push(cb);
    }

    // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
    emit (eventName, ...args) {
        // 检查目标事件是否有监听函数队列
        if (this.handlers[eventName]) {
            // 这里需要对this.handlers[eventName]做一次浅拷贝，主要目的是为了避免通过once安装的监听器在移除的过程中出现顺序问题
            const handlers = this.handlers[eventName].slice();
            // 如果有，则逐个调用队列里的回调函数
            handlers.forEach(callback => {
                callback(...args);
            });
        }
    }

    // 移除某个事件回调队列里的指定回调函数
    off (eventName, cb) {
        const callbacks = this.handlers[eventName];
        const index = callbacks.indexOf(cb);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    }

    // 为事件注册单次监听器
    once (eventName, cb) {
        // 对回调函数进行包装，使其执行完毕自动被移除
        const wrapper = (...args) => {
            cb(...args);
            this.off(eventName, wrapper);
        }
        this.on(eventName, wrapper);
    }
}

const emitter = new EventEmitter();
const fn = function (x, y) {console.log(x, y)}
emitter.on('event', fn);
emitter.emit('event', 5, 10);
emitter.off('event', fn);
emitter.emit('event', 5, 10);
emitter.once('event', fn);