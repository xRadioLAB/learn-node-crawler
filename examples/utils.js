/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-02:33:53
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-10-10-06:08:32
 */
// var BOOK_ID = '8/8130';
// var BOOK_ID = '8/8130';
var fs = require('fs')
var debug = require('debug')('crawler')

exports.mkdir = function (folder) {
    var mkdirp = require('mkdirp');
    mkdirp('dist/' + folder, function (err) {
        if (err) console.error(err)
        else debug('pow!')
    });

    console.log('mkdir:', folder + ' finish!');
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

exports.write_config = function (book, setNameOn) {
    var content = JSON.stringify(book, null, 4); // Indented 4 spaces
    var fileName = 'dist/xhna.json';

    // content json
    if (setNameOn === true) {
        console.log(content);
        fileName = 'dist/img/' + book.num + '.json';
    }

    fs.writeFile(fileName, content, 'utf8', function (err) {
        if (err) throw err;
        debug('It\'s saved! JSON');
    });

    console.log('write_config finish!');
}
