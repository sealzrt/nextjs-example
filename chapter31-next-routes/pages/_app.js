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

    // 初始化Store
    const allStore = initializeStore();

    if (appContext.Component.getInitialProps) {
      // 把所有的store 传递给 Page.getInitialProps, 方便页面初始化 `store` 里的数据
      await appContext.Component.getInitialProps(appContext.ctx, allStore);
    }

    return {
      ...allStore,
    };
  }

  constructor(props) {
    super(props);

    const isServer = !process.browser;

    /**
     * 如果是服务端执行, 则直接使用 MobxApp.getInitialProps() 执行后添加到props上的 stores, 比如: indexStore, otherStore
     *
     * 第一次加载的时候 MobxApp.constructor 在浏览器端只会执行一次, 然后客户端跳转 就不会执行了
     * 如果是客户端执行, 则使用服务端脱水的数据, 初始化store
     *    this.props.indexStore === window.__NEXT_DATA__.props.indexStore
     *    this.props.otherStore === window.__NEXT_DATA__.props.otherStore
     */
    this.indexStore = isServer ? props.indexStore : initIndexStore(this.props.indexStore);
    this.otherStore = isServer ? props.otherStore : initOtherStore(this.props.otherStore);
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