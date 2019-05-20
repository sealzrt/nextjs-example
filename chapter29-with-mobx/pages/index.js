import React from 'react'
import Page from '../components/Page'

export default class Index extends React.Component {

    /**
     * getInitialProps 是 Next.js 对 React 组件生命周期的扩充
     * 在调用 React 原生的所有生命周期函数之前，Next.js 会调用 getInitialProps 来获取数据，
     * 然后把获得数据作为 props 来启动 React 组件的原生生命周期过程
     *
     * !!! getInitialProps 要么在服务端执行, 要么在客户端执行, 只会在一端执行
     * 当页面第一次加载时，服务器收到请求，getInitialProps()会在服务端执行，
     * getInitialProps()返回的数据，会序列化后添加到 `window.__NEXT_DATA__.props`上，
     * 写入HTML源码里，类似于<script>window.__NEXT_DATA__={props:{xxx}}</script>。
     * 这样服务端的getInitialProps()就实现了把数据传送给了客户端
     *
     * 当页面是用户通过超链接跳转过去，而不是用户输入网址或刷新来访问的，这时候是纯客户端的行为，没有HTTP请求发出去。
     * 用户如果通过超链接跳转回这个页面，客户端的getInitialProps()开始起作用了，
     * 它会自动读取HTML源码里 window.__NEXT_DATA__.props里的数据并作为React组件的props
     *
     * 输入网址或刷新来访问 请求的是服务器, getInitialProps 在服务端的生命周期里执行, 客户端就不会执行
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
        console.log('1. Page Index >>> Index.getInitialProps()', Object.keys(params), `是否是服务端执行:${!process.browser}`);
        const {req} = params;
        if (req) {
            // 服务端
            return {
                from: 'server',
            };
        }

        return {
            from: 'client',
        };

    }

    constructor(props) {
        super(props);

        console.log('4. Page Index >>> constructor >> this.props', this.props);
        console.log(`4. Page Index >>> constructor >> 是否是服务端执行:${!process.browser}`);
    }

    render() {
        console.log('5. Page Index >>> render >> this.props', this.props);
        return <Page title="Index Page" linkTo="/other"/>
    }
}
