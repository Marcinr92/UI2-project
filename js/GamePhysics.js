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
var reset = function(){
    fish1.x = 32 + (Math.random() * (canvas.width - 64));
    fish1.y = 32 + (Math.random() * (canvas.height - 64));
};

//game physics and collision detection
var update = function (modifier) {

    fish1.updateEnemy(modifier);
    player.movePlayer(modifier);

    //detects if the player and the enemy have collided
    if (player.x <= (fish1.x + 32) && fish1.x <= (player.x + 32) && player.y <= (fish1.y + 32) && fish1.y <= (player.y + 32)){
        ++score;
        reset();
    }
};

//drawing the game
var render = function(){
    if (bgReady){
        canvasContext.drawImage(bgImage,0 ,0, canvas.width, canvas.height);
    }

    console.log(player.heroReady);
    if (player.heroReady){
        player.draw();
    }

    if (fish1.enemyReady){
        fish1.draw();
    }

    //score display
    canvasContext.fillStyle = "rgb(0,0,0)";
    canvasContext.font = "36px Hobo";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText("Score: "+score, canvas.width/2 ,60);
}