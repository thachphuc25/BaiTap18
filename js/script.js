const symbols = ["❤️", "⭐", "🔥", "⚡"];
let cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

const board = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const resetBtn = document.getElementById("resetBtn");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  shuffle(cards).forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
    card.addEventListener("click", () => flipCard(card, symbol));
    board.appendChild(card);
  });
}

function flipCard(card, symbol) {
  if (lockBoard || card === firstCard) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
    firstCard.dataset.symbol = symbol;
    return;
  }

  secondCard = card;
  secondCard.dataset.symbol = symbol;
  moves++;
  movesText.textContent = moves;

  checkMatch();
}
function checkMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    resetTurn();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const flippedCards = document.querySelectorAll(".card.flip");
  if (flippedCards.length === cards.length) {
    setTimeout(() => {
      alert(`🎉 Bạn thắng sau ${moves} lượt click!`);
    }, 300);
  }
}

resetBtn.addEventListener("click", () => {
  moves = 0;
  movesText.textContent = moves;
  resetTurn();
  createBoard();
});

createBoard();
