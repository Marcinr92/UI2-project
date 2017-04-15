
//Canvas created here
var canvas = document.createElement("canvas");
var canvasContext = canvas.getContext("2d");
canvas.width = 640;
canvas.height =480;
document.body.appendChild(canvas);

//graphics the function is necessary so that all graphics load before start
var bgReady = false;
var bgImage = new Image();
bgImage.onload= function() {
    bgReady = true;
};
bgImage.src = "img/temp/BG.jpg";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
};
heroImage.src = "img/temp/HERO.png";

var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function(){
    enemyReady = true;
};
enemyImage.src = "img/temp/ENEMY.png";

//game obj

var player = {
    speed: 256,
    x:0,
    y:0
};

var enemy = {
    x:0,
    y:0
};

var score = 0;

var keysDown = {};

addEventListener("keydown", function(e){
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
    delete keysDown[e.keyCode];
}, false);

//randomises new enemy when previous is caught
var reset = function(){

    enemy.x = 32 + (Math.random() * (canvas.width - 64));
    enemy.y = 32 + (Math.random() * (canvas.height - 64));
}

//game physics and collision detection
var update = function (modifier) {
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
    canvasContext.fillStyle = "rgb(250,250,250";
    canvasContext.font = "24px Helvetica";
    canvasContext.textAlign = "right";
    canvasContext.textBaseline = "top";
    canvasContext.fillText("Score: "+score,32 ,32);
}

//gameloop

var main = function(){
    var now = Date.now();
    var delta = now - then;

    update(delta/1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

//here the game starts
var then = Date.now();
reset();
main();