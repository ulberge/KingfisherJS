/*global define */
define(['jquery', 'easeljs', 'bird'], function ($, createjs, Bird) {
    'use strict';

    var stage = new createjs.Stage("demoCanvas");

    var bird = new Bird(stage);
    bird.draw();

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(40);

    $(document).keydown(function(event) {
        bird.keydown(event);
    });

    $(document).keyup(function(event) {
        bird.keyup(event);
    });

    function tick() {
        bird.move();
        stage.update();
    }

    return '\'Allo \'Allo!';
});