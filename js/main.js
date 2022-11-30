const boxes = document.querySelector('.game');
const box = document.querySelectorAll('.game-box');
const menuWrap = document.querySelector('.wrapper');
const aloneBtn = document.querySelector('#alone');
const compBtn = document.querySelector('#computer');

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

let start = false;

let x = [];
let o = [];

let whoWalks = 'X';

aloneBtn.addEventListener('click', () => {
  startGame();
});

boxes.addEventListener('click', (e) => {
  if (e.target.id && start) {
    if(whoWalks == 'X') {
      stepFor(e.target, x, 'X', 'O', '#00E0AA');
    } else if (whoWalks == 'O') {
      stepFor(e.target, o, 'O', 'X', '#FFC700');
    }
  }
});

function startGame() {
  document.querySelectorAll('.game-box').forEach((item) => item.textContent = '');
  menuWrap.classList.add('fadeOutLeft');
  boxes.classList.add('gameStart');
  start = true;
}

function stepFor(target, arr, whom, next, color) {
  if (x.includes(+target.id) || o.includes(+target.id)) {
    openModal('This position is occupied!');
    whoWalks = whom;
  } else if (target.id == '') {
    openModal(`You have not entered a position for ${whom}`);
    whoWalks = whom;
  } else {
    arr.push(+target.id);
    whoWalks = next;
    target.textContent += whom;
    target.style = `color: ${color}`;
  }

  if (isWin(arr) == true) {
    alert(`${whom} is win`);
    gameOver();
  }
  if (isWin(arr) == 'draw') {
    alert(`this is draw`);
    gameOver();
  }
}

function isWin(user) {
  if(user.length >= 5) {
    return 'draw';
  }
  return winPos.some((pos) => {
    return pos.every((p) => user.includes(p));
  });
}

function gameOver() {
  x = [];
  o = [];
  document.querySelectorAll('.game-box').forEach((item) => item.textContent = '');
  whoWalks = 'X';
}

// Modal

const modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]'),
      okeyBtn = document.querySelector('.close-btn'),
      modalTitle = document.querySelector('.modal-title'),
      modalBlock = document.querySelector('.modal-dialog');

function closeModal() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function openModal(title) {
  modalTitle.textContent = title;
  modal.classList.add('show');
  modalBlock.classList.add('modalAnimate');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
}

modalCloseBtn.addEventListener('click', closeModal);
okeyBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
      closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape" && modal.classList.contains('show')) { 
      closeModal();
  }
});