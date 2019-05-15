import {action, observable} from 'mobx'
import {useStaticRendering} from 'mobx-react'

const isServer = !process.browser;
console.log('store >>> process.browser', process.browser);
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
            this.lastUpdate = Date.now()
            this.light = true
        }, 1000)
    };

    stop = () => clearInterval(this.timer);
}

let store = null;

export function initializeStore(initialData) {
    console.log('========== initializeStore()', initialData);
    console.log('========== store', store);
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        console.log('========== new Store()');
        return new Store(isServer, initialData)
    }
    if (store === null) {
        console.log('========== new Store()');
        store = new Store(isServer, initialData)
    } else {
        console.log('========== return Store');
    }
    return store
}
