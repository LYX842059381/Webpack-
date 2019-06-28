## 请求跨域

这个DEMO的原理是:web前端请求到`proxy node`服务，再由`proxy node`转发请求到`server node`服务，因为服务器间没有同源限制，`proxy node`可以拿到请求响应，此时只要保证`proxy node`和web前端同源，web前端就不会受到浏览器同源限制机制的干扰收到`proxy node`返回的结果。

这也是反向代理解决请求跨域的基本原理以及`webpack-dev-server proxy`的实现。