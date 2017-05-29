/**
 * Created by Lina Andersson on 2017-05-19.
 */

//All the images are loaded here and also rendering of the different states


//function that will resize the game dynamically when window size is manipulated
function resize(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var ratio = canvas.width/canvas.height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
}

//IMAGES ARE LOADED HERE

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

var playButton = new Image();
playButton.src = "img/button.png";

//read in the end screen and play again button
var endImage = new Image();
endImage.src = "img/gameOver.png";

//read in the english flag
var engImage = new Image();
engImage.src = "img/en.png";

//read in the swedish flag
var sweImage = new Image();
sweImage.src = "img/sv.png";


//RENDERING FOR ALL DIFFERENT STATES

//draw start screen
function renderStart(){
    //draw start screen
    canvasContext.drawImage(startImage,0 ,0, canvas.width, canvas.height);

    //draw play button
    canvasContext.drawImage(playButton,480 ,500, 300, 96);

    // Green rectangle showing what is selected
    canvasContext.beginPath();
    canvasContext.lineWidth="10";
    canvasContext.strokeStyle="rgb(0, 255, 70)";
    canvasContext.rect(flagPosition,20,50,30);
    canvasContext.stroke();

    //drawing language flags
    canvasContext.drawImage(sweImage,1200 ,20, 50, 30);
    canvasContext.drawImage(engImage, 1130 ,20, 50, 30);

    //Highscore text
    canvasContext.fillStyle = "rgb(244,244,244)";
    canvasContext.font = "56px Hobo";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(textStrings.play, canvas.width/2 ,520);
}

//drawing the game
var renderPlay = function(){
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
    canvasContext.fillText(textStrings.score +" " +score, canvas.width/2 ,60);
};

//drawing the end screen
function renderGameOver() {

    //change background so that the user sees that it is game over
    canvasContext.drawImage(endImage,0 ,0, canvas.width, canvas.height);

    //check the score against the highscore
    checkHighscore();

    //score text
    canvasContext.fillStyle = "rgb(52,179,239)";
    canvasContext.font = "40px Hobo";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(textStrings.score, canvas.width/2 ,280);

    //Show score from this game - gives different text and color if the user have a new highscore
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    if(score > highscore){
        canvasContext.fillStyle = "rgb(77,255,0)";
        canvasContext.font = "40px Hobo";
        canvasContext.fillText(score + textStrings.newRecord, canvas.width/2 ,340);
    } else {
        canvasContext.fillStyle = "rgb(0,0,0)";
        canvasContext.font = "56px Hobo";
        canvasContext.fillText(score, canvas.width/2 ,335);
    }

    //Highscore text
    canvasContext.fillStyle = "rgb(52,179,239)";
    canvasContext.font = "40px Hobo";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(textStrings.highScore, canvas.width/2 ,415);

    //Highscore
    canvasContext.fillStyle = "rgb(0,0,0)";
    canvasContext.font = "56px Hobo";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(highscore, canvas.width/2 ,465);

    //draw play again button
    canvasContext.drawImage(playButton,495 ,580, 300, 96);

    //PLay again text
    canvasContext.fillStyle = "rgb(244,244,244)";
    canvasContext.font = "56px Hobo";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "top";
    canvasContext.fillText(textStrings.playAgain, canvas.width/2 ,600);
}