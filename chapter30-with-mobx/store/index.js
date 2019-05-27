import {useStaticRendering} from "mobx-react";

const isServer = !process.browser;
/**
 * 官方提供了useStaticRendering方法，用于避免mobx服务端渲染的内存泄漏问题; 该方法只需要在server启动时设置一次
 */
useStaticRendering(isServer);

import initIndexStore from './index-store';
import initOtherStore from './other-store';


export const initializeStore = () => {
  return {
    indexStore: initIndexStore(),
    otherStore: initOtherStore(),
  };
};

export {
  initIndexStore,
  initOtherStore,
};