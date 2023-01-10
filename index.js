
const gameBtn = document.querySelectorAll(".gameBtn");
const computerBtn = document.querySelector(".computerBtn");
const gameResult = document.querySelector(".gameResult");

const winningCases = {
    "paper": [1, '<i class="fa-regular fa-hand"></i>'],
    "rock": [0, '<i class="fa-regular fa-hand-back-fist"></i>'],
    "scissors": [-1, '<i class="fa-regular fa-hand-scissors"></i>'],
};

function getComputerChoice() {
    return Object.keys(winningCases)[Math.floor(Math.random() * 3)];
}
function getClass(value) {
    switch (value) {
        case 0: return "class_draw";
        case 1:
        case -2: return "class_win";
        default: return "class_lose";
    }

}
function getResultMessage(value) {
    switch (value) {
        case 0: return "it's a draw!";
        case 1:
        case -2: return "You win!";
        default: return "the Computer is a Winner!";
    }
}
function enterResult(left, right) {
    const deltaValue = winningCases[left][0] - winningCases[right][0];
    gameResult.classList.add(getClass(deltaValue));
    gameResult.textContent = getResultMessage(deltaValue);
}



// ======================================================= game logic
function startGame(elem) {
    computerBtn.classList.remove("visibleBtn");
    computerBtn.textContent = "";

    gameResult.textContent = "";
    gameResult.className = gameResult.className.replace(/\bclass_[a-z]*/, "");

    gameBtn.forEach(e => e.classList.remove("btn-danger", "btnActive"))
    elem.classList.add("btn-danger", "btnActive");

    setTimeout(() => {
        const randomValue = getComputerChoice();
        computerBtn.innerHTML = randomValue + winningCases[randomValue][1];
        computerBtn.classList.add("visibleBtn");
        enterResult(elem.value, randomValue);
    }, 500);
}
gameBtn.forEach(
    e => {
        e.addEventListener("click", function () { startGame(this) })
    }
)