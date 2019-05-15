import React from 'react'
import Link from 'next/link'
import {inject, observer} from 'mobx-react'
import Clock from './Clock'

@inject(Store => {
    console.log('inject >> Store', Store);
    return {
        Store,
    };
})
@observer
class Page extends React.Component {
    componentDidMount() {
        this.props.store && this.props.store.start()
    }

    componentWillUnmount() {
        this.props.store && this.props.store.stop()
    }

    render() {
        console.log('this.props', this.props);
        const store = this.props.store || {};
        return (
            <div>
                <h1>{this.props.title}</h1>
                <Clock lastUpdate={store.lastUpdate} light={store.light}/>
                <nav>
                    <Link href={this.props.linkTo}><a>Navigate</a></Link>
                </nav>
            </div>
        )
    }
}

export default Page