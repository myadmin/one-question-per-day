/**
 * 状态模式：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。
 */
class CoffeeMaker {
    constructor () {
        /**
         * 这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
         */
        // 初始化状态，没有切换任何咖啡模式
        this.state = 'init';
        // 初始化牛奶的存储量
        this.leftMilk = '500ml';
    }

    stateProcess (state) {
        const _this = this;
        const map = {
            american() {
                console.log(`咖啡机现在的牛奶存储量是: ${_this.leftMilk}`);
                console.log('我只吐黑咖啡');
            },
            latte() {
                this.american();
                console.log('加点奶');
            },
        };
        return map[state]();
    }

    stateToProcessor = {
        _this: this,
        american() {
            console.log('state', this._this.state);
            // console.log('this', this);
            // 尝试在行为函数里拿到咖啡机实例的信息并输出
            console.log(`咖啡机现在的牛奶存储量是: ${this._this.leftMilk}`);
            console.log('我只吐黑咖啡');
        },
        latte() {
            this.american();
            console.log('加点奶');
        },
        vanillaLatte() {
            this.american();
            console.log('再加香草糖浆');
        },
        moche() {
            this.american();
            console.log('再加巧克力');
        }
    }

    // 关注咖啡机状态切换函数
    changeState(state) {
        this.state = state;
        if (!this.stateToProcessor[state]) {
            return;
        }
        this.stateToProcessor[state]();
        // console.log('state', state);
        this.stateProcess(state);
    }
}

const mk = new CoffeeMaker();
mk.changeState('latte');