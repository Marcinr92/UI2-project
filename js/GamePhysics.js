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

//creates a new enemy if the previous is eaten
var reset = function(i){

    //remove the eaten fish from the list of enemies
    removeFromEnemyList(i);

    //get information about the new fish
    var xPos = randomPosition();
    var yPos = randomPosition();
    var speed = randomNumber(200, 100);
    var imageList = randomFishImage();

    //initiate new fish
    var newEnemy = new Enemy(speed, xPos, yPos, imageList[0], imageList[1], 0);

    //add new fish to the list of enemies
    addToEnemyList(newEnemy);
};

//gives new fish a random position to start from
function randomPosition(){
    var position = 32*2 + (Math.random() * (canvas.width - 64*2));
    return position;
}

//returns a random number that is used to determine for example the speed of the new fish
function randomNumber(max, min){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//gives the new fish a random color when it is initialised
function randomFishImage(){

    //list of images of the fishes when they are turned left and right
    var listOfFish = ["img/fish3.png", "img/fish4.png", "img/fish5.png" ];
    var listOfFishRight = ["img/fish3right.png", "img/fish4right.png", "img/fish5right.png" ];

    var index = randomNumber(2, 0);

    //saves the left and right version of the fish in an array
    var listOfImages = [listOfFish[index], listOfFishRight[index]];

    //returns awway with the two images of the fish
    return listOfImages;
}

//Gives the enemies a starting position that is random
var startingPositionEnemy = function (){
    for(var i=0; i < enemyList.length; i++) {
        enemyList[i].x = 32 + (Math.random() * (canvas.width - 64));
        enemyList[i].y = 32 + (Math.random() * (canvas.height - 64));
    }
};

//game physics and collision detection
var update = function (modifier) {
    player.movePlayer(modifier);

    //checks all the enemies in the list and their position in comparison to the hero
    for(var i=enemyList.length-1; i >= 0; i--) {
        enemyList[i].updateEnemy(modifier);

        //detects if the player and the enemy have collided (box to box collision checking)
        if(!((player.y + player.height) < (enemyList[i].y) || (player.y > (enemyList[i].y + enemyList[i].height)) ||
            ((player.x + player.width) < enemyList[i].x) || (player.x > (enemyList[i].x + enemyList[i].width)))){
            if (enemyList[i].type == 0){
                //if the user eats a smaller fish they get extra points
                ++score;
                reset(i);
            } else {
                //if the user is eaten by the big fish they die!
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

//changes the screen interface if the user dies
function gameOver(){
    gameover = true;

    for(i=0; i < enemyList.length;i++ ){
        enemyList = [];
    }

    //read in the end screen and play again button
    var endImage = new Image();
    endImage.src = "img/gameOver.png";

    //play again button created and loaded
    var playAgainReady = false;
    var playAgainButton = new Image();
    playAgainButton.onload= function() {
        playAgainReady = true;
    };
    playAgainButton.src = "img/playAgain.png";

    //makes sure the images are loaded when end screen is shown
    endImage.onload = function() {

        //draw start screen
        canvasContext.drawImage(endImage,0 ,0, canvas.width, canvas.height);

        //check the score against the highscore
        checkHighscore();

        //Show score from this game - gives different text and color if the user have a new highscore
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

        //Highscore text
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

