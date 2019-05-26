import {observable, computed, action} from 'mobx';

class IndexStore {

    @observable state = {
        name: '我是首页',
        desc: '首页描述',
        count: 0,
    };

    @computed get fullData() {
        return `name: ${this.state.name}, desc: ${this.state.desc}, count: ${this.state.count}`;
    }

    @action init = ({count = 0}) => {
        this.state.count = count;
    };

    @action addCount = async () => {
        await delay(3000);
        this.state.count = this.state.count + 1;
    };

}

export default new IndexStore();