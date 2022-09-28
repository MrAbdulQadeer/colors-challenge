let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; //random chosed color
let userClickedPattern = [];
let started = false;
let level = 0;

//start game by pressing any key
$(document).keypress(function () {
  //if started is true dont set and dont call anything;
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//user click actions
$(".btn").click(function () {
  //get user chosen color ID
  let userChosenColour = $(this).attr("id");
  console.log(userChosenColour);

  //push user chosen color to userClickedPattern
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  //play sound
  playSound(userChosenColour);

  //animate the button
  animatePress(userChosenColour);

  //check the button as answer
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //compare gamepattern last element to the userClickedpattern last element
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //g[0] == u[0];
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      //1 = 1
      setTimeout(function () {
        nextSequence(); //["green", "red"]
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  //empty userclick array
  userClickedPattern = [];

  //increase the level
  level++;

  //show level on the heading
  $("#level-title").text("Level " + level);

  //choose random color from buttonColors array
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  //put it into the gamePattern array
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  //add instant animations on the button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //play sound related to button
  playSound(randomChosenColour);
}

function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
