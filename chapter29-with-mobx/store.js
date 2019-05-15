import {action, observable} from 'mobx'
import {useStaticRendering} from 'mobx-react'

const isServer = !process.browser;
/**
 * 官方提供了useStaticRendering方法，用于避免mobx服务端渲染的内存泄漏问题; 该方法只需要在server启动时设置一次
 */
useStaticRendering(isServer);

class Store {
    @observable lastUpdate = 0;
    @observable light = false;

    constructor(isServer, initialData = {}) {
        this.lastUpdate =
            initialData.lastUpdate != null ? initialData.lastUpdate : 1557915666666;
        this.light = !!initialData.light
    }

    @action start = () => {
        this.timer = setInterval(() => {
            this.lastUpdate = Date.now();
            this.light = true
        }, 1000)
    };

    stop = () => clearInterval(this.timer);
}

let store = null;

export function initializeStore(initialData) {
    console.log('========== ====== store >> initializeStore()', initialData);
    console.log('========== ====== store >> store', store);
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        let innerStore = new Store(isServer, initialData);
        console.log('========== ====== store >> new Store()');
        console.log('========== ====== store ', {...innerStore});
        return innerStore;
    }
    if (store === null) {
        console.log('========== ====== store >> new Store()');
        store = new Store(isServer, initialData)
    } else {
        console.log('========== ====== store >> return Store');
    }
    console.log('========== ====== store ', {...store});
    return store
}
