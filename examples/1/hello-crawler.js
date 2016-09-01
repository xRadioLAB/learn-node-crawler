/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-11:08:43
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-09-01-12:23:44
 */
var BOOK_URL = 'http://www.23wx.com/html/8/8130/';
var Crawler = require("crawler");
var jsdom = require('jsdom');

var c = new Crawler({
    jQuery: jsdom,
    maxConnections: 100,
    forceUTF8: true,
    // incomingEncoding: 'gb2312',
    // incomingEncoding: 'gbk',
    // This will be called for each crawled page
    callback: function (error, result, $) {
        /*
            这里获取到页面的全部信息，
            但我们只要其中的一部分，
            所以需要使用jq的DOM操作去做处理
        */
        console.log('---result:', result);
        //路径目标需要查看网站的DOM结构进行配置

        var urls = $('#at').find('a');
        // var href = urls.attr('href');
        console.log('---urls:', urls);
    }
});

c.queue(BOOK_URL);
