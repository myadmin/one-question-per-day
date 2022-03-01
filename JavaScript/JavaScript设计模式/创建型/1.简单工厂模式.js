/**
 * 工厂模式其实就是将创建对象的过程单独封装
 * 构造器解决的是多个对象实例的问题，简单工厂解决的是多个类的问题
 * @param {*} name 
 * @param {*} age 
 * @param {*} career 
 * @param {*} work 
 */
function User(name, age, career, work) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.work = work;
}

const myWork = {
  coder: ["写代码", "写系分", "修Bug"],
  product: ["订会议室", "写PRD", "催更"],
  boss: ["喝茶", "看报", "见客户"],
};

function factory({ name, age, career }) {
  return new User(name, age, career, myWork[career]);
}

const xiaoming = factory({
  name: "xiaoming",
  age: 28,
  career: "coder",
});

console.log(xiaoming);
