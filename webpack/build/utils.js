const path = require('path');

const resolve = (pathStr) => path.resolve(__dirname, '../', pathStr);

module.exports = {
    resolve,
}