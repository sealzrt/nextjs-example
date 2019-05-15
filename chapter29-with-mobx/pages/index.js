import React from 'react'
import Page from '../components/Page'

export default class Index extends React.Component {
    render() {
        console.log('4. Page >>> Index >> this.props', this.props);
        return <Page title="Index Page" linkTo="/other"/>
    }
}
