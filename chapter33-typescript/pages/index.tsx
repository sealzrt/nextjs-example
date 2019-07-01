import React from 'react';
import {NextContext} from 'next';

import IDataObject from '../interfaces'
import {findAll} from '../utils/sample-api';

type IndexProps = {
    id: string,
    items: IDataObject[],
};

type RequestQuery = {
    id: string,
}

class Index extends React.Component<IndexProps> {
    static async getInitialProps({query}: NextContext<RequestQuery>) {
        const id = query.id;
        const items: IDataObject[] = await findAll();
        return {items, id};
    }

    render() {
        const {items, id} = this.props;
        return (
            <ul>
                <li id={'title'}>{id}</li>
                {items.map(item => {
                    return (
                        <div key={item.id}>{`${item.id}:${item.name}`}</div>
                    );
                })}
            </ul>
        );
    }
}

export default Index;
