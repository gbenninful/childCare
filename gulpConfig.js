module.exports = function () {
    'use strict';

    var config = {
        client: './client/',
        dist: './client/dist/',
        index: './client/index.html',
        js: ['./client/*.js', './client/**/**/*.js', '!./client/dist/*.js'],
        jsBundle: './client/dist/bundle.js',
        css: './client/assets/styles/*.scss',
        cssBundle: './client/dist/styles.css',
        karmaConf: __dirname + '/karma.conf.js',
        modules: {
            bowerJson: require('./bower.json'),
            directory: ('./bower_components/'),
            ignorePath: '..'
        },
        defaultPort: 4000,
        nodeServer: './server/server.js',
        server: './server/'
    };

    return config;
};