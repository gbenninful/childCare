(function () {
    'use strict';

    var gulp = require('gulp'),
        fs = require('fs');

    fs.readdirSync('./gulp').filter(function (file) {
        return (/\.(js)$/i).test(file);
    }).map(function (file) {
        require('./gulp/' + file);
    });

}());