import {observable, computed, action} from 'mobx';

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};


const isServer = !process.browser;

class IndexStore {

  @observable state = {
    name: '我是首页',
    desc: '首页描述',
    count: 0,
  };

  constructor(initStore = {
    name: '我是首页',
    desc: '首页描述',
    count: 0,
  }) {
    this.state = {
      ...this.state,
      ...initStore.state,
    };
  }

  @computed get fullData() {
    return `name: ${this.state.name}, desc: ${this.state.desc}, count: ${this.state.count}`;
  }

  @action init = async () => {
    await delay(1000);
    this.state.count = 10;
  };

  @action addCount = async () => {
    await delay(1000);
    this.state.count = this.state.count + 1;
  };

}

export let indexStore = null;

export default function initIndexStore(initData) {
  if (isServer) {
    return new IndexStore();
  }
  if (indexStore === null) {
    indexStore = new IndexStore(initData);
  }
  return indexStore;
}