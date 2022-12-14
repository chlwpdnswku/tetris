const playground = document.querySelector('.playground >ul');

// console.log(playground);

// setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const movingItem = {
  type: '',
  direction: 0,
  top: 0,
};

// functions

init();
// 맨처음 시작하는 함수 10개의 20개의 줄을 저장
function init() {
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
}

function prependNewLine() {
  const li = document.createElement('li');
  const ul = document.createElement('ul');

  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement('li');
    // ul -> li
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}
