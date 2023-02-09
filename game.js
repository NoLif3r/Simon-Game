const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let randomNumber;
let randomChosenColor;
let userChosenColour;

let gameStarted = false;
let level = 0;

// Add event listener for keyboard keypress (to start game)
$(document).keydown(event => {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

// Add event listeners for clicks on color buttons
$('.btn').click(event => {
    if (gameStarted) {
        userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);

        clickEffect(userChosenColour);
        playSound(userChosenColour);

        checkAnswer();
    }
})



// Generate random number 0-3 and set color of next button
function nextSequence() {
    // increase current level to +1 and change title
    level++;
    $('#level-title').text(`Level ${level}`);

    // generate random number and set next correct button color
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // animate and play sound for next correct button
    animateButton(randomChosenColor);
    playSound(randomChosenColor);

    // clear players previous clicks sequence
    userClickedPattern = [];

}

// Reset game
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

// check current answer
function checkAnswer() {
    // check if current user answer is equal to the answer in game sequence on same position
    if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) {
        // check if current correct answer is the last answer, if so - start new level
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000)
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    $('#level-title').html('Game Over!<br><br>Press any key to Restart')
    // play sound fx and animation when game is over
    new Audio('./sounds/wrong.mp3').play();
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200)

    startOver();
}



// Cosmetic functions: animation, sound fx, click fx
function animateButton(color) {
    $(`#${color}`).animate({opacity: 0.25}, 100).animate({opacity: 1}, 100);
}
function playSound(color) {
    new Audio(`./sounds/${color}.mp3`).play();
}
function clickEffect(color) {
    let clickedButton = $(`#${color}`);

    clickedButton.addClass('pressed');
    setTimeout(() => {
        clickedButton.removeClass('pressed');
    }, 100);
}
