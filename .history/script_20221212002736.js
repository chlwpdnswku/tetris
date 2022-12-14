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

// 앞뒤 옆 아래 움직임
const BLOCKS = {
  tree: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [],
    [],
    [],
  ],
};

const movingItem = {
  type: 'tree',
  direction: 0,
  top: 0,
  left: 0,
};

// functions

init();
// 맨처음 시작하는 함수 10개의 20개의 줄을 저장
function init() {
  // 값만 가져와서 넣어줌
  tempMovingItem = { ...movingItem };
  //   movingItem.left = 3;
  //   console.log(tempMovingItem);
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  renderBlocks();
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

function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  //   console.log(BLOCKS[type][direction]);
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0];
    const y = block[1];
    // console.log({ playground });
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    console.log(target);
  });

  //   console.log(type, direction, top, left);
}
