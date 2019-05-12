import React from 'react'
import App, {Container} from 'next/app'

class Layout extends React.Component {
    render() {
        const {children} = this.props
        return (
            <div style={{border: '1px solid red'}}>
                {children}
            </div>
        );
    }
}

/**
 * 自定义<App>
 */
export default class MyApp extends App {

    static async getInitialProps({Component, router, ctx}) {
        console.log('MyApp >>> getInitialProps ...');
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        console.log('pageProps', pageProps);

        return {pageProps, userId: 'asdf'}
    }

    componentDidCatch(error, errorInfo) {
        console.log('CUSTOM ERROR HANDLING', error)
        // This is needed to render errors correctly in development / production
        super.componentDidCatch(error, errorInfo)
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Container>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        );
    }
}