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
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [2, 1],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, 1],
    ],
  ],
};

const movingItem = {
  type: 'tree',
  direction: 2,
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

  const movingBlocks = document.querySelectorAll('.moving');

  //   4개의 무빙이 찍힘
  movingBlocks.forEach((moving) => {
    // 이러면 css에의해서 트리 클래스가없는 애들은 빈값이됨
    moving.classList.remove(type, 'moving');
    // console.log(moving);
  });

  // 즉 forEach 문으로
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    // console.log({ playground });
    // ul안에 chileNodes ->이 렇게 가는거임 0번은 li임
    // target은 tree 클래스 부여 즉 tree를  class를 줘서 css 를 변경?
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;

    const isAvailable = checkEmpty(target);
    // console.log(target);
    // 여기가 보여주는거네
    // 가능한 상태이면?
    if (isAvailable) {
      target.classList.add(type, 'moving');
    } else {
      // 원상복구 시키고 재귀함수를 호출할거임 ! 좌표를 원상태로 하고 부르기
      tempMovingItem = { ...movingItem };
      //   이벤트가 전부 실행이되고 스택을 집어넣는용도 무한스텍이 불러주는 용도 막기!
      setTimeout(() => {
        renderBlocks();
        if (moveType === 'top') {
          seizeBlock();
        }
      }, 0);
      //   renderBlocks();
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
  //   console.log(type, direction, top, left);
}

// 밑으로 떨어질 때에 블록 고정 함수 호출
function seizeBlock() {
  console.log('seize block');
}

function checkEmpty(target) {
  if (!target) {
    return false;
  }
  return true;
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
      break;
    case 40:
      moveBlock('top', 1);
      break;
    default:
      break;
  }
  //   console.log(e);
});

//  아래 밑에를 벗어나거나 엘리먼트를 넘어갈때 ? 에러처리 를 해줌
// childNodes[y]가 넘어갈때 target변수가 없을경우 처리해주는 방법
