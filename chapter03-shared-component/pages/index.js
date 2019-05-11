import React from 'react';

import Layout from '../comps/MyLayout'

/**
 * 客户端导航
 * next/link 是一个高阶组件， 只接收类似于 href 的属性
 * 您可以在链接中放置任何自定义的React组件甚至div。 放置在Link中的组件的唯一要求是它们应该接受onClick prop。
 * @constructor
 */
const Index = () => (
    <Layout>
        <p>This is the Home page</p>
    </Layout>
)

export default Index