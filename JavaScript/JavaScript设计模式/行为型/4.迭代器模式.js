/**
 * 迭代器模式：提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象内部表示。
 */

// 编写一个迭代器生成函数
function *iteratorGenerator () {
    yield '1号选手';
    yield '2号选手';
    yield '3号选手';
}

const iterator = iteratorGenerator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// 定义生成器函数，入参是任意集合
function iteratorGenerator2 (list) {
    // idx记录当前访问的索引
    let idx = 0;
    // len记录传入集合的长度
    let len = list.length;
    return {
        // 自定义next方法
        next: function () {
            // 如果索引还没有超出集合长度，done为false
            let done = idx >= len;
            // 如果done为false，则可以继续取值
            let value = !done ? list[idx++] : undefined;
            // 将当前值与遍历是否完毕(done)返回
            return { value, done };
        }
    };
}

const iterator2 = iteratorGenerator2(['1号选手', '2号选手', '3号选手']);
// iterator2.next();
console.log('iterator2', iterator2);
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());