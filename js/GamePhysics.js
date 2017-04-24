/**
 * Created by Laptopski on 2017-04-17.
 */

var keysDown = {};

// eventisteners that are triggered as soon as any directional key is pressed

addEventListener("keydown", function(e){
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
    delete keysDown[e.keyCode];
}, false);

//randomises position of new enemy when previous is caught
var reset = function(enemy){
    enemy.x = 32 + (Math.random() * (canvas.width - 64));
    enemy.y = 32 + (Math.random() * (canvas.height - 64));
};

//Gives the enemies a starting position
var startingPositionEnemy = function (){
    for(var i=0; i < enemyList.length; i++) {
        enemyList[i].x = 32 + (Math.random() * (canvas.width - 64));
        enemyList[i].y = 32 + (Math.random() * (canvas.height - 64));
    }
};

//game physics and collision detection
var update = function (modifier) {
    player.movePlayer(modifier);

    for(var i=0; i < enemyList.length; i++) {
        enemyList[i].updateEnemy(modifier);
        
        //detects if the player and the enemy have collided
        if (player.x <= (enemyList[i].x + 32) && enemyList[i].x <= (player.x + 32) && player.y <= (enemyList[i].y + 32) && enemyList[i].y <= (player.y + 32)) {
            ++score;
            reset(enemyList[i]);
        }
    }
};

//drawing the game
var render = function(){
    if (bgReady){
        canvasContext.drawImage(bgImage,0 ,0, canvas.width, canvas.height);
    }

    if (player.heroReady){
        player.draw();
    }

    for(var i=0; i < enemyList.length; i++) {
        if (enemyList[i].enemyReady) {

            enemyList[i].draw();
        }
    }

    //score display
    canvasContext.fillStyle = "rgb(0,0,0)";
    canvasContext.font = "36px Hobo";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText("Score: "+score, canvas.width/2 ,60);
}