module.exports = function () {

    'use strict';

    var client = './src/client/',
        clientApp = client + 'app/',
        root = './',
        server = './src/server/',
        temp = './.tmp/',

        config = {
            //All JS to vet
            allJs: [
                './src/**/*.js',
                './*.js'
            ],

            /**
             *Bower and NPM Locations
             */
            bower: {
                bowerJson: require('./bower.json'),
                directory: './bower_components/',
                ignorePath: '../..'
            },

            /**
             *Browser Sync
             */
            browserReloadDelay: 1000,
            build: './build/',
            client: client,
            css: temp + 'styles.css',
            //  fonts: './bower_components/font-awesome/fonts/**/*.*',  //Change to use path where your fonts are located
            html: clientApp + '**/*.html',
            htmltemplates: clientApp + '**/*.html',
            images: client + 'images/**/*.*',
            index: client + 'index.html',

            js: [client + '**/*.js',
                clientApp + '**/*.js',
                '!' + client + 'test/**/*.js'
            ],

            /**
             *Optimized files
             */
                optimized: {
                app: 'app.js',
                lib: 'lib.js'
            },

            packages: [
                './package.json',
                './bower.json'
            ],
            root: root,
            sass: client + 'styles/styles.scss',
            server: server,

            temp: temp,

            templateCache: {
                file: 'templates.js',
                options: {
                    module: 'childCare',
                    standAlone: false,
                    root: 'app/'
                }
            },

            /**
             *Node Settings
             */
            defaultPort: 3000,
            nodeServer: './src/server/server.js'


        };

    config.getWiredepDefaultOptions = function () {

        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;

    };

    return config;
};