const iconvLite = require('iconv-lite');
const Crawler = require('../utils/crawler');

const TargetUrl = 'https://www.dytt8.net/';
const log = (content) => console.log(content);
// 并发数量为5
const ASYNC_COUNT = 5;

module.exports = {
    async loadMovie() {
        let $ = null, movieUrlList = [], moviesDetail = [];
        // 先拿首页
        $ = await getPage(TargetUrl);
        log(`-----------爬取首页完成----------`);

        // 电影列表
        movieUrlList = getMovieUrlList($);
        // 电影详情
        moviesDetail = movieListAsync(movieUrlList, ASYNC_COUNT);

        return moviesDetail;
    }
}

// load Page
const getPage = (url) => {
    const crawler = new Crawler();

    // 页面字符集是gb2312,需要保留原格式转码
    return crawler.load(url, { responseType: 'arraybuffer' }).then(response => {
        return crawler.parse(iconvLite.decode(response.data, 'gb2312'));
    });
}

// 获取首页推荐电影列表
const getMovieUrlList = ($) => {
    // 推荐电影列表 list:[{ title, url }]
    let list = [], listNode = [];

    // 获取列表的tr dom并过滤广告
    $('.co_content8').eq(0).find('tr').each((i, node) => {
        node.children.length == 5 && listNode.push(node);
    });

    // 根据tr得到movieList
    list = listNode.map(node => {
        const movieLink = $(node).find('td').eq(0).find('a').eq(1);
        return {
            title: $(movieLink).text(),
            url: $(movieLink).attr('href'),
        }
    });

    return list;
}

// 获取电影详情
const getMoviesDetail = async (movieItem) => {
    const reg = /简　　介/;
    let
        $, 
        pics = [],
        downloadUrl = '',
        explain = '';
    
    $ = await getPage(`${TargetUrl}${movieItem.url}`);

    const mainDom = $('#Zoom').children('span').get(0);
    const pDom = $($(mainDom).children('p').get(0));
    // 海报和截图
    pDom.children('img').each((i, imgNode) => {
        pics.push($(imgNode).attr('src'));
    });
    // 简介
    pDom.contents().each((i, node) => {
        if (node.type === 'text') {
            if (reg.test(node.data)) {
                try {
                    explain = node.next.next.next.data;
                } catch(e) {}
            }
        }
    })
    // 下载链接
    downloadUrl = $($(mainDom).find('table').find('a')).text();

    log(`爬取:${movieItem.title}完成`);

    return {
        title: movieItem.title,
        pics,
        explain,
        url: downloadUrl,
    };
}

// 并发控制
const movieListAsync = async (list, count) => {
    let details = [];
    let fetchList = [];

    for (let i = 0, len = list.length; i < len; i++) {
        fetchList.push(list[i]);

        if (i === len - 1 || fetchList.length === count) {
            details = details.concat(await Promise.all(fetchList.map(movieItem => getMoviesDetail(movieItem))))
            fetchList = [];
        }
    }

    return details;
}