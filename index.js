// Создаем игровое поле
const board = document.querySelector(".board");
const cells = [];
let currentPlayer = "X";
let gameOver = false;

// Создаем ячейки на игровом поле
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cells.push(cell);
  board.appendChild(cell);

  // Обработчик клика по ячейке
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && currentPlayer === "X" && !gameOver) {
      cell.textContent = currentPlayer;
      cell.style.cursor = "not-allowed";

      if (checkWin(currentPlayer)) {
        alert("Игрок " + currentPlayer + " победил!");
        gameOver = true;
      } else if (checkDraw()) {
        alert("Ничья!");
        gameOver = true;
      } else {
        currentPlayer = "O";
        setTimeout(makeBotMove, 500);
      }
    }
  });
}

// Ход бота
function makeBotMove() {
  const emptyCells = cells.filter((cell) => cell.textContent === "");

  if (emptyCells.length > 0 && currentPlayer === "O") {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const botCell = emptyCells[randomIndex];
    botCell.textContent = currentPlayer;
    botCell.style.cursor = "not-allowed";

    if (checkWin(currentPlayer)) {
      alert("Игрок " + currentPlayer + " победил!");
      gameOver = true;
    } else if (checkDraw()) {
      alert("Ничья!");
      gameOver = true;
    } else {
      currentPlayer = "X";
    }
  }
}

// Проверка победы
function checkWin(player) {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // горизонтальные линии
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // вертикальные линии
    [0, 4, 8],
    [2, 4, 6], // диагональные линии
  ];

  return winCombinations.some((combination) => {
    return combination.every((index) => cells[index].textContent === player);
  });
}

// Проверка ничьей
function checkDraw() {
  return cells.every((cell) => cell.textContent !== "");
}
