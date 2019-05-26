import {observable, computed, action} from 'mobx';

class OtherStore {

    @observable state = {
        name: '我是其他',
        desc: '其他描述',
        price: 0,
    };

    @computed get fullData() {
        return `name: ${this.state.name}, desc: ${this.state.desc}, price: ${this.state.price}`;
    }

    @action init = ({price = 0}) => {
        this.state.count = price;
    };

    @action addPrice = async () => {
        await delay(3000);
        this.state.count = this.state.count + 100;
    };

}

export default new OtherStore();