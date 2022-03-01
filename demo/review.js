const debounce = (fn, delay) => {
  let timer;
  return function () {
    let _this = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  };
};

const throttle = (fn, delay) => {
  let previous = 0;
  return function () {
    let args = arguments;
    let now = new Date();
    if (now - previous > delay) {
      fn.apply(this, args);
      previous = now;
    }
  };
};

const test = function () {
  console.log("test");
  return "test";
};

const a = throttle(test, 1000);
console.log("a", a());
