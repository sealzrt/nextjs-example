import Document, {Head, Main, NextScript} from 'next/document'

/**
 * 只在服务端执行
 */
export default class MyDocument extends Document {

  /**
   * ctx对象包含7个属性
   * 分别是: 'err', 'req', 'res', 'pathname', 'query', 'asPath', 'renderPage'
   */
  static async getInitialProps(ctx) {
    // console.log('························· MyDocument.getInitialProps()');
    const initialProps = await Document.getInitialProps(ctx);
    // console.log('························· MyDocument >> initialProps', Object.keys(initialProps))
    return {...initialProps}
  }

  render() {
    // console.log('························· MyDocument >> render', Object.keys(this.props))
    return (
      <html>
      <Head/>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    )
  }
}