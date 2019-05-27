import React from 'react';
import Link from 'next/link'
import {inject, observer} from 'mobx-react';

import * as otherService from '../service/other-service';

@inject(({otherStore}, props) => {
  console.log('Other >>> inject >>> otherStore.state', {...otherStore.state});
  console.log('Other >>> inject >>> props.initData', props.initData);

  // // 初始化
  // otherStore.init(props.initData);

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

  static async getInitialProps(params) {
    const isServer = !process.browser ? '是' : '否';
    console.log(`Other.getInitialProps >>> 是否是服务端执行: ${isServer}`);

    const initData = await otherService.getInitData();

    return {
      initData
    };
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
          <Link href="/index">
            <a>跳转到首页</a>
          </Link>
        </div>
      </div>
    );
  }
}