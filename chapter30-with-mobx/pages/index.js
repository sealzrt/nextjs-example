import React from 'react';
import Link from "next/link";

export default class Index extends React.Component {

  static async getInitialProps(params) {
    const isServer = !process.browser ? '是' : '否';
    console.log(`Index.getInitialProps >>> 是否是服务端执行: ${isServer}`);
    const {req} = params;
    if (req) {
      return {
        from: 'index-server',
      };
    }
    return {
      from: 'index-client',
    };
  }

  constructor(props) {
    super(props);

    console.log(`Index >>> constructor`);
  }

  render() {
    console.log(`Index >>> render`);
    return (
      <div>
        <div>我是首页</div>
        <div>
          <Link href="/other">
            <a>跳转到其他页</a>
          </Link>
        </div>
      </div>
    );
  }
}