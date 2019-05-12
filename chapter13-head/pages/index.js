import Head from 'next/head'

/**
 * Head 是一个内置组件，用于将元素附加到页面的<head>
 *
 */
export default () => (
    <div>
        <Head>
            <title>This page has a title !!!</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>

        <h1>This page has a title !!</h1>
    </div>
)