import React from 'react'
import Link from 'next/link'

const href = {
    pathname: '/about',
    query: { name: 'next' }
}

const as = {
    pathname: '/about/next',
    hash: 'title-1'
};

/**
 * 可以用 <Link> 组件实现客户端的路由切换
 * Link 是一个高阶组件
 * 可以使用<Link prefetch>使链接和预加载在后台同时进行，来达到页面的最佳性能
 */
export default () => (
    <div>
        <h1>Home page</h1>
        <Link href={href} as={as}>
            <a>Go to /about/next</a>
        </Link>
    </div>
)