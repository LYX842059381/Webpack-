const baseConfig = require('./webpack.config.base.js');
const merge = require('webpack-merge');
const {
    HotModuleReplacementPlugin,
    DefinePlugin,
} = require('webpack');

const resolve = require('./utils').resolve;

const devConfig = merge(baseConfig, {
    mode: 'development',
    entry: resolve('index.js'),
    output: {
        path: resolve('./dist'),
        filename: 'js/[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /.less$/,
                // 开发环境用style-loader配合热替换
                use: ['style-loader', 'css-loader', 'less-loader'],
            }
        ]
    },
    plugins: [
        // 定义全局变量
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        // 热替换
        new HotModuleReplacementPlugin(),
    ],
    devServer: {
        // 取消域名检查限制
        host: '0.0.0.0',
        hotOnly: true,
        inline: true,
        
    },
});

module.exports = devConfig;