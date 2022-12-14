// DOM element
const playground = document.querySelector('.playground > ul');

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
  top: 0,
  left: 3,
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

//
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

  // 즉 forEach 문으로
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    // console.log({ playground });
    // ul안에 chileNodes ->이렇게 가는거임 0번은 li임
    // target은 tree 클래스 부여 즉 tree를  class를 줘서 css 를 변경?
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    // console.log(target);
    // 여기가 보여주는거네
    target.classList.add(type, '');
  });

  //   console.log(type, direction, top, left);
}

// 인자들을 받고
function moveBlock(moveType, amount) {
  // left를 바꿔줌 이게 증가함에 따라 움직임 하지만 색칠이됨 이동하고
  // 남은 클래스 부분들을삭제를해야됨
  tempMovingItem[moveType] += amount;
  renderBlocks();
}

// 이벤트 핸들링 키를 움직이면 이벤트 객체가 생김 keyCode를 이용해서 각각의 함수를 실행을 시킬거임
document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock('left', 1);
      break;
    case 37:
      moveBlock('left', -1);
    default:
      break;
  }
  console.log(e);
});
