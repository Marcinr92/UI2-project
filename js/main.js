
//Canvas created here
var canvas = document.createElement("canvas");
var canvasContext = canvas.getContext("2d");
canvas.width = 640*2;
canvas.height = 480*2;
document.body.appendChild(canvas);
var gameover = false;

//variable containing the players fish
var player = null;

//ables and disables click area
var clickEvent = true;

//eventlistener to check if user wants to start the game
canvas.addEventListener("click", click, false);

var flagPosition = 1130;

//function that starts the game if user have clicked
function click(e){
    e.preventDefault();

    //make it possible to able and disable the click area (that is only supposed to be active when starting the game and when replaying it)
    if (clickEvent == true) {
        //get mouse position x and Y in scren pixels
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        //recalculate from windowsize to the canvas pixel size to make sure the clickable area is the same as the button
        mouseX = (mouseX / window.innerWidth) * 640 * 2;
        mouseY = (mouseY / window.innerHeight) * 480 * 2;

        //Check if mouseclick is within the playbutton area on the canvas, if so start the game
        if (CURRENT_STATE == STATE_GAMEOVER) {
            if (mouseX > 495 && mouseX < 795 && mouseY > 580 && mouseY < 676) {

                //draw background
                canvasContext.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

                //reset variables to be able to start on a new game
                then = null;
                score = 0;
                hardMode = 0;
                player = null;
                startGame();
            }
        } else {
            //if the user presses a certain area (play button) the game starts for the first time
            if (mouseX > 480 && mouseX < 780 && mouseY > 500 && mouseY < 596) {
                canvasContext.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
                startGame();
            }
        }
    }

    //make it possible to able and disable the click area (that is only supposed to be active when starting the game and when replaying it)
    if (clickEvent == true) {
        //get mouse position x and Y in scren pixels
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        //recalculate from windowsize to the canvas pixel size to make sure the clickable area is the same as the button
        mouseX = (mouseX / window.innerWidth) * 640 * 2;
        mouseY = (mouseY / window.innerHeight) * 480 * 2;

        //Check if mouseclick is within the playbutton area on the canvas, if so start the game
        if (mouseX > 1200 && mouseX < 1250 && mouseY > 20 && mouseY < 50) {
            setSwedish();
            flagPosition = 1200;
        } else if (mouseX > 1140 && mouseX < 1170 && mouseY > 20 && mouseY < 50) {
            setEnglish()
            flagPosition = 1130;


        }
    }
}

var then = null;

//score for this particular game
var score = 0;

//read in the highscore saved in local storage
var highscore = localStorage.getItem("highscore");

//controls if the second enemy fish should be added to the game or not
var hardMode = 0;

function startGame() {
    //create initial gameplay characters
    //hero fish controlled by user
    player = new Player(250,0,0, "img/GreenFish.png", "img/GreenfishLeft.png");

    //enemies you can eat
    var fish1 = new Enemy(100,0,0, "img/fish3.png", "img/fish3right.png", 0);
    var fish2 = new Enemy(100,0,0, "img/fish3.png", "img/fish3right.png", 0);

    //enemy that eats you
    var fish3 = new Enemy(300,0,0, "img/fish2.png", "img/fish2right.png", 1);

    //add enemyfishes to array
    addToEnemyList(fish1);
    addToEnemyList(fish2);
    addToEnemyList(fish3);

    //here the game starts
    then = Date.now();

    //set a starting position for all the enemies
    startingPositionEnemy();

    //main();
    CURRENT_STATE = STATE_PLAY;
}

//adds extra fish to the game when the user reaches a certain level
function startHardMode() {
    if (hardMode == 0){

        //create another enemy
        var fish4 = new Enemy(1000,0,0, "img/fish2.png", "img/fish2right.png", 1);

        //add new fish to the enemylist
        addToEnemyList(fish4);
        enemyList[enemyList.length-1].x = 32 + (Math.random() * (canvas.width - 64));
        enemyList[enemyList.length-1].y = 32 + (Math.random() * (canvas.height - 64));
        hardMode = 1;
    }
}

//increases speed on fish depending on how many points the users have collected
function fishSpeed(){
    for (var i = 0; i <= enemyList.length; i++){

        if (score >= 2){
            enemyList[i].speed = enemyList[i].speed = 300;
            player.speed = 250;
        }
        if (score >= 4){
            enemyList[i].speed = enemyList[i].speed = 400;
            player.speed = 350;
        }
        if (score >= 8){
            enemyList[i].speed = enemyList[i].speed = 600;
            player.speed = 550;
        }
        if (score >= 16){
            enemyList[i].speed = enemyList[i].speed = 1000;
            player.speed = 900;
            //adding another enemy
            startHardMode();
        }
    }
}

//variables for the programs three states
var STATE_START = 1;
var STATE_PLAY = 2;
var STATE_GAMEOVER = 3;

var CURRENT_STATE = STATE_START;

//gameloop. each function that draws or manipulates the game is called here. it is updated as often as possible.
function main() {

    if (CURRENT_STATE == STATE_START) {
        clickEvent = true;
        clickEventFlags = true;
        renderStart();


    } else if (CURRENT_STATE == STATE_PLAY) {
        clickEvent = false;
        clickEventFlags = false;
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        renderPlay(canvasContext);

        then = now;

    } else if (CURRENT_STATE == STATE_GAMEOVER) {
        clickEvent = true;
        clickEventFlags = false;
        renderGameOver();
    }

    resize();
    fishSpeed();
    requestAnimationFrame(main);
}
//initial language
setEnglish();
sweImage.globalAlpha = 0.5

// run when html document ready
$( document ).ready(function() {
    // josctick initialization goes here
    var element = document.getElementById('controller');

    var joydiv = new JoydivModule.Joydiv({'element':element});
    element.addEventListener('joydiv-changed',function(e){
        delete keysDown[37];
        delete keysDown[38];
        delete keysDown[39];
        delete keysDown[40];

        var direction = joydiv.getOneOf8Directions().name;
        console.log(direction);
        if(direction.indexOf("left") > -1)
            keysDown[37] = true;
        if(direction.indexOf("up") > -1)
            keysDown[38] = true;
        if(direction.indexOf("right") > -1)
            keysDown[39] = true;
        if(direction.indexOf("down") > -1)
            keysDown[40] = true;
        
        if(direction.indexOf("none") > -1){
            delete keysDown[37];
            delete keysDown[38];
            delete keysDown[39];
            delete keysDown[40];
        } 
    });

    if(!Modernizr.touchevents){
        // console.log("no touch!!");
        element.style.display = "none";
    }
    else{
        // console.log("YES touch!!");
        element.style.display = "true";
    }
});

main();