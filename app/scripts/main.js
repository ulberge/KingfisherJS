require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        easeljs: '../bower_components/easeljs/lib/easeljs-0.7.0.min',
        bird: 'player/bird'
    },
    shim: {
        easeljs: {
            exports: 'createjs'
        }
    }
});

require(['app'], function (app) {
    'use strict';

    console.log(app);
});
