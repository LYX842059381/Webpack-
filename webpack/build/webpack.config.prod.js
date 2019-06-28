const baseConfig = require('./webpack.config.base.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    DefinePlugin,
} = require('webpack');

const resolve = require('./utils').resolve;
const pageageJson = require(resolve('package.json'));

const prodConfig = merge(baseConfig, {
    // 开启生产默认设置（压缩js等..）
    mode: 'production',
    entry: {
        main: resolve('index.js'),
        vendor: Object.keys(pageageJson.dependencies),
    },
    output: {
        path: resolve('./dist'),
        filename: 'js/[name].[chunkhash].js',
        // 暴露的静态资源路径
        // publicPath: 'asstes'
    },
    module: {
        rules: [
            {
                test: /.less$/,
                // 生产环境提取css文件
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            }
        ]
    },
    plugins: [
        // 清除dist
        new CleanWebpackPlugin(),
        // 提取css 缓存优化 contenthash更新缓存
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: '[id].css',
        }),
        // 压缩css
        new OptimizeCssAssetsPlugin(),
        // 定义全局变量
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 提取第三方库
                vendor: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor",
                    enforce: true,
                },
            },
        },
    },
});

module.exports = prodConfig;