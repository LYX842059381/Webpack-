const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
const router = require('./router');

app.use(static(path.resolve(__dirname, '../client/public')));
app.use(router.routes());

app.listen(8080, () => { console.log('server on 8080') });