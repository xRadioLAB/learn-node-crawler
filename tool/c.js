/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-11:08:43
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-10-10-07:48:19
 */
// var MAIN_dist = 'dist/';
var MAIN_URL_url0 = 'http://203.192.6.89/xhs/';
var MAIN_URL = MAIN_URL_url0 + 'static/e11275/11275.htm';
var Crawler = require("crawler");
var jsdom = require('jsdom');
var utils = require('./utils');

var MAIN_JSON = {
    max: null,
    item: [],
};

var c = new Crawler({
    jQuery: jsdom,
    maxConnections: 100,
    forceUTF8: true,
    // incomingEncoding: 'utf-8',
    // This will be called for each crawled page
    callback: function (error, result, $) {
        var tag = $('body').find('.red');

        var $item = null;
        var $itemA = null;
        var $itemA0 = null;
        var itemA0_img_src = null;
        var $itemA1 = null;
        var href0 = null;
        var href1 = null;
        var title = null;

        tag.each(function (i, e) {
            /*
                <a href="http://203.192.6.89/xhs/2005-11/01/content_5481148.htm" target="_blank">
                    <img height="120" src="http://203.192.6.89/xhs/static/imgs/xin_361102241850218384993.jpg" width="90" vspace="3" border="0">
                </a>
                <br>
                <a class="b122" href="http://203.192.6.89/xhs/2009-12/28/c_13121790.htm" target="_blank">
                    周以栗
                </a>
            */
            $item = $(e);
            $itemA = $item.find('a');

            $itemA0 = $itemA.eq(0);
            href0 = $itemA0.attr('href');
            // href0
            if (href0.indexOf(MAIN_URL_url0) < 0) {
                href0 = MAIN_URL_url0 + href0;
            }
            // img
            itemA0_img_src = $itemA0.find('img').attr('src');

            $itemA1 = $itemA.eq(1);
            href1 = $itemA1.attr('href');
            title = $itemA1.text();

            MAIN_JSON.item.push({
                title: title,
                href0: href0,
                href1: href1,
                img: itemA0_img_src
            });

        });

        MAIN_JSON.max = tag.length;

        utils.mkdir({
            dist: 'dist/',
        });

        // 生成 dist/xhna.json
        utils.write_config({
            json: MAIN_JSON,
            dist: 'dist/xhna.json',
        });

        // console.log('MAIN_JSON:', MAIN_JSON)
    }
});

// function one(chapter) {
//     console.log(chapter)
//     c.queue([{
//         uri: BOOK_URL + chapter.num + '.html',
//         jQuery: jsdom,
//         forceUTF8: true,
//         // incomingEncoding: 'gbk',
//         // The global callback won't be called
//         callback: function (error, result, $) {
//             var content = $('#contents').html();
//             // write_chapter
//             // utils.write_chapter(chapter, content);
//
//             // write_config content json
//             chapter.content = content;
//             utils.write_config(chapter, true); // book(JSON obj), setNameOn(Boolean)
//             // process.exit(); // 开启这个会导致**异步写入(fs.writeFile)**失效
//         }
//     }]);
// }

c.queue(MAIN_URL);
// $ node examples/c.js
