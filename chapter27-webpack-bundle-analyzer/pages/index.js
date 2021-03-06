import React from 'react'
import Link from 'next/link'

/**
 * 延迟
 * @param ms
 * @param result
 * @returns {Promise<any>}
 */
const timeout = (ms, result) => {
    return new Promise(resolve => setTimeout(() => resolve(result), ms));
};

export default class Index extends React.Component {
    /**
     * getInitialProps 是 Next.js 对 React 组件生命周期的扩充
     * 在调用 React 原生的所有生命周期函数之前，Next.js 会调用 getInitialProps 来获取数据，
     * 然后把获得数据作为 props 来启动 React 组件的原生生命周期过程
     *
     * 输入网址或刷新来访问 请求的是服务器, getInitialProps 在服务端的生命周期里执行
     * 通过客户端跳转的时候, getInitialProps 在浏览器端的生命周期里执行
     *
     * Next.js 在做服务器端渲染的时候，页面对应的 React 组件的 getInitialProps 函数被调用，异步结果就是“脱水”数据的重要部分，
     * 除了传给页面 React 组件完成渲染，还放在内嵌 script 的 __NEXT_DATA__ 中，
     * 这样，在浏览器端渲染的时候，是不会去调用 getInitialProps 的，直接通过 __NEXT_DATA__ 中的“脱水”数据来启动页面 React 组件的渲染
     *
     * Next对React组件的getInitialProps生命周期方法做了改造，传入一个上下文对象，该对象在服务端渲染和客户端渲染时，具有不同的属性：
     * req: HTTP请求对象（服务端渲染独有）
     * res: HTTP响应对象（服务端渲染独有）
     * pathname: URL中的路径部分
     * query：URL中的查询字符串部分解析出的对象
     * err：错误对象，如果在渲染时发生了错误
     *
     * 服务端渲染 的参数分别是: {err, req, res, pathname, query, asPath}
     * 客户端渲染 的参数分别是:                {pathname, query, asPath},
     * 客户端比服务端渲染 少了参数: err, req, res
     *
     * 它确定了一个规范，一个页面组件只要把访问 API 外部资源的代码放在 getInitialProps 中就足够，其余的不用管，
     * Next.js 自然会在服务器端或者浏览器端调用 getInitialProps 来获取外部资源，并把外部资源以 props 的方式传递给页面组件
     */
    static async getInitialProps(params) {
        const keys = Object.keys(params);
        console.log('getInitialProps >> 参数 keys', keys);

        console.log('延迟3秒 模拟接口调用');
        const age = await timeout(3000, 25);

        const {req} = params;
        if (req) {
            console.log('server >> getInitialProps ...');
            // Runs only in the server
            const faker = require('faker');
            const name = faker.name.findName();
            console.log('getInitialProps >> faker >> name', name);
            return {name, age}
        }

        // Runs only in the client
        console.log('client >> getInitialProps ...');
        return {name: 'Arunoda', age}
    }

    constructor(props) {
        super(props);

        this.state = {time: 0};
        console.log('Index >>> constructor', Date.now());
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        console.log('Index >>> getDerivedStateFromProps', nextProps, prevState);

        return {
            time: Date.now(),
        };
    };

    /**
     * 服务端渲染不会调用
     * 客户端渲染会调用
     */
    componentDidMount() {
        console.log('Index >>> componentDidMount');
    }

    render() {
        console.log('render >>> this.props', this.props);
        const {name} = this.props;
        return (
            <div>
                <h1>Home Page</h1>
                <p>Welcome, {name}</p>
                <div>
                    <Link href='/about'><a>About Page</a></Link>
                </div>
            </div>
        )
    }
}