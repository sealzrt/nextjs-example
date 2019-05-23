import {observable, computed, action} from 'mobx';

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

class IndexStore {

  @observable state = {
    name: '我是首页',
    desc: '首页描述',
    count: 1,
  };

  constructor(count) {
    this.state.count = count;
  }

  @computed get fullData() {
    return `name: ${this.state.name}, desc: ${this.state.desc}, count: ${this.state.count}`;
  }

  @action addCount = async () => {
    await delay(3000);
    this.state.count = this.state.count + 1;
  };

}

export default IndexStore;