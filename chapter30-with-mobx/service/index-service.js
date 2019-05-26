const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

export const getInitData = async () => {
    await delay(500);
    return {
        count: 10,
    };
};