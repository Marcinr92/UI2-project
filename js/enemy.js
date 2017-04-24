/**
 * Created by Laptopski on 2017-04-17.
 */
// the enemys coordenates and speed on the canvas in pixels.
// constructor function

// var enemy = new Enemy(100, 0, 0, img)
function Enemy(speed, x, y, img, imgRight) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.xDir = -1; //moves to the right if it is 1 and left if it is -1
    this.yDir = 1; //Moves down if it is 1 and up if it is -1

    this.enemyReady = false;
    this.enemyImage = new Image();
    this.enemyImageRight = new Image();
    var _this = this; //saves the "this" and takes it to the other function (otherwise it would refer to different "this"
    this.enemyImage.onload = function(){
        _this.enemyReady = true;
    };

    this.enemyImage.src = img;
    this.enemyImageRight.src = imgRight;

    this.draw = function() {
        if (this.xDir == -1){
            canvasContext.drawImage(this.enemyImage, this.x, this.y, 72 , 40);
        } else {
            canvasContext.drawImage(this.enemyImageRight, this.x, this.y, 72 , 40);
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

//Controlls the amount of enemies and creates new ones and remove old once during play
var enemyList =[];


//adds enemies
function addToEnemyList(newEnemy){
    enemyList.push(newEnemy);
}

//removes enemies
function removeFromEnemyList(index, enemy){
    enemyList.splice(index, enemy);
}

//returns list of enemies
function getEnemyList(){
    return enemyList;
}



