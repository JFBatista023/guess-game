'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 5;
let highScore = 0;

const setTextContent = function (elem, message) {
    document.querySelector(elem).textContent = message;
}

const setDisableCheckAndInput = function () {
    document.querySelector(".check").disabled = true;
    document.querySelector(".guess").disabled = true;
};

const setEnableCheckAndInput = function () {
    document.querySelector(".check").disabled = false;
    document.querySelector(".guess").disabled = false;
};

const gameLogic = function () {
    const guess = Number(document.querySelector(".guess").value);

    if (!guess) {
        setTextContent(".message", "⛔ No number!");
    } else if (guess === secretNumber) {
        setTextContent(".message", "🎉 Correct Number!");
        setTextContent(".number", String(secretNumber));
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";

        if (score > highScore) {
            highScore = score;
            setTextContent(".highscore", String(highScore));
        }

        setDisableCheckAndInput();
    } else {
        if (score > 1) {
            setTextContent(".message", guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
            score--;
            setTextContent(".score", String(score));
        } else {
            setTextContent(".number", String(secretNumber));
            setTextContent(".message", "💥 You lost the game!");
            setTextContent(".score", String(0));
            document.querySelector("body").style.backgroundColor = "#ce1313";
            setDisableCheckAndInput();
        }
    }
};

const gameReset = function () {
    score = 5;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    setEnableCheckAndInput();
    setTextContent(".message", "Start guessing...");
    setTextContent(".number", "?");
    document.querySelector(".score").textContent = String(score);
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
};

 document.querySelector(".check").addEventListener("click", function () {
    gameLogic();
});

document.querySelector("body").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        gameLogic();
    }
});

document.querySelector("body").addEventListener("keypress", function (e) {
   if (e.key === "r") {
       gameReset();
   }
});

 document.querySelector(".again").addEventListener("click", function () {
   gameReset();
});