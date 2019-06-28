const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();

app.use('/lyx/*', proxy({
    target: 'http://localhost:8080',
    pathRewrite: { '^/lyx': '/lyx' },
}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(8081, () => { console.log('proxy on 8081') });