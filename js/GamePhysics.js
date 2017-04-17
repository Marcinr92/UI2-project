/**
 * Created by Laptopski on 2017-04-17.
 */
var leftCollision = null;
var topCollision = null;
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

    enemy.x = 32 + (Math.random() * (canvas.width - 64));
    enemy.y = 32 + (Math.random() * (canvas.height - 64));
}

//game physics and collision detection
var update = function (modifier) {

    // These look at each frame to see if the enemy has reached any of the sides of the canvas. and if they did
    // a boolean is changed.
    if (enemy.x >= canvas.width){
        leftCollision = false;
    }
    if (enemy.x <= 0){
        leftCollision = true;
    }
    if (enemy.y >= canvas.height){
        topCollision = true;
    }
    if (enemy.y <= 0){
        topCollision = false;
    }
    //following code controls the enemy movement on the screen and colliding with walls with the help of two booleans

    if(leftCollision && topCollision){
        enemy.x += enemy.speed * modifier;
        enemy.y -= enemy.speed * modifier;
    }
    else if(leftCollision && !topCollision){
        enemy.x += enemy.speed * modifier;
        enemy.y += enemy.speed * modifier;
    }
    else if(!leftCollision && topCollision){
        enemy.x -= enemy.speed * modifier;
        enemy.y -= enemy.speed * modifier;
    }
    else if (!leftCollision && !topCollision){
        enemy.x -= enemy.speed * modifier;
        enemy.y += enemy.speed * modifier;
    }
    //following if statements moves the player according to keypresses
    if (38 in keysDown){
        player.y -= player.speed * modifier;
    }
    if (40 in keysDown){
        player.y += player.speed * modifier;
    }
    if (37 in keysDown){
        player.x -= player.speed * modifier;
    }
    if (39 in keysDown){
        player.x += player.speed * modifier;
    }

    //detects if the player and the enemy have collided
    if (player.x <= (enemy.x + 32) && enemy.x <= (player.x + 32) && player.y <= (enemy.y + 32) && enemy.y <= (player.y + 32)){
        ++score;
        reset();
    }
}

//drawing the game
var render = function(){
    if (bgReady){
        canvasContext.drawImage(bgImage,0 ,0);
    }
    if (heroReady){
        canvasContext.drawImage(heroImage,player.x,player.y);
    }
    if (enemyReady){
        canvasContext.drawImage(enemyImage,enemy.x, enemy.y);
    }
    //score display
    canvasContext.fillStyle = "rgb(250,250,250)";
    canvasContext.font = "24px Helvetica";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText("Score: "+score, canvas.width/2 ,canvas.height/2);
}