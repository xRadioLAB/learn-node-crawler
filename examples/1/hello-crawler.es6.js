/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-11:08:43
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-09-01-11:29:09
 */
const BOOK_URL = 'http://www.23wx.com/html/8/8130/';
const Crawler = require("crawler");
const jsdom = require('jsdom');

let current_book = {};

const c = new Crawler({
    jQuery: jsdom,
    maxConnections: 100,
    forceUTF8: true,
    // incomingEncoding: 'gb2312',
    incomingEncoding: 'gbk',
    // This will be called for each crawled page
    callback: (error, result, $) => {
        //路径目标需要查看网站的DOM结构进行配置
        const urls = $('#at').find('a');
        console.log(urls)
    }
});

c.queue(BOOK_URL);
