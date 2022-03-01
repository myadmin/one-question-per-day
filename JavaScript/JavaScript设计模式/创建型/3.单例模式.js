/**
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式。
 */
class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    // 判断是否已经new过一个实例
    if (!SingleDog.instance) {
      // 若中国唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}

SingleDog.getInstance2 = (function () {
  // 定义自由变量instance，模拟私有变量
  let instance = null;
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null，则new出唯一实例
      instance = new SingleDog();
    }
    return instance;
  };
})();

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();
console.log(s1 === s2);
const s3 = SingleDog.getInstance2();
const s4 = SingleDog.getInstance2();
console.log("s3", s3);
console.log(s3 === s4);

/**
 * 定义Storage
 */
class Storage {
  static getInstance() {
    // 判断当前是否已经存在该实例
    if (!Storage.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      Storage.instance = new Storage();
    }
    // 如果已经存在唯一的实例，则直接返回
    return Storage.instance;
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    return localStorage.setItem(key, value);
  }
}

const storage1 = Storage.getInstance();
const storage2 = Storage.getInstance();

storage1.setItem("name", "李雷");
console.log("storage1", storage1.getItem("name"));
console.log("storage2", storage2.getItem("name"));
console.log(storage1 === storage2);

/**
 * 闭包版本
 */
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase() {}
StorageBase.prototype.getItem = function (key) {
  return localStorage.getItem(key);
};
StorageBase.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value);
};

// 以闭包的形式创建一个引用自由变量的构造函数
const Storage2 = (function () {
  let instance = null;
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null，则实例化对象
      instance = new StorageBase();
    }
    return instance;
  };
})();

const storage3 = Storage2();
const storage4 = Storage2();

storage3.setItem("name", "张三");
console.log("storage3", storage3.getItem("name"));
console.log("storage4", storage4.getItem("name"));
console.log(storage3 === storage4);
