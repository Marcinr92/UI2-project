
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

//read in the start screen
var startImage = new Image();
startImage.src = "img/start.png";

//draw start screen
canvasContext.drawImage(startImage,0 ,0, canvas.width, canvas.height);

//read in the play button
var playButton = new Image();
playButton.src = "img/play.png";

//draw start screen
canvasContext.drawImage(playButton,480 ,490, 300, 96);

//resize to make sure the background fits the screen
resize();

var player = null;

//
canvas.addEventListener("mousedown", click, false);


function click(e){
    e.preventDefault();

    //get mouse position x and Y
    var mouseX = e.clientX;
    var mouseY = e.clientY;


//Check if mouseclick is within the playbutton area on the canvas, if so start the game
    if(mouseX>565 && mouseX<925 && mouseY>375 && mouseY<450){
        canvasContext.drawImage(bgImage,0 ,0, canvas.width, canvas.height);

        startGame();
    }
}

var then = null;
var score = null;
//when the user presses the play button the hero and enemies are loaded and the game can begin
function startGame() {
    player = new Player(250,0,0, "img/GreenFish.png", "img/GreenfishLeft.png");
    var fish1 = new Enemy(100,0,0, "img/fish3.png", "img/fish3right.png", 0);
    var fish2 = new Enemy(100,0,0, "img/fish3.png", "img/fish3right.png", 0);
    var fish3 = new Enemy(300,0,0, "img/fish2.png", "img/fish2right.png", 1);
    addToEnemyList(fish1);
    addToEnemyList(fish2);
    addToEnemyList(fish3);

    score = 0;

    //here the game starts
    then = Date.now();
    startingPositionEnemy();
    main();
}



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



