/**
 * Created by Laptopski on 2017-04-17.
 */
// the enemys coordenates and speed on the canvas in pixels.
// constructor function

function Enemy(speed, x, y, img, imgRight, type) {
    this.speed = speed;

    //x and y positions
    this.x = x;
    this.y = y;

    //size of the fish
    this.width = 0;
    this.height = 0;
    this.xDir = -1; //moves to the right if it is 1 and left if it is -1
    this.yDir = 1; //Moves down if it is 1 and up if it is -1
    this.type = type; //0 equals a fish that can be eaten, 1 equals a fish that can eat the player

    //image loading
    this.enemyReady = false;
    this.enemyImage = new Image();
    this.enemyImageRight = new Image();
    var _this = this; //saves the "this" and takes it to the other function (otherwise it would refer to different "this"
    this.enemyImage.onload = function(){
        _this.enemyReady = true;
    };

    this.enemyImage.src = img;
    this.enemyImageRight.src = imgRight;

    //function to be able to draw the image of the fish
    this.draw = function() {
        if (this.type == 0) { //If the the fish can be eaten a smaller fish is created
            this.width = 72;
            this.height = 40;
            if (this.xDir == -1) {
                canvasContext.drawImage(this.enemyImage, this.x, this.y, this.width, this.height);
            } else {
                canvasContext.drawImage(this.enemyImageRight, this.x, this.y, this.width, this.height);
            }
        } else { //if the fish cant be eaten a bigger fish is created
            this.width = 300;
            this.height = 111;
            if (this.xDir == -1) {
                canvasContext.drawImage(this.enemyImage, this.x, this.y, this.width, this.height);
            } else {
                canvasContext.drawImage(this.enemyImageRight, this.x, this.y, this.width, this.height);
            }
        }
    };

    this.updateEnemy = function(modifier) {
        // These look at each frame to see if the enemy has reached any of the sides of the canvas. and if they did
        // a boolean is changed.
        if (this.x >= canvas.width){
            this.xDir = -1;
            this.leftCollision = false;
        }
        if (this.x <= 0){
            this.xDir = 1;
            this.leftCollision = true;
        }
        if (this.y >= canvas.height){
            this.yDir = -1;
            this.topCollision = true;
        }
        if (this.y <= 0){
            this.yDir = 1;
            this.topCollision = false;
        }

        //following code controls the enemy movement on the screen and colliding with walls with the help of two booleans
        if(this.leftCollision && this.topCollision){
            this.x += this.speed * modifier;
            this.y -= this.speed * modifier;

        }
        else if(this.leftCollision && !this.topCollision){
            this.x += this.speed * modifier;
            this.y += this.speed * modifier;
        }
        else if(!this.leftCollision && this.topCollision){
            this.x -= this.speed * modifier;
            this.y -= this.speed * modifier;

        }
        else if (!this.leftCollision && !this.topCollision) {
            this.x -= this.speed * modifier;
            this.y += this.speed * modifier;
        }
    }
}

//Controls the amount of enemies and creates new ones and remove old once during play
var enemyList =[];

//adds enemies
function addToEnemyList(newEnemy){
    enemyList.push(newEnemy);
}

//removes enemies
function removeFromEnemyList(index){
    enemyList.splice(index, 1);
}




