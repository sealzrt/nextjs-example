import React from 'react';
import Link from "next/link";
import {inject, observer} from 'mobx-react';

import * as indexService from '../service/index-service';

@inject(({indexStore}, props) => {
    console.log('Index >>> inject >>> indexStore', indexStore);
    console.log('Index >>> inject >>> props', props);

    // 初始化
    indexStore.init(props.initData);

    return {
        // data
        fullData: indexStore.fullData,
        // func
        init: indexStore.init,
    };
})
@observer
export default class Index extends React.Component {

    static async getInitialProps(params) {
        const isServer = !process.browser ? '是' : '否';
        console.log(`Index.getInitialProps >>> 是否是服务端执行: ${isServer}`);

        const initData = await indexService.getInitData();

        return {
            initData
        };
    }

    constructor(props) {
        super(props);

        console.log(`Index >>> constructor`);
        console.log(`Index >>> constructor, this.props.fullData`, this.props.fullData);
    }

    render() {
        const {fullData} = this.props;
        console.log(`Index >>> render >>> fullData`, fullData);
        return (
            <div>
                <div>我是首页</div>
                <div>{fullData}</div>
                <div>
                    <Link href="/other">
                        <a>跳转到其他页</a>
                    </Link>
                </div>
            </div>
        );
    }
}