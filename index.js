

var buttoncolour = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var randomChoosenColur;


$(document).keypress(function () {
    if (!started) {
        $('#level-title').text("level " + level);
        nextsequence();
        started = true;
    }
});

function checkAnswer(currentlevel) {

    if (gamepattern[currentlevel] === userClickedPattern[currentlevel]) {
        console.log("success");
        if (userClickedPattern.length === gamepattern.length) {
            setTimeout(function () {
                nextsequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        wg();
        function wg() {
            var wrong = "wrong";
            playSound(wrong);
            $('body').addClass("game-over");
            setTimeout(function () {
                $('body').removeClass("game-over");
            }, 200);
            $('h1').text("Game-Over, Press any key to restart ");
            startOver();
        };
    }
};

function startOver(){
    level = 0;
    gamepattern = [];
    started =false;
}

$(".btn").on("click", function () {
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextsequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChoosenColur = buttoncolour[randomNumber];
    gamepattern.push(randomChoosenColur);
    $("#" + randomChoosenColur).delay('200').fadeOut('100').fadeIn('100');
    playSound(randomChoosenColur);
};


function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 80);
};
