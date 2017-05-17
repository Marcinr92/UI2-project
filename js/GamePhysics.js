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
var reset = function(i){

    removeFromEnemyList(i);

    var xPos = randomPosition();
    var yPos = randomPosition();
    var speed = randomNumber(200, 100);
    var imageList = randomFishImage();

    var newEnemy = new Enemy(speed, xPos, yPos, imageList[0], imageList[1], 0);

    addToEnemyList(newEnemy);

};

function randomPosition(){
    var position = 32*2 + (Math.random() * (canvas.width - 64*2));
    return position;
}

function randomNumber(max, min){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomFishImage(){
    var listOfFish = ["img/fish3.png", "img/fish4.png", "img/fish5.png" ];
    var listOfFishRight = ["img/fish3right.png", "img/fish4right.png", "img/fish5right.png" ];

    var index = randomNumber(2, 0);

    var listOfImages = [listOfFish[index], listOfFishRight[index]];

    return listOfImages;
}

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

    for(var i=enemyList.length-1; i >= 0; i--) {
        enemyList[i].updateEnemy(modifier);

        //detects if the player and the enemy have collided (box to box collision checking)
        if(!((player.y + player.height) < (enemyList[i].y) || (player.y > (enemyList[i].y + enemyList[i].height)) ||
            ((player.x + player.width) < enemyList[i].x) || (player.x > (enemyList[i].x + enemyList[i].width)))){
            if (enemyList[i].type == 0){
                ++score;
                reset(i);
            } else {
                gameOver();
            }
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
};

var gameover = false;
function gameOver(){
    gameover = true;

    for(i=0; i < enemyList.length;i++ ){
        enemyList = [];
    }

    //read in the end screen and play again button
    var endImage = new Image();
    endImage.src = "img/gameOver.png";

    var playAgainButton = new Image();

    var playAgainReady = false;
    var playAgainButton = new Image();
    playAgainButton.onload= function() {
        playAgainReady = true;
    };
    playAgainButton.src = "img/playAgain.png";

    endImage.onload = function() {

        //draw start screen
        canvasContext.drawImage(endImage,0 ,0, canvas.width, canvas.height);

        //check the score against the highscore
        checkHighscore();

        //Show score from this game
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "top";
        if(score > highscore){
            canvasContext.fillStyle = "rgb(77,255,0)";
            canvasContext.font = "40px Hobo";
            canvasContext.fillText(score + " - New record!", canvas.width/2 ,340);
        } else {
            canvasContext.fillStyle = "rgb(0,0,0)";
            canvasContext.font = "56px Hobo";
            canvasContext.fillText(score, canvas.width/2 ,335);
        }

        //Highscore
        canvasContext.fillStyle = "rgb(0,0,0)";
        canvasContext.font = "56px Hobo";
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "top";
        canvasContext.fillText(highscore, canvas.width/2 ,465);

        //gives the button extra time to load since it takes to much time sometimes
        playAgainButton.onload = function(){
            //draw play again button
            canvasContext.drawImage(playAgainButton,495 ,580, 300, 96);
        };

        //eventlistener to check if user wants to start the game
        clickEvent = true;
        addClickEvent();
    };

    //resize to make sure the background fits the screen
    resize();



}

function checkHighscore(){

    //if highscore isn't null the program will see if the users score are higher than the highscore and in that case save the new highscore (in the local storage NOT in this particular game)
    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);
        }
    }

    //if highscore is null the program will save the users score as the new highscore in the local storage NOT in this game though
    else{
        localStorage.setItem("highscore", score);
    }
}

