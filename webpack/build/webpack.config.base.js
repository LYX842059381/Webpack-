const htmlWebpackPlugin = require('html-webpack-plugin');

const resolve = require('./utils').resolve;

module.exports = {
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // env插件库和react插件
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            }
            // other loaders ...
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('index.html'),
        }),
    ],
    resolve: {
        alias: {
            // 路径别名
            '@': resolve('src'),
        },
        extensions: ['.js', '.less'],
    }
}