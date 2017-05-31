/**
 * Created by Laptopski on 2017-04-17.
 */

//Here the player is created. The function takes in the coordinates and images used for the player.
function Player(speed, x, y, img, imgRight) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.xDir = 1;
    this.width = 100;
    this.height = 80;

    //makes sure that all assets load
    this.heroReady = false;
    this.heroImage = new Image();
    this.heroImageRight = new Image();
    var _this = this;
    this.heroImage.onload = function(){
        _this.heroReady = true;
    };

    this.heroImage.src = img;
    this.heroImageRight.src = imgRight;
    
    //draws the hero
    this.draw = function() {
        if (this.xDir == -1){
            canvasContext.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
        } else {
            canvasContext.drawImage(this.heroImageRight, this.x, this.y, this.width, this.height);
        }
    };

    //function that decides how the player is moved. In this case the arrow keys on the keyboard.
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