import React from 'react';
import Link from 'next/link';
import {inject, observer} from 'mobx-react';

@inject(({otherStore}, props) => {
  console.log('Other >>> inject >>> otherStore.state', {...otherStore.state});

  return {
    // data
    fullData: otherStore.fullData,
    // func
    init: otherStore.init,
    addPrice: otherStore.addPrice,
  };
})
@observer
export default class Other extends React.Component {

  /**
   * 第一个参数
   * @param ctx 上下文
   * @param 第二个对象, 包括了所有注册的store, 通过解构拿到 otherStore
   * @returns {Promise<void>}
   */
  static async getInitialProps({req, query, asPath}, {otherStore}) {
    const isServer = !process.browser ? '是' : '否';
    console.log(`Other.getInitialProps >>> 是否是服务端执行: ${isServer}`);
    console.log('Other.getInitialProps >>> query', query);
    console.log('Other.getInitialProps >>> asPath', asPath);

    /**
     * 从请求里拿 cookie, url参数 等数据, 初始化store
     */
    await otherStore.init();
  }

  constructor(props) {
    super(props);

    console.log(`Other >>> constructor`);
    console.log(`Other >>> constructor, this.props.fullData`, this.props.fullData);
  }

  handleClick = () => {
    this.props.addPrice();
  };

  render() {
    const {fullData} = this.props;
    console.log(`Other >>> render`);
    return (
      <div>
        <div>我是其他页</div>
        <div>{fullData}</div>
        <div>
          <button onClick={this.handleClick}>addCount</button>
        </div>
        <div>
          <Link href="/index?id=666">
            <a>跳转到首页</a>
          </Link>
        </div>
      </div>
    );
  }
}