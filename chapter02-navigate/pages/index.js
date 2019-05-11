// This is the Link API
import Link from 'next/link';

/**
 * 客户端导航
 * next/link 是一个高阶组件， 只接收类似于 href 的属性
 * 您可以在链接中放置任何自定义的React组件甚至div。 放置在Link中的组件的唯一要求是它们应该接受onClick prop。
 * @constructor
 */
const Index = () => (
    <div>
        <p>
            <Link href="/about">
                <a title="我是客户端导航，不会发请求到服务器">客户端导航</a>
            </Link>
        </p>
        <p>
            <a href="/about" title="我是普通导航，会发请求到服务器">服务端导航</a>
        </p>
        <p>
            <Link href="/about">
                <button>Go to About Page</button>
            </Link>
        </p>
        <p>Hello Next.js</p>
    </div>
)

export default Index