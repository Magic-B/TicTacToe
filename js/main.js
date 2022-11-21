const boxes = document.querySelector('.game');
const menuWrap = document.querySelector('.wrapper');
const btn = document.querySelector('.play-btn');

const winPos = [
  [1, 2, 3], 
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

let x = [];
let o = [];

let whoWalks = 'X';

btn.addEventListener('click', () => {
  document.querySelectorAll('.game-box').forEach((item) => item.textContent = '');
  menuWrap.classList.add('fadeOutLeft');
  boxes.classList.add('gameStart');
});

boxes.addEventListener('click', (e) => {
  if (e.target.id) {
    if(whoWalks == 'X') {
      stepFor(e.target, x, 'X', 'O', '#00E0AA');
    }else if (whoWalks == 'O') {
      stepFor(e.target, o, 'O', 'X', '#FFC700');
    }
  }
});

function stepFor(target, arr, whom, next, color) {
  if (x.includes(+target.id) || o.includes(+target.id)) {
    alert('Эта позиция занята');
    whoWalks = whom;
  } else if (target.id == '') {
    alert(`Вы не ввели позицию для ${whom}`);
    whoWalks = whom;
  } else {
    arr.push(+target.id);
    whoWalks = next;
    target.textContent += whom;
    target.style = `color: ${color}`;
  }

  if (isWin(arr)) {
    alert(`${whom} is win`);
    gameOver();
  }
}

function isWin(user) {
  return winPos.some((pos) => {
    return pos.every((p) => user.includes(p));
  });
}

function gameOver() {
  x = [];
  o = [];
  document.querySelectorAll('.game-box').forEach((item) => item.textContent = '');
  whoWalks = 'x';
}

// const arr = [[1,4], [6,9]];
// const test = [1,6,7,9];

// arr.some((pos) => {
//   return pos.every((p) => test.includes(p));
// })