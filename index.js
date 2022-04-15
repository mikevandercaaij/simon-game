//used values
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

//add onclicklistener to all buttons
$(".btn").click(function () {
    const chosenColour = $(this).attr("id");
    //add clicked color to clicked pattern
    userClickedPattern.push(chosenColour);
    //animate clicked tile
    pressAnimation(chosenColour);
    //play clicked tile's color
    makeSound(chosenColour);
    //check if clicked tile is correct
    checkAnswer(userClickedPattern.length - 1);
});

//start (next) level
function nextSequence() {
    //empty clicked pattern
    userClickedPattern = [];
    //increase level
    level++;
    //change header title
    $("#level-title").text("Level " + level);
    //calculate random number
    var randomNumber = Math.floor(Math.random() * 4);
    //get color using the random number
    var randomChosenColour = buttonColours[randomNumber];
    //add color to random color array
    gamePattern.push(randomChosenColour);
    //animate tile from random color
    pressAnimation(randomChosenColour);
    //make tile's sound
    makeSound(randomChosenColour);
}

//press spacebar to start game
$(document).keydown(function (e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        if (!started) {
            started = true;
            nextSequence();
        }
    }
});

//play sound according to given input
function makeSound(sound) {
    //play specific sound
    new Audio("sounds/" + sound + ".mp3").play();
}

function pressAnimation(color) {
    //animate tile
    $("#" + color)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            //if input was correct start next level
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        //play mistake sound
        makeSound("wrong");

        //change title
        $("#level-title").text("Game Over, Press Spacebar to Restart");

        //change background color for 0.2 seconds
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        //restart game
        startOver();
    }
}

//reset values for restart
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}
