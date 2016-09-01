/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-11:08:43
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-09-01-12:48:08
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
        });

        // for (var i = 0; i < urls.length; i++) {
        //     var url = urls[i];
        //
        //     var _url = $(url).attr('href');
        //     var num = _url.replace('.html', '');
        //     var title = $(url).text();
        //
        //     current_book
        //         .chapters
        //         .push({
        //             num: num,
        //             title: title,
        //             url: _url
        //         })
        // }

        current_book.max = urls.length;

        console.log('current_book:', current_book)
    }
});

c.queue(BOOK_URL);
// $ node examples/1/chaper-list.js
