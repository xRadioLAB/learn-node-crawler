/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-11:08:43
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-11-07-05:38:55
 */
// var MAIN_dist = 'dist/';
var MAIN_URL_url0 = 'http://203.192.6.89/xhs/';
var MAIN_URL = MAIN_URL_url0 + 'lrfzr.htm';
var Crawler = require("crawler");
var jsdom = require('jsdom');

var utils = require('./utils'); // `./` 指向本层目录

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
        var $body = $('body');
        /*
            <td class="red" height="16" bgcolor="#F5F5F5" width="35%">
                <font color="#CC0000">·</font>
                <a href="2005-11/24/content_5659423.htm" class="b12" target="_blank">王观澜</a>
            </td>
            <td class="b12" height="16" bgcolor="#F5F5F5" width="65%">
                1931年11月 - 1932年8月 任红中社负责人
            </td>
            //     itemA0_img_src = $itemA0.find('img').attr('src');
        */
        // tag
        var tag = $body.find('.red');
        var $item = null;
        var $itemA = null;
        var href = null;
        var title = null;
        tag.each(function (i, e) {
            $item = $(e);
            $itemA = $item.find('a');
            href = $itemA.attr('href');
            // href0
            if (href.indexOf(MAIN_URL_url0) < 0) {
                href = MAIN_URL_url0 + href;
            }
            title = $itemA.text();
            // push
            MAIN_JSON.item.push({
                title: title,
                href: href,
                date: null,
                text: null,
            });
        });

        // tag2
        var tag2 = $body.find('td.b12');
        var $item2 = null;
        var date = null;
        var text = null;
        var key = '任';
        tag2.each(function (i, e) {
            $item2 = $(e);
            text = $item2.text();
            if (text.indexOf(key) !== -1) {
                text = text.split(key);
                if (text[0].length > 0) {
                    date = $.trim(text[0]);
                }
                if (text[1].length > 0) {
                    text = key + $.trim(text[1]);
                }
            }
            // set
            MAIN_JSON.item[i].date = date;
            MAIN_JSON.item[i].text = text;
        });
        // max
        MAIN_JSON.max = tag.length;
        // mkdir
        utils.mkdir({
            dist: 'dist/',
        });
        // write_config
        utils.write_config({
            json: MAIN_JSON,
            dist: 'dist/history0.json',
        });

        console.log('MAIN_JSON:', MAIN_JSON);
        console.log(tag.length, tag2.length);
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

function start() {
    c.queue(MAIN_URL);
}

start();
/*
    启动方式：
    $ cd tool
    $ node c.js

    这样会在 tool 目录建立 dist 文件夹输出结果
*/
