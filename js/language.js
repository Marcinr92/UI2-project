/**
 * Created by Lina Andersson on 2017-05-19.
 */

var textStrings = {
    play: "null",
    playAgain: "null",
    score: "null",
    highScore: "null",
    newRecord: "null"
};

sweTextStrings = {
    play: "Starta",
    playAgain: "Spela igen",
    score: "Poäng: ",
    highScore: "Top poäng: ",
    newRecord: " - Nytt rekord!"
};

engTextStrings = {
    play: "Play",
    playAgain: "Play again",
    score: "Score: ",
    highScore: "Highscore: ",
    newRecord: " - New record!"
};

function setSwedish() {
    textStrings = sweTextStrings;
};

function setEnglish() {
    textStrings = engTextStrings;
};
