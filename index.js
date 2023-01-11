
const gameBtn = document.querySelectorAll(".gameBtn");
const gameResult = document.querySelector(".gameResult");
const computerButtons = document.querySelectorAll(".computerBtn");

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
        case -2: return "You won!";
        default: return "You lose!";
    }
}
function getResult(left, right) {
    const deltaValue = winningCases[left][0] - winningCases[right][0];
    gameResult.classList.add(getClass(deltaValue));
    return new Promise(
        resolve => {
            setTimeout(() => {
                return resolve(gameResult.textContent = getResultMessage(deltaValue));
            }, 500)
        }
    );
}



// ======================================================= game logic
function startGame(elem) {
    computerButtons.forEach(
        e => {
            return e.classList.remove("btn-danger", "btnActive");
        }
    )

    gameResult.textContent = "";
    gameResult.className = gameResult.className.replace(/\bclass_[a-z]*/, "");

    gameBtn.forEach(e => e.classList.remove("btn-danger", "btnActive"))
    elem.classList.add("btn-danger", "btnActive");

    setTimeout(async function () {
        const computerChoise = getComputerChoice();
        computerButtons.forEach(
            e => {
                e.value === computerChoise && e.classList.add("btn-danger", "btnActive");
            }
        )
        await getResult(elem.value, computerChoise);
    }, 500);
}
gameBtn.forEach(
    e => {
        e.addEventListener("click", function () { startGame(this) })
    }
)