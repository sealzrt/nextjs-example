import App, {Container} from 'next/app'
import React from 'react'
import {initializeStore} from '../store'
import {Provider} from 'mobx-react'

/**
 * Next.js使用App组件初始化页面。您可以覆盖它并控制页面初始化
 */
class MyMobxApp extends App {
    /**
     * 输入网址或刷新来访问 请求的是服务器, getInitialProps 在服务端的生命周期里执行
     * 通过客户端跳转的时候, getInitialProps 在浏览器端的生命周期里执行
     *
     * 服务端执行的时候
     * 参数: appContext: 包含3个对象, 分别是: 'Component', 'router', 'ctx', 其中: Component 页面组件, router 路由信息, ctx 上下文对象
     * 参数: appContext.ctx: 默认包含6个对象, 分别是: 'err', 'req', 'res', 'pathname', 'query', 'asPath'
     *
     */
    static async getInitialProps(appContext) {
        console.log('=======================================================================================================================================================');
        console.log('1. MyMobxApp.getInitialProps(), 参数: appContext, keys', Object.keys(appContext), `是否是服务端执行:${!process.browser}`);
        // Get or Create the store with `undefined` as initialState
        // This allows you to set a custom default initialState
        const mobxStore = initializeStore();
        console.log('========== mobxStore', Object.keys(mobxStore));
        // Provide the store to getInitialProps of pages
        appContext.ctx.mobxStore = mobxStore;
        // console.log('========== appContext 的属性', Object.keys(appContext));
        console.log('========== appContext.ctx 的属性', Object.keys(appContext.ctx));

        /**
         * App.getInitialProps(appContext)
         * 实际调用的是 Component.getInitialProps(ctx)
         * 源码: appContext.Component.getInitialProps(appContext.ctx)
         * 源码链接: https://github.com/zeit/next.js/blob/master/packages/next-server/lib/utils.js#L3
         *
         * 返回值: 如果 Component 没有定义 getInitialProps, 则返回空对象, 如果返回的不是对象, 会报错
         * 如果组件(Component.getInitialProps(ctx)) 返回了 {name:'123'}, 则返回值最后包装成 {pageProps: {name:'123'}}
         *
         */

        console.log('========== invoke App.getInitialProps(appContext), 等于 appContext.Component.getInitialProps(appContext.ctx)');
        let appProps = await App.getInitialProps(appContext);
        console.log('========== App.getInitialProps(appContext) 的返回值', appProps);

        return {
            ...appProps,
            initialMobxState: mobxStore
        }
    }

    /**
     * 服务端渲染的时候 (刷新的时候), 每次都执行
     * 客户端第一次加载的时候, 只会执行一次, 之后所有的客户端跳转 都不会执行
     * @param props
     */
    constructor(props) {
        super(props);
        const isServer = !process.browser;
        console.log('2. MyMobxApp >>> constructor 执行', `是否是服务端执行:${!process.browser}`);
        console.log('2. MyMobxApp >>> constructor >>> this.props.initialMobxState', {...this.props.initialMobxState});
        this.mobxStore = isServer
            ? props.initialMobxState
            : initializeStore(props.initialMobxState);
        console.log('2. MyMobxApp >>> constructor >>> this.mobxStore', Object.keys(this.mobxStore));
    }

    render() {
        console.log('3. MyMobxApp >>> render >>> this.props', Object.keys(this.props));
        const {Component, pageProps} = this.props
        return (
            <Container>
                <Provider store={this.mobxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default MyMobxApp
