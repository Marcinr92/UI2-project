
//Canvas created here
var canvas = document.createElement("canvas");
var canvasContext = canvas.getContext("2d");
canvas.width = 640;
canvas.height =480;
document.body.appendChild(canvas);

//function that will resize the game dynamically when window size is manipulated
function resize(){
    var height = window.innerHeight;
    var width = window.innerWidth;
    var ratio = canvas.width/canvas.height;
    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
}
//graphics load. the function is necessary so that all graphics load before start
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

var score = 0;


//gameloop. each function that draws or manipulates the game is called here. it is updated as often as possible.

var main = function(){
    var now = Date.now();
    var delta = now - then;

    update(delta/1000);
    render();

    then = now;

    requestAnimationFrame(main);

    resize();
};

//here the game starts
var then = Date.now();
reset();
main();