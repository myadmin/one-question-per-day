/**
 * 装饰器模式，又名装饰者模式。
 * 在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求
 */
import { readonly } from "core-decorators";

// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

// 将装饰器"安装"到button类上
@classDecorator
class Button {
  // Button类的相关逻辑
}

// 验证装饰器是否生效
console.log(`Button 是否被装饰了：`, Button.hasDecorator);

// 方法装饰器
function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", descriptor.writable);
  descriptor.value = function () {
    console.log("我是Func的装饰器逻辑");
    return originalMethod.apply(this, arguments);
  };
  console.log("descriptor", descriptor);
  return descriptor;
}

class Button2 {
  @funcDecorator
  onClick() {
    console.log("我是Func的原有逻辑");
  }
}

// 验证装饰器是否生效
const button = new Button2(123);
button.onClick();
