/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-02:33:53
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-10-10-07:35:41
 */
// var BOOK_ID = '8/8130';
// var BOOK_ID = '8/8130';
var fs = require('fs')
var debug = require('debug')('crawler')

exports.mkdir = function (obj) {
    var mkdirp = require('mkdirp');
    var dist = obj.dist;
    if (dist === undefined) {
        dist = 'dist/';
    }
    mkdirp(dist, function (err) {
        if (err) console.error(err)
        else debug('pow!')
    });
    console.log('mkdir:', dist + ' finish!');
}

exports.write_chapter = function (chapter, content) {
    // content = content.replace('[笔趣库手机x版 m.biquku.com]', '')
    // console.log('content:', content);
    // console.log(typeof content);
    fs.writeFile('dist/' + chapter.num + '.html', content, 'utf8', function (err) {
        if (err) throw err;
        debug('It\'s saved! HTML');
    });

    console.log('write_chapter finish!');
}

exports.write_config = function (obj) {
    var json = obj.json;
    var dist = obj.dist;
    // var isSetName = obj.isSetName;
    // // jsonString json
    // if (isSetName) {
    //     dist = 'dist/img/' + json.num + '.json';
    //     console.log('isSetName:', isSetName);
    // }

    // format json
    json = JSON.stringify(json, null, 4); // Indented 4 spaces
    fs.writeFile(dist, json, 'utf8', function (err) {
        if (err) throw err;
        debug('It\'s saved! JSON');
    });

    console.log('write_config finish!');
}
