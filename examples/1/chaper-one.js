/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-01:41:24
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-09-01-02:07:38
 */

var BOOK_URL = 'http://www.23wx.com/html/8/8130/';

var Crawler = require("crawler");
var jsdom = require('jsdom');

var current_book = {};

var c = new Crawler({
    jQuery: jsdom,
    maxConnections: 100,
    forceUTF8: true,
    // incomingEncoding: 'gb2312',
    // This will be called for each crawled page
    callback: function (error, result, $) {

        var titleAndAuthorArray = $('#a_main h3').text().split('作者：');

        current_book.title = $.trim(titleAndAuthorArray[0]);
        current_book.author = $.trim(titleAndAuthorArray[1]);
        // current_book.update_time = $('#info p').eq(2).text();
        // current_book.latest_chapter = $('#info p').eq(3).html();
        // current_book.intro = $('#intro').html();
        current_book.chapters = [];

        var urls = $('#at').find('a');
        // console.log('urls:', urls)

        urls.each(function (i, e) {
            var url = $(e);
            var _url = url.attr('href');
            var num = _url.replace('.html', '');
            var title = url.text();

            current_book.chapters
                .push({
                    num: num,
                    title: title,
                    url: _url
                });

            // var chapter = {
            //     num: '2290773',
            //     title: '第一百二十八章 三愿许情（全剧终）',
            //     url: '2290773.html'
            // }
            //
            // one(chapter);
        });
        current_book.max = urls.length;
        console.log('current_book:', current_book);
    }
});

// c.queue(BOOK_URL);

function one(chapter) {
    console.log(chapter)
    c.queue([{
        uri: BOOK_URL + chapter.num + '.html',
        jQuery: jsdom,
        forceUTF8: true,
        // The global callback won't be called
        callback: function (error, result, $) {
            // 内容区DOM名称
            var content = $('#contents').html();
            console.log(content)
        }
    }]);
}

var chapter = {
    num: '2290773',
    title: '第一百二十八章 三愿许情（全剧终）',
    url: '2290773.html'
}

one(chapter);
