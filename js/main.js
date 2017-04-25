
//Canvas created here
var canvas = document.createElement("canvas");
var canvasContext = canvas.getContext("2d");
canvas.width = 640*2;
canvas.height = 480*2;
document.body.appendChild(canvas);

//function that will resize the game dynamically when window size is manipulated
function resize(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var ratio = canvas.width/canvas.height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
}

//graphics load. the function is necessary so that all graphics load before start
var bgReady = false;
var bgImage = new Image();
bgImage.onload= function() {
    bgReady = true;
};
bgImage.src = "img/backgroundScore.png";

var player = new Player(250,0,0, "img/GreenFish.png", "img/GreenfishLeft.png");
var fish1 = new Enemy(100,0,0, "img/fish3.png", "img/fish3right.png", 0);
var fish2 = new Enemy(100,0,0, "img/fish3.png", "img/fish3right.png", 0);
var fish3 = new Enemy(300,0,0, "img/fish2.png", "img/fish2right.png", 1);
addToEnemyList(fish1);
addToEnemyList(fish2);
addToEnemyList(fish3);

var score = 0;

//gameloop. each function that draws or manipulates the game is called here. it is updated as often as possible.
var main = function(){
    var now = Date.now();
    var delta = now - then;

    update(delta/1000);
    render(canvasContext);

    then = now;

    requestAnimationFrame(main);

    resize();
};

//here the game starts
var then = Date.now();
startingPositionEnemy();
main();