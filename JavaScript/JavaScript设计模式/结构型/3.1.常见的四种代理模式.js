/**
 * 1. 事件代理
 * 2. 虚拟代理
 * 3. 缓存代理
 * 4. 保护代理
 */

// 1. 事件代理 - 通过事件"冒泡"，将事件传递给子元素

// 2. 虚拟代理
class PreLoadImage {
  constructor(imgNode) {
    // 获取该实例对应的DOM节点
    this.imgNode = imgNode;
  }

  // 换作img节点的src属性
  setSrc(imgUrl) {
    this.imgNode.src = imgUrl;
  }
}

class ProxyImage {
  // 占位图的url地址
  static LOADING_URL = "xxxx";

  constructor(targetImage) {
    // 目标Image，即PreLoadImage实例
    this.targetImage = targetImage;
  }

  // 该方法主要操作虚拟Image完成加载
  setSrc(targetUrl) {
    // 真实img节点初始化时展示的是一个占位图
    this.targetImage.src = ProxyImage.LOADING_URL;
    // 创建一个帮我们加载图片的虚拟Image实例
    const virtualImage = new Image();
    // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
    virtualImage.onload = () => {
      this.targetImage.setSrc(targetUrl);
    };
    // 设置src属性，虚拟Image实例开始加载图片
    virtualImage.src = targetUrl;
  }
}

const img = document.getElementById("img");
new ProxyImage(new PreLoadImage(img)).setSrc(img.getAttribute("data-src"));

// 3. 缓存代理
// addAll方法会对你传入的所有参数做求和操作
const addAll = function () {
  console.log("进行了一次新计算");
  let result = 0;
  const len = arguments.length;
  for (let i = 0; i < len; i++) {
    result += arguments[i];
  }
  return result;
};

// 为求和方法创建代理
const proxyAddAll = (function () {
  // 求和结果的缓存池
  const resultCache = {};
  return function () {
    // 将入参转化为一个唯一的入参字符串
    const args = Array.prototype.join.call(arguments, ",");
    // 检查本次入参是否有对应的计算结果
    if (args in resultCache) {
      // 如果有，则返回缓存池里现成的结果
      return resultCache[args];
    }
    return (resultCache[args] = addAll(...arguments));
  };
})();

// 4. 保护代理 - 参考上一小结
const obj = new Proxy(
  {},
  {
    get: function (target, key, receiver) {
      console.log(`getting ${key}`);
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      console.log(`setting ${key}`);
      return Reflect.set(target, key, value, receiver);
    },
  }
);
