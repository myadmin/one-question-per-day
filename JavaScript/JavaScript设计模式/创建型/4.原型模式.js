/**
 * 原型编程范式的核心思想就是利用实例来描述对象，用实例作为定义对象和继承的基础。
 */
// 创建一个 Dog 构造函数
function Dog(name, age) {
  this.name = name;
  this.age = age;
}

Dog.prototype.eat = function () {
  console.log("骨头真好吃");
};

// 使用Dog构造函数创建dog实例
const dog = new Dog("旺财", 3);

/**
 * 实现JS中的深拷贝
 * 1. JSON.stringify() 实现深拷贝，但是无法处理function、正则等
 * 2. 通过递归实现深拷贝
 */
function deepClone(target) {
  // 如果是[值类型]或[null]，则直接return
  if (typeof target !== "object" || target === null) {
    return target;
  }

  // 定义返回对象，如果对象是数组，则定义结果数组
  const isArray = Array.isArray(target);
  let copy = isArray ? [] : {};

  /**
   * for...in 与 for...of 的区别
   * 1. for...in获取的是对象的键名；for...of获取的是对象的键值
   * 2. for...in会遍历对象的整个原型链，性能非常差不推荐使用；for...of只遍历当前对象不会遍历原型链
   * 3. 对于数组的遍历，for...in会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)；for...of只返回数组的下标对应的属性值
   * 总结：for...in循环主要用于遍历对象，不适用于遍历数组；for...of循环可用来遍历数组、类数组对象，字符串、Set、Map以及Generator对象
   * 参考链接：http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html
   */
  // 遍历对象的key
  //   for (const key in target) {
  //     // 如果key是对象的自有属性
  //     if (target.hasOwnProperty(key)) {
  //       // 递归调用深拷贝方法
  //       copy[key] = deepClone(target[key]);
  //     }
  //   }

  const keys = isArray ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    if (target.hasOwnProperty(key)) {
      // 递归调用深拷贝方法
      copy[key] = deepClone(target[key]);
    }
  });

  return copy;
}

function forEach(array, iteratee) {
  let index = -1;
  const len = array.length;
  while (++index < len) {
    iteratee(array[index], index);
  }
  return array;
}

const liLei = {
  name: "lilei",
  age: 28,
  habits: ["coding", "hiking", "running"],
  eat: function () {
    return console.log(this.name + " like eat");
  },
};

const li1 = deepClone(liLei);
console.log("li1", li1);
li1.name = "hanmeimei";
li1.habits.push("eat");
li1.habits.push("movies");
console.log(li1.eat());
console.log(liLei.eat());

/**
 * 基础数据类型
 * string、number、boolean、undefined、null、binint、symbol
 */
const s = deepClone("1");
const num = deepClone(1);
const b = deepClone(true);
const u = deepClone(undefined);
const n = deepClone(null);
const bi = deepClone(BigInt(1));
const sb = deepClone(Symbol());

console.table([s, num, b, u, n, bi, sb]);

const obj = { a: 1, b: 2, c: 3 };
const objC = deepClone(obj);
objC.d = 4;
console.log("obj", obj);
console.log("objC", objC);

const arr = [1, 2, 3, 4, 5];
const arrD = deepClone(arr);
arrD.push(6);
// arrD.unshift(0);
console.log("arr", arr);
console.log("arrD", arrD);
