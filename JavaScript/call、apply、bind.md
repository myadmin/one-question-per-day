# call、apply、bind的差异及功能

## call的功能

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

```JavaScript
// 在function的原型上添加我们自己的call方法
Function.prototype.myCall = function (context, ...args) {
    if (!context || context === null) {
        context = window;
    }
    // 创建唯一的键值，作为context的方法名
    let fn = Symbol(); // 这里使用的是 es6 的 Symbol
    // this 指向当前调用的函数
    context[fn] = this; 
    // 把函数的执行结果保存在一个常量中，相当于把自身作为传入的context方法进行了调用
    const result = context[fn](...args);
    // 最后需要删除前面的函数
    delete context[fn];
    // 返回执行后的结果
    return result;
}
```

## apply的功能

`apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组或类数组对象的形式提供的参数。

```JavaScript
Function.prototype.myApply = function (context, args) {
    if (!context || context === null) {
        context = window;
    }
    let fn = Symbol();
    const result = context[fn] = this;
    delete context[fn]
    return result;
}
```

## bind的功能

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```JavaScript
Function.prototype.myBind = function (context) {
    // 如果调用 bind 的不是函数，则需要抛出异常
    if (typeof this !== "function") {
        throw new Error(`Function.prototype.myBind is not a function`);
    }
    const _this = this;
    // 第一个参数是this，所以需要截取第1个之后的参数
    const args = Array.prototype.slice.call(arguments, 1);
    // 创建一个空对象
    const fn = function() {};
    // 返回一个函数
    const result = function () {
        const bindArgs = Array.prototype.slice.call(arguments);
        return _this.apply(this instanceof fn ? this : context, args.concat(bindArgs));
    };

    // 空对象的原型指向绑定函数的原型
    fn.prototype = this.prototype;
    // 空对象的实例赋值给 result.prototype
    result.prototype = new fn();
    return result;
}
```

### call、apply、bind的差异

1. `call()` 和 `apply()` 的语法及作用都类似，只有一个区别，就是  `call()` 方法接受的是一个参数列表，而 `apply()` 方法接受的是一个包含多个参数的数组。

2. `bind()` 方法与上面两个方法唯一的区别，就是 `bind()` 返回的是一个绑定上下文的`函数`，而上面两个方法是直接执行了函数。
