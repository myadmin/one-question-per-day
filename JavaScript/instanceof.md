# instanceof

### `instanceof` 运算符用于判断构造函数的 `prototype` 属性是否出现在对象的原型链中的任意位置。

```JavaScript
function myInstanceof (left, right) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left);
    // 获取构造函数的 prototype 对象
    let prototype = right.prototype;
    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while(true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        // 如果没有找到，就继续从其原型上找
        proto = Object.getPrototypeOf(proto);
    }
}
```
