import React from 'react';
import Link from "next/link";
import {inject, observer} from 'mobx-react';

import * as indexService from '../service/index-service';

@inject(({indexStore}, props) => {
  console.log('Index >>> inject >>> indexStore.state', {...indexStore.state});

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

  static async getInitialProps({req, query, asPath}, {indexStore}) {
    const isServer = !process.browser ? '是' : '否';
    console.log(`Index.getInitialProps >>> 是否是服务端执行: ${isServer}`);
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
          <Link href="/other">
            <a>跳转到其他页</a>
          </Link>
        </div>
      </div>
    );
  }
}