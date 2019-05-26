import React from 'react'
import App, {Container} from 'next/app';
import {Provider} from 'mobx-react'

import {initializeStore} from '../store';

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

        let appProps = await App.getInitialProps(appContext);

        return {
            ...appProps,
        };
    }

    constructor(props) {
        super(props);

        this.allStore = initializeStore();
        console.log(`MobxApp >>> constructor >>> this.allStore`, this.allStore);
    }

    render() {
        console.log(`MobxApp >>> render`);
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Provider {...this.allStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default MobxApp