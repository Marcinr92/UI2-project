/**
 * Created by Laptopski on 2017-04-17.
 */
// the players coordinates and speed in pixels.
/*
var player = {
    speed: 256,
    x:0,
    y:0
};*/

function Player(speed, x, y, img, imgRight) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.xDir = 1;
    this.width = 100;
    this.height = 80;

    this.heroReady = false;
    this.heroImage = new Image();
    this.heroImageRight = new Image();
    var _this = this;
    this.heroImage.onload = function(){
        _this.heroReady = true;
    };

    this.heroImage.src = img;
    this.heroImageRight.src = imgRight;

    this.draw = function() {
        if (this.xDir == -1){
            canvasContext.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
        } else {
            canvasContext.drawImage(this.heroImageRight, this.x, this.y, this.width, this.height);
        }
    };

    this.movePlayer = function(modifier){
        //following if statements moves the player according to keypresses
        if (38 in keysDown){
            this.y -= this.speed * modifier;
        }
        if (40 in keysDown){
            this.y += this.speed * modifier;
        }
        if (37 in keysDown){
            this.x -= this.speed * modifier;
            this.xDir = 1;
        }
        if (39 in keysDown){
            this.x += this.speed * modifier;
            this.xDir = -1;

        }
    }
}