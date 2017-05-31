/**
 * Created by Lina Andersson on 2017-05-19.
 */
//These text strings hold all language in the game, there is Swedish and English translations.
var textStrings = {
    play: "null",
    playAgain: "null",
    score: "null",
    highScore: "null",
    newRecord: "null",
    pause: "pause",
    tutorial1a: "Welcome! Move around by pressing arrows in the keyboard",
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
    highScore: "Rekord: ",
    newRecord: " - Nytt rekord!",
    pause: "Pausad",
    tutorial: "Handledning",
    tutorial1a: "Välkommen! Styr spelaren med piltangenterna på tangentbordet",
    tutorial1b: "Välkommen! Använd styrspaken för att styra spelaren",
    tutorial2: "Ät de små fiskarna för att få poäng",
    tutorial3:"Akta dig för de stora fiskarna! De kan äta upp dig!",
    tutorial4:"Ju högra poäng du får ju svårare blir spelet",
    tutorial5:"Lycka till!"
};

engTextStrings = {
    play: "Play",
    playAgain: "Play again",
    score: "Score: ",
    highScore: "Highscore: ",
    newRecord: " - New record!",
    pause: "Paused",
    tutorial: "Tutorial",
    tutorial1a: "Welcome! Move around by pressing the arrow keys on your keyboard",
    tutorial1b: "Welcome! Use the joystick to move around",
    tutorial2: "Eat the smaller fish to increase your score",
    tutorial3:"Beware! Bigger fish could eat you. Avoid them at all cost!",
    tutorial4:"Higher score will increase the difficulty.",
    tutorial5:"Good Luck!"
};

//These functions are called when the translate buttons are pressed.

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
    $("#start-btn").text(textStrings.play);
}
