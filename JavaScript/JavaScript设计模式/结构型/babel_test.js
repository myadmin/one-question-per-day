"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2; /**
                                     * 装饰器模式，又名装饰者模式。
                                     * 在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求
                                     */


var _coreDecorators = require("core-decorators");

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

// 将装饰器"安装"到button类上

var Button = classDecorator(_class = function Button() {
  _classCallCheck(this, Button);
}) || _class;

// 验证装饰器是否生效
console.log("Button \u662F\u5426\u88AB\u88C5\u9970\u4E86\uFF1A", Button.hasDecorator);

// 方法装饰器
function funcDecorator(target, name, descriptor) {
  var originalMethod = descriptor.value;
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

var Button2 = (_class2 = function () {
  function Button2() {
    _classCallCheck(this, Button2);
  }

  _createClass(Button2, [{
    key: "onClick",
    value: function onClick() {
      console.log("我是Func的原有逻辑");
    }
  }]);

  return Button2;
}(), (_applyDecoratedDescriptor(_class2.prototype, "onClick", [_coreDecorators.readonly, funcDecorator], Object.getOwnPropertyDescriptor(_class2.prototype, "onClick"), _class2.prototype)), _class2);

// 验证装饰器是否生效

var button = new Button2(123);
button.onClick();
