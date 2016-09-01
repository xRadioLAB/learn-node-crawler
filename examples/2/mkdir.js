/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-09-01-02:19:09
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-09-01-02:24:32
 */

function mkdir(folder) {
    var mkdirp = require('mkdirp');

    mkdirp('dist/' + folder, function (err) {
        if (err) console.error(err)
        else console.log('pow!')
    });
}

mkdir('i am mkdir folder')

/*
执行：
$ node examples/2/mkdir.js

结果：
pow!$

使用： ls dist
可以得到结果：
0                 css               js6                 i am mkdir folder reader.html
*/
