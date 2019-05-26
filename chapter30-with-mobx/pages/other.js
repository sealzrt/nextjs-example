import React from 'react';
import Link from 'next/link'
import {inject, observer} from 'mobx-react';

import * as otherService from '../service/other-service';

@inject(({otherStore}, props) => {
    console.log('Index >>> inject >>> indexStore', otherStore);
    console.log('Index >>> inject >>> props', props);

    // 初始化
    otherStore.init(props.initData);

    return {
        // data
        fullData: otherStore.fullData,
        // func
        init: otherStore.init,
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

        // const {req} = params;
        // if (req) {
        //     return {
        //         from: 'other-server',
        //     };
        // }
        // return {
        //     from: 'other-client',
        // };
    }

    constructor(props) {
        super(props);

        console.log(`Other >>> constructor`);
        console.log(`Other >>> constructor, this.props.fullData`, this.props.fullData);
    }

    render() {
        const {fullData} = this.props;
        console.log(`Other >>> render`);
        return (
            <div>
                <div>我是其他页</div>
                <div>{fullData}</div>
                <div>
                    <Link href="/index">
                        <a>跳转到首页</a>
                    </Link>
                </div>
            </div>
        );
    }
}