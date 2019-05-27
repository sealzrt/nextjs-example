import React from 'react';
import {inject, observer} from 'mobx-react';

import {Link} from '../router'

@inject(({indexStore}, props) => {
  return {
    // data
    fullData: indexStore.fullData,
    // func
    init: indexStore.init,
    addCount: indexStore.addCount,
  };
})
@observer
export default class Index extends React.Component {

  /**
   * 第一个参数
   * @param ctx 上下文
   * @param 第二个对象, 包括了所有注册的store, 通过解构拿到 indexStore
   * @returns {Promise<void>}
   */
  static async getInitialProps(ctx, {indexStore}) {
    const {req, query, asPath} = ctx;
    // const isServer = !process.browser ? '是' : '否';
    console.log('Index.getInitialProps >>> query', query);
    console.log('Index.getInitialProps >>> asPath', asPath);

    /**
     * 从请求里拿 cookie, url参数 等数据, 初始化store
     */
    await indexStore.init();
  }

  constructor(props) {
    super(props);

    console.log(`Index >>> constructor`);
    console.log(`Index >>> constructor, this.props.fullData`, this.props.fullData);
  }

  handleClick = () => {
    this.props.addCount();
  };

  render() {
    const {fullData} = this.props;
    console.log(`Index >>> render >>> fullData`, fullData);
    return (
      <div>
        <div>我是首页</div>
        <div>{fullData}</div>
        <div>
          <button onClick={this.handleClick}>addCount</button>
        </div>
        <div>
          <Link route='other' params={{id: '456'}}>
            <a>跳转到其他页</a>
          </Link>
        </div>
      </div>
    );
  }
}