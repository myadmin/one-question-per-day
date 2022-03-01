/**
 * 抽象工厂模式: 围绕一个超级工厂创建其他工厂
 * 1. 抽象工厂(抽象类，不能被用于生成具体事例)
 * 2. 具体工厂(用于生成产品族里的一个具体的产品)
 * 3. 抽象产品(抽象类，不能被用于生成具体实例)
 * 4. 具体产品(用于生成产品族里的一个具体的产品所依赖的更细粒度的产品)
 */
// 抽象类
class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
  // 提供硬件的接口
  createHardWare() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}

// 定义操作系统这类产品的抽象产品类
class OS {
  controlHardWare() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
  controlHardWare() {
    console.log("我会用安卓的方式去操作硬件");
  }
}

class AppleOS extends OS {
  controlHardWare() {
    console.log("我会用苹果的方式去操作硬件");
  }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
  // 手机硬件的共性方法，这里提取了"根据命令运转"这个共性
  operateByOrder() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log("我会用高通的方式去运转");
  }
}

class MiWare extends HardWare {
  operateByOrder() {
    console.log("我会用小米的方式去运转");
  }
}

// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
    // 提供安卓系统实例
    return new AndroidOS();
  }
  createHardWare() {
    // 提供高通硬件实例
    return new QualcommHardWare();
  }
}

class NewFakeStarFactory extends MobilePhoneFactory {
  createOS() {
    return new AndroidOS();
  }
  createHardWare() {
    return new MiWare();
  }
}

// 这是我的手机
const myPhone = new FakeStarFactory();
// 让它拥有操作系统
const myOS = myPhone.createOS();
// 让它拥有硬件
const myHardWare = myPhone.createHardWare();
// 启动操作系统(输出'我会用安卓的方式去操作硬件')
myOS.controlHardWare();
// 唤醒硬件(输出'我会用高通的方式去运转')
myHardWare.operateByOrder();

const miPhone = new NewFakeStarFactory();
const miOS = miPhone.createOS();
const miHareWare = miPhone.createHardWare();
miOS.controlHardWare();
miHareWare.operateByOrder();
