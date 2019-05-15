import App, {Container} from 'next/app'
import React from 'react'
import withMobxStore from '../lib/with-mobx-store'
import {Provider} from 'mobx-react'

class MyApp extends App {
    render() {
        const {Component, pageProps, allStore} = this.props;
        console.log('MyApp >> allStore', allStore);
        return (
            <Container>
                <Provider store={allStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withMobxStore(MyApp)