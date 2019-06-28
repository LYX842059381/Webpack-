# 一个为React搭建的简单脚手架

## 分别有开发环境和生产环境的配置

### 基础公用配置（webpack.config.base.js）
* 入口和出口
* 编译es567标准js，编译react的jsx。
* 路径相关配置

### 开发环境（webpack.config.dev.js）
* 开启热替换
* style-loader配合热替换
* 定义环境变量
* devserver配置

### 生产环境（webpack.config.prod.js）
* 提取css文件，压缩css，根据contenthash命名，配合缓存优化加载。
* 打包js以chunkhash命名, 提取第三方库，配合缓存优化加载。
* 定义环境变量