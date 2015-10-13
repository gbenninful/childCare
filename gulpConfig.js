module.exports = function () {
    'use strict';

    var config = {
        root: './',
        client: './client/',
        temp: './client/.tmp/',
        dist: './client/dist/',
        index: './client/index.html',
        js: ['./client/*.js', './client/**/**/*.js', '!./client/dist/**/*.js', '!./client/.tmp/*.js'],
        templateBundle: './client/dist/template.js',
        css: './client/assets/styles/*.scss',
        fonts: './client/assets/fonts/**/*.*',
        images: './client/assets/images/**/*.*',
        html: ['./client/app/**/*.html', './client/components/**/*.html'],
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'ChildCare',
                standAlone: false,
                root: 'app'
            }
        },
        modules: {
            bowerJson: require('./bower.json'),
            directory: ('./bower_components/'),
            ignorePath: '..'
        },
        defaultPort: 4000,
        server: './server/',
        nodeServer: './server/server.js',
        karmaConf: __dirname + '/karma.conf.js',
        browserReloadDelay: 1000,
        packages: ['./package.json', './bower.json'],
    };

    return config;
};