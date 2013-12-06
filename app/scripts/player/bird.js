define(['easeljs'], function (createjs) {
    'use strict';

    var Bird = function(stage) {
        var body = new createjs.Shape();
        var wings = new createjs.Shape();

        var shapes = [];

        var size = 2;

        var x = 0;
        var y = 0;
        var angle = Math.PI*0.12;

        var originalRadius = 14;
        var radius = originalRadius * size;
        var stageX = 700;
        var stageY = 500;
        var aboveWater = true;
        var rotationalV = 0;
        var aboveWaterV = 6;
        var belowWaterV = 3;
        var v = aboveWaterV;

        var wingHeight = size;
        var wingSpeed = getWingSpeed(angle);
        var wingMaxSpeed = 1.5;
        var wingDirection = -1;

        this.draw = function() {
            this.drawBody();
            this.drawWings();
            this.setPosition(x, y);
        };

        this.drawBody = function() {
            // tail
            body.graphics.beginFill("#05857B").drawRect(x-10, y-1.5, 6, 3);
                        
            // body
            body.graphics.beginFill("#CD5C22").drawEllipse(x-6, y-4, 12, 8);
                        
            // head
            body.graphics.beginFill("#05857B").drawCircle(x+8, y, 3);
            
            // beak
            body.graphics.beginFill("#913A3A").drawPolyStar(x+12, y, 2, 3, 0.5, -120);
            
            body.scaleX = size;
            body.scaleY = size;
            stage.addChild(body);
            shapes.push(body);
        };

        this.drawWings = function() {
            // wings
            wings.graphics.beginFill("#05857B").drawPolyStar(x, y-2, 4, 3, 0.5, -90);
            wings.scaleX = size;
            wings.scaleY = wingHeight;
            stage.addChild(wings);
            shapes.push(wings);
        };

        this.move = function() {
            this.flapWing();

            angle = angle + rotationalV;
            this.rotate(angle);

            x = this.nextX(x, v, angle);
            y = this.nextY(y, v, angle);
            this.setPosition(x, y);

            aboveWater = (y < 290);

            if (!aboveWater) {
                v = belowWaterV;
            } else {
                // if angle is down, v increases
                var dv = 0.2 * Math.sin(angle);
                v = Math.max(aboveWaterV, v + dv);
            }
        };

        this.flapWing = function() {
            wingSpeed = getWingSpeed(angle);

            if (wingSpeed == 0) {
                wingHeight = size * 0.8;
            } else {
                wingHeight = wingHeight + (wingSpeed * wingDirection);
                if (wingHeight < -size) {
                    wingDirection = -wingDirection;
                    wingHeight = -size;
                } else if (wingHeight > size) {
                    wingDirection = -wingDirection;
                    wingHeight = size;
                }
            }
            
            wings.scaleY = wingHeight;
        };

        function getWingSpeed(angle) {
            var convertedAngle = convertAngle(angle);
            if (convertedAngle >= Math.PI) {
                return wingMaxSpeed * Math.sin(convertedAngle);
            }

            return 0;
        }

        function convertAngle(angle) {
            if (angle >= 0) {
                return angle % (2 * Math.PI);
            } else {
                return (2 * Math.PI) + (angle % (2 * Math.PI));
            }
        }

        this.setPosition = function(x, y) {
            for (var i = 0; i < shapes.length; i++) {
                var shape = shapes[i];
                shape.x = x;
                shape.y = y;
            }
        };

        this.rotate = function(angle) {
            for (var i = 0; i < shapes.length; i++) {
                var shape = shapes[i];
                shape.rotation = angle * (180/Math.PI);
            }
        };

        this.nextX = function(currentX, velocity, angle) {
            var dx = velocity * Math.cos(angle);
            var pt = radius * Math.cos(angle);
            var x = currentX + dx;

            var next;
            if (x + pt > stageX) {
                next = stageX - pt;
            } else if (x + pt < 0) {
                next = -pt;
            } else {
                next = x;
            }

            return next;
        };

        this.nextY = function(currentY, velocity, angle) {
            var dy = velocity * Math.sin(angle);
            var pt = radius * Math.sin(angle);
            var y = currentY + dy;

            var next;
            if (y + pt > stageY) {
                next = stageY - pt;
            } else if (y + pt < 0) {
                next = -pt;
            } else {
                next = y;
            }

            return next;
        };

        this.keydown = function(event) {
            if (event.keyCode === 39) {
                rotationalV = Math.PI/20;
            } else if (event.keyCode === 37) {
                rotationalV = -Math.PI/20;
            }
        };

        this.keyup = function(event) {
            rotationalV = 0;
        };
    }

    return Bird;
})