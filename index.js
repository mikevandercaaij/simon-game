const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function randomChosenColour() {
    var randomColour = buttonColours[nextSequence()];

    gamePattern[gamePattern.length] = randomColour;
    return randomColour;
}

$(document).keydown(function () {
    console.log(randomChosenColour());
    console.log(gamePattern);
});
