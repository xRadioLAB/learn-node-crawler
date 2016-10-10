/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-11:08:43
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-10-10-06:05:39
 */

// var BOOK_URL = 'http://www.23wx.com/html/8/8130/';
var urlString0 = 'http://203.192.6.89/xhs/';
var MAIN_URL = urlString0 + 'static/e11275/11275.htm';
var Crawler = require("crawler");
var jsdom = require('jsdom');
var utils = require('../utils');

var mainObj = {
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
        // console.log(1);
        // console.log(a);
        var $item = null;
        var $itemA = null;
        var $itemA0 = null;
        var itemA0_img_src = null;
        var $itemA1 = null;
        var href0 = null;
        var href1 = null;
        var title = null;

        tag.each(function (i, e) {
            // var item = tag[0].innerHTML;
            // mainObj.push(tag[i].innerHTML);
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

            if (href0.indexOf(urlString0) < 0) {
                href0 = urlString0 + href0;
            }

            itemA0_img_src = $itemA0.find('img').attr('src');

            $itemA1 = $itemA.eq(1);
            href1 = $itemA1.attr('href');
            title = $itemA1.text();

            mainObj.item.push({
                // num: i,
                title: title,
                href0: href0,
                href1: href1,
                img: itemA0_img_src
            });
            // if ($itemA.length > 1) {
            // url =
            // }
            // if (href.indexOf(urlString0) < 0) {
            //     href = urlString0 + href;
            // }

            // if (href.indexOf(urlString0) < 0) {
            //     href = urlString0 + href;
            // }
        });
        /*var titleAndAuthorArray = $('#a_main h3').text().split('作者：');
        mainObj.title = $.trim(titleAndAuthorArray[0]);
        mainObj.author = $.trim(titleAndAuthorArray[1]);
        // mainObj.update_time = $('#info p').eq(2).text();
        // mainObj.latest_chapter = $('#info p').eq(3).html();
        // mainObj.intro = $('#intro').html();
        mainObj.chapters = [];
        var urls = $('#at').find('a');
        // console.log('urls:', urls)
        urls.each(function (i, e) {
            var url = $(e);
            var _url = url.attr('href');
            var num = _url.replace('.html', '');
            var title = url.text();
            mainObj.chapters
                .push({
                    num: num,
                    title: title,
                    url: _url
                });
        });
        // for (var i = 0; i < urls.length; i++) {
        //     var url = urls[i];
        //     var _url = $(url).attr('href');
        //     var num = _url.replace('.html', '');
        //     var title = $(url).text();
        //     mainObj
        //         .chapters
        //         .push({
        //             num: num,
        //             title: title,
        //             url: _url
        //         })
        // }
        mainObj.max = urls.length;*/
        mainObj.max = tag.length;

        utils.mkdir('');
        utils.write_config(mainObj);

        // console.log('mainObj:', mainObj)
    }
});

c.queue(MAIN_URL);
// $ node examples/1/chaper-list-xhna.js
