const express = require('express');

const app = express();

app.get('/lyx/getJson', (req, res) => {
    res.json({ code: 200, msg: `请求成功:${new Date().toLocaleString()}` });
});

app.listen(8080, () => { console.log('server on 8080') });