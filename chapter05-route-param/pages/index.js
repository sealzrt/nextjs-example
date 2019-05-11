import React from 'react';
import Link from 'next/link';

import Layout from '../comps/MyLayout'

/**
 * 路由掩码与浏览器历史记录匹配。您所要做的就是为链接添加“as”属性
 * @param props
 * @returns {*}
 * @constructor
 */
const PostLink = props => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)

export default function Blog() {
    return (
        <Layout>
            <h1>My Blog</h1>
            <ul>
                <PostLink id="hello-nextjs" title="Hello Next.js" />
                <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
                <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
            </ul>
        </Layout>
    )
}