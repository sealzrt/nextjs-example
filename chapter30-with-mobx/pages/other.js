import React from 'react';
import Link from 'next/link'

export default class Other extends React.Component {

  static async getInitialProps(params) {
    const isServer = !process.browser ? '是' : '否';
    console.log(`Other.getInitialProps >>> 是否是服务端执行: ${isServer}`);
    const {req} = params;
    if (req) {
      return {
        from: 'other-server',
      };
    }
    return {
      from: 'other-client',
    };
  }

  constructor(props) {
    super(props);

    console.log(`Other >>> constructor`);
  }

  render() {
    console.log(`Other >>> render`);
    return (
      <div>
        <div>我是其他页</div>
        <div>
          <Link href="/index">
            <a>跳转到首页</a>
          </Link>
        </div>
      </div>
    );
  }
}