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
    price: 0,
  };

  constructor(initStore = {}) {
    this.state = {
      ...this.state,
      ...initStore.state,
    };
  }

  @computed get fullData() {
    return `name: ${this.state.name}, desc: ${this.state.desc}, price: ${this.state.price}`;
  }

  @action init = async () => {
    await delay(500);
    this.state.price = 100;
  };

  @action addPrice = async () => {
    await delay(500);
    this.state.price = this.state.price + 100;
  };

}

export let otherStore = null;

const isServer = !process.browser;

export default function initOtherStore(initStore) {
  if (isServer) {
    return new OtherStore();
  }
  if (otherStore === null) {
    otherStore = new OtherStore(initStore);
  }
  return otherStore;
}