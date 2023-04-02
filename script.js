const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameFinished = false;

const checkForWin = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer) {
      return true;
    }
  }

  return false;
}

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Vez do jogador ${currentPlayer}`;
}

const handleCellClick = (e) => {
  if (gameFinished || e.target.textContent !== '') {
    return;
  }

  e.target.textContent = currentPlayer;

  if (checkForWin()) {
    status.textContent = `O jogador ${currentPlayer} ganhou!`;
    gameFinished = true;
  } else if ([...cells].every(cell => cell.textContent !== '')) {
    status.textContent = 'Empate!';
    gameFinished = true;
  } else {
    switchPlayer();
  }
}

const handleRestartClick = () => {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameFinished = false;
  status.textContent = `Vez do jogador ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartClick);
