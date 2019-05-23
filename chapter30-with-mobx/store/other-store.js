import {observable, computed, action} from 'mobx';

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

class OtherStore {

  @observable state = {
    name: '我是其他',
    desc: '其他描述',
    price: 100,
  };

  constructor(price) {
    this.state.price = price;
  }

  @computed get fullData() {
    return `name: ${this.state.name}, desc: ${this.state.desc}, price: ${this.state.price}`;
  }

  @action addPrice = async () => {
    await delay(3000);
    this.state.count = this.state.count + 100;
  };

}

export default OtherStore;