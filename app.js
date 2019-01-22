//  vars
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.getElementById("guess-btn"),
  guessInput = document.getElementById("guess-input"),
  message = document.querySelector(".message");

//
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);
  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // check for winner, game ends
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is Correct, You Win!`);
  } else {
    // if guess is wrong
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // game ends on a loss
      gameOver(
        false,
        `${guess} is incorrect, you lose. The winning number is ${winningNum}`
      );
    } else {
      // game continues, answer incorrect
      guessInput.style.borderColor = "orange";
      // clear input
      guessInput.value = "";
      setMessage(
        `${guess} is incorrect. Guesses remaining: ${guessesLeft}`,
        "orange"
      );
    }
  }
});

function gameOver(win, msg) {
  let color;
  win === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);
  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
