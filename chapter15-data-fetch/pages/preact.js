import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'

export default class Preact extends React.Component {
    /**
     * 当页面渲染时加载数据，我们使用了一个异步方法getInitialProps。它能异步获取 JS 普通对象，并绑定在props上
     * 当服务渲染时，getInitialProps将会把数据序列化，就像JSON.stringify。
     * 所以确保getInitialProps返回的是一个普通 JS 对象，而不是Date, Map 或 Set类型
     *
     * 当页面初始化加载时，getInitialProps只会加载在服务端。只有当路由跳转（Link组件跳转或 API 方法跳转）时，客户端才会执行getInitialProps
     *
     * 注意：getInitialProps将不能使用在子组件中。只能使用在pages页面中

        getInitialProps入参对象的属性如下：

        pathname - URL 的 path 部分
        query - URL 的 query 部分，并被解析成对象
        asPath - 显示在浏览器中的实际路径（包含查询部分），为String类型
        req - HTTP 请求对象 (只有服务器端有)
        res - HTTP 返回对象 (只有服务器端有)
        jsonPageRes - 获取数据响应对象 (只有客户端有)
        err - 渲染过程中的任何错误

        Link: 可以使用<Link prefetch>使链接和预加载在后台同时进行，来达到页面的最佳性能。

     */
    static async getInitialProps () {
        // eslint-disable-next-line no-undef
        const res = await fetch('https://api.github.com/repos/developit/preact')
        const json = await res.json()
        return { stars: json.stargazers_count }
    }

    render () {
        return (
            <div>
                <p>Preact has {this.props.stars} ⭐️</p>
                <Link prefetch href='/'><a>I bet next has more stars (?)</a></Link>
            </div>
        )
    }
}