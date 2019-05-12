const Index = (...args) => {
    console.log('args', args);
    // throw new Error('bug...');
    return <div>test</div>
};


Index.getInitialProps = () => {
    console.log('Index >>> getInitialProps');
    return {name: '123'};
};

export default Index;