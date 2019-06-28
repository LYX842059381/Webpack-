/**
 * 爬虫实例
 */
const cheerio = require('cheerio');
const axios = require('axios');

class Crawler {
    load(path, opts) {
        const _opts = Object.assign({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
            },
        }, opts);

        return axios.get(path, _opts).catch(e => console.log('爬取网页失败!'));
    }

    parse(html) {
        return cheerio.load(html, {decodeEntities: false});
    }
}

module.exports = Crawler;