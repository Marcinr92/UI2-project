/**
 * Created by Lina Andersson on 2017-05-19.
 */

var textStrings = {
    play: "null",
    playAgain: "null",
    score: "null",
    highScore: "null",
    newRecord: "null",
    pause: "pause",
    tutorial1a: "Welcome! Move around by pressing arrows in the keyboard.",
    tutorial1b: "Welcome! Use the joystick to move around",
    tutorial2: "Eat the smaller fish and increase your score",
    tutorial3:"Beware! Bigger fish could eat you. Avoid at all cost!",
    tutorial4:"Higher score will increase the difficulty.",
    tutorial5:"Good Luck!"
};

sweTextStrings = {
    play: "Starta",
    playAgain: "Spela igen",
    score: "Poäng: ",
    highScore: "Top poäng: ",
    newRecord: " - Nytt rekord!",
    pause: "Paused",
    tutorial: "Handledning",
    tutorial1a: "Welcome! Move around by pressing arrows in the keyboard.",
    tutorial1b: "Welcome! Use the joystick to move around",
    tutorial2: "Eat the smaller fish and increase your score",
    tutorial3:"Beware! Bigger fish could eat you. Avoid at all cost!",
    tutorial4:"Higher score will increase the difficulty.",
    tutorial5:"Good Luck!"
};

engTextStrings = {
    play: "Play",
    playAgain: "Play again",
    score: "Score: ",
    highScore: "Highscore: ",
    newRecord: " - New record!",
    pause: "Paused",
    tutorial: "Tutorial",
    tutorial1a: "Welcome! Move around by pressing arrows in the keyboard.",
    tutorial1b: "Welcome! Use the joystick to move around",
    tutorial2: "Eat the smaller fish and increase your score",
    tutorial3:"Beware! Bigger fish could eat you. Avoid at all cost!",
    tutorial4:"Higher score will increase the difficulty.",
    tutorial5:"Good Luck!"
};

function setSwedish() {
    textStrings = sweTextStrings;
    translateHtmlText();
};

function setEnglish() {
    textStrings = engTextStrings;
    translateHtmlText();
};

function translateHtmlText(){
    $("#tutorial-btn").text(textStrings.tutorial);
}
