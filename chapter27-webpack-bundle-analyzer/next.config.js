const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {ANALYZE} = process.env;

module.exports = {
    /**
     * 使用构建时生成的常量来标识你的应用服务是哪个版本
     * @returns {Promise<string>}
     */
    generateBuildId: async () => {
        return 'test';
    },
    /**
     * webpack方法将被执行两次，一次在服务端一次在客户端。
     * 可以用isServer属性区分客户端和服务端来配置
     *
     * buildId - 字符串类型，构建的唯一标示
     * dev - Boolean型，判断你是否在开发环境下
     * isServer - Boolean 型，为true使用在服务端, 为false使用在客户端
     * defaultLoaders - 对象型 ，内部加载器
     *
     */
    webpack: function (config, {buildId, dev, isServer, defaultLoaders}) {
        console.log('webpack >>> isServer', isServer);
        console.log('defaultLoaders', defaultLoaders);
        if (ANALYZE) {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: isServer ? 8888 : 8889,
                openAnalyzer: true
            }))
        }

        return config
    }
};