import IDataObject from "../interfaces";

export const dataArray: IDataObject[] = [
    {id: 101, name: 'Alice'},
    {id: 102, name: 'Bob'},
    {id: 103, name: 'Caroline'},
    {id: 104, name: 'Dave'},
];


export async function findData(id: number | string) {
    const selected = dataArray.find(data => data.id === Number(id));
    if (!selected) {
        throw new Error('Cannot find user');
    }

    return selected;
}

export async function findAll() {
    return dataArray;
}
