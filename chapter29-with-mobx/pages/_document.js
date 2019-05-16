import Document, {Head, Main, NextScript} from 'next/document'

/**
 * 只在服务端执行
 */
export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        console.log('****************************** MyDocument.getInitialProps()');
        const initialProps = await Document.getInitialProps(ctx);
        console.log('****************************** MyDocument >> initialProps', Object.keys(initialProps))
        return {...initialProps}
    }

    render() {
        return (
            <html>
            <Head>
                <title>自定义文档</title>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}