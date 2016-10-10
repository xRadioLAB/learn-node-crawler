/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-01:41:24
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-09-01-04:35:43
 */
var BOOK_SITE = 'http://www.23wx.com/html/';
var BOOK_ID = '8/8130';
var BOOK_URL = BOOK_SITE + BOOK_ID + '/';

var Crawler = require("crawler");
var jsdom = require('jsdom');
var utils = require('../utils');
var current_book = {};

var c = new Crawler({
    jQuery: jsdom,
    maxConnections: 100,
    forceUTF8: true,
    // incomingEncoding: 'gbk',
    // This will be called for each crawled page
    callback: function (error, result, $) {
        // mkdir
        utils.mkdir(BOOK_ID);
        var titleAndAuthorArray = $('#a_main h3').text().split('作者：');
        var urls = $('#at').find('a');
        current_book.title = $.trim(titleAndAuthorArray[0]);
        current_book.author = $.trim(titleAndAuthorArray[1]);
        current_book.max = urls.length;
        // current_book.update_time = $('#info p').eq(2).text();
        // current_book.latest_chapter = $('#info p').eq(3).html();
        // current_book.intro = $('#intro').html();
        current_book.chapters = [];

        urls.each(function (i, e) {
            var url = $(e);
            var _url = url.attr('href');
            var num = _url.replace('.html', '');
            var title = url.text();
            var chapter = {
                num: num,
                title: title,
                url: _url
            }
            current_book.chapters.push(chapter);
            one(chapter);
        });

        // write_config
        utils.write_config(current_book);
        // var chapter = {
        //     "num": "2290306",
        //     "title": "第一章 注入灵魂成功",
        //     "url": "2290306.html"
        // }
        // one(chapter);

        // for (var i = 0, j = current_book.max; i < j; i++) {
        //     console.log(i);
        //     one(current_book.chapters[i]);
        // }
    }
});

function one(chapter) {
    console.log(chapter)
    c.queue([{
        uri: BOOK_URL + chapter.num + '.html',
        jQuery: jsdom,
        forceUTF8: true,
        // incomingEncoding: 'gbk',
        // The global callback won't be called
        callback: function (error, result, $) {
            var content = $('#contents').html();
            // write_chapter
            // utils.write_chapter(chapter, content);

            // write_config content json
            chapter.content = content;
            utils.write_config(chapter, true); // book(JSON obj), setNameOn(Boolean)
            // process.exit(); // 开启这个会导致**异步写入(fs.writeFile)**失效
        }
    }]);
}

function start() {
    c.queue(BOOK_URL);
}

start();
