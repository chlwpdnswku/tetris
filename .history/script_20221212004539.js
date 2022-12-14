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

// 좌료를 바꾸면 모양이 바뀐다.
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
  top: 2,
  left: 5,
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
    const x = block[0] + left;
    const y = block[1] + top;
    // console.log({ playground });
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    // console.log(target);
    target.classList.add(type);
  });

  //   console.log(type, direction, top, left);
}

// 이벤트 핸들링
document.addEventListener('keydown', (e) => {
  console.log(e);
});
