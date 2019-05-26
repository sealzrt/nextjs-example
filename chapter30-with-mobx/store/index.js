import {useStaticRendering} from "mobx-react";

const isServer = !process.browser;
/**
 * 官方提供了useStaticRendering方法，用于避免mobx服务端渲染的内存泄漏问题; 该方法只需要在server启动时设置一次
 */
useStaticRendering(isServer);

import indexStore from './index-store';
import otherStore from './other-store';


export const initializeStore = () => {
    return {
        indexStore,
        otherStore,
    };
};