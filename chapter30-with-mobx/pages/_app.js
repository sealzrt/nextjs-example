import React from 'react'
import App, {Container} from 'next/app';
import {Provider} from 'mobx-react'

import {initializeStore, initIndexStore, initOtherStore} from '../store';

class MobxApp extends App {

  /**
   * 服务端执行的时候
   * 参数: appContext: 包含3个对象, 分别是: 'Component', 'router', 'ctx', 其中: Component 页面组件, router 路由信息, ctx 上下文对象
   * 参数: appContext.ctx: 默认包含6个对象, 分别是: 'err', 'req', 'res', 'pathname', 'query', 'asPath'
   *
   * 客户端执行的时候
   * 参数: appContext: 包含3个对象, 分别是: 'Component', 'router', 'ctx'
   * 参数: appContext.ctx: 默认包含3个对象, 分别是: 'pathname', 'query', 'asPath'
   */
  static async getInitialProps(appContext) {
    console.log('---------------------------------------------------------------------------------------------------------------');
    console.log('---------------------------------------------------------------------------------------------------------------');
    console.log('---------------------------------------------------------------------------------------------------------------');
    const isServer = !process.browser ? '是' : '否';
    console.log(`MobxApp.getInitialProps >>> 是否是服务端执行: ${isServer}`);

    // 初始化Store
    const allStore = initializeStore();

    if (appContext.Component.getInitialProps) {
      await appContext.Component.getInitialProps(appContext.ctx, allStore);
    }

    console.log('allStore.indexStore', {...allStore.indexStore.state});

    return {
      ...allStore,
    };
  }

  constructor(props) {
    super(props);

    const isServer = !process.browser ? '是' : '否';
    console.log(`MobxApp >>> constructor >>> 是否是服务端执行`, isServer);

    this.indexStore = isServer ? props.indexStore : initIndexStore(this.props.indexStore);
    this.otherStore = isServer ? props.otherStore : initIndexStore(this.props.otherStore);
  }

  render() {
    const {Component} = this.props;

    const allStore = {
      indexStore: this.indexStore,
      otherStore: this.otherStore,
    };
    return (
      <Container>
        <Provider {...allStore}>
          <Component/>
        </Provider>
      </Container>
    )
  }
}

export default MobxApp