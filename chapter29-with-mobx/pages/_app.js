import App, {Container} from 'next/app'
import React from 'react'
import {initializeStore} from '../store'
import {Provider} from 'mobx-react'

class MyMobxApp extends App {
    /**
     * 输入网址或刷新来访问 请求的是服务器, getInitialProps 在服务端的生命周期里执行
     * 通过客户端跳转的时候, getInitialProps 在浏览器端的生命周期里执行
     */
    static async getInitialProps(appContext) {
        console.log('========================================================================================');
        console.log('1. App.getInitialProps >> appContext >>> keys', Object.keys(appContext));
        // Get or Create the store with `undefined` as initialState
        // This allows you to set a custom default initialState
        const mobxStore = initializeStore();
        console.log('========== mobxStore', Object.keys(mobxStore));
        // Provide the store to getInitialProps of pages
        appContext.ctx.mobxStore = mobxStore;

        let appProps = await App.getInitialProps(appContext);
        console.log('========== appProps', appProps);

        return {
            ...appProps,
            initialMobxState: mobxStore
        }
    }

    constructor(props) {
        super(props);
        const isServer = !process.browser;
        console.log('2. App >>> constructor >>> process.browser', process.browser);
        this.mobxStore = isServer
            ? props.initialMobxState
            : initializeStore(props.initialMobxState)
        console.log('2. App >>> constructor >>> this.mobxStore', Object.keys(this.mobxStore));
    }

    render() {
        console.log('3. App >>> render >>> this.props', Object.keys(this.props));
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
