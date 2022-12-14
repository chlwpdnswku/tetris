import BLOCKS from './js/blocks.js';
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

const movingItem = {
  type: '',
  direction: 3,
  top: 0,
  left: 0,
};

// functions

init();
// 맨처음 시작하는 함수 10개의 20개의 줄을 저장
function init() {
  // object entries 를선언을 해야 사용이된다
  //   console.log(Object.entries(BLOCKS).length);
  //   const blockArray = Object.entries(BLOCKS);
  //   const rendomIndex = Math.floor(Math.random() * blockArray.length);
  //   console.log(blockArray[rendomIndex][0]);

  //   console.log(blockArray);
  //   blockArray.forEach((block) => console.log(block[0]));
  //   console.log(rendomIndex);

  // 값만 가져와서 넣어줌
  tempMovingItem = { ...movingItem };
  //   movingItem.left = 3;
  //   console.log(tempMovingItem);
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  // 하나씩 아래로 내려가는 것을 구현
  generateNewBlock();
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

// moveType 인자 넘겨받아야됨 보내지않을경우에는 moveType을 초기값을 넣어줌
function renderBlocks(moveType = '') {
  const { type, direction, top, left } = tempMovingItem;
  //   console.log(BLOCKS[type][direction]);

  const movingBlocks = document.querySelectorAll('.moving');

  //   4개의 무빙이 찍힘
  movingBlocks.forEach((moving) => {
    // 이러면 css에의해서 트리 클래스가없는 애들은 빈값이됨
    moving.classList.remove(type, 'moving');
    // console.log(moving);
  });

  // 즉 forEach 문으로 ->some 으로 사용해서 return true 를 써가지고
  // 중간에 빈값이면 랜더링 할 필요가 없어서 some 을 사용해서 원하는 시점에 반복문 중단하고 다시실행 renderblocks()
  BLOCKS[type][direction].some((block) => {
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
    //  가능한 상태이면?
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
      return true;
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
  // getselector를 써서 오류가 났었음 !
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach((moving) => {
    moving.classList.remove('moving');
    moving.classList.add('seized');
  });
  checkMatch();
  //  generateNewBlock();
}
function checkMatch() {
  // 일단 전체의 차일드 노드를 가져옴 ->
  const chileNodes = playground.childNodes;
  generateNewBlock();
}
// 새로운 블럭이 생기는 것
// 타입도 바꿔주기
function generateNewBlock() {
  // 위로가는 모양을 1씩 증가시킴 즉 하나씩 내려가는 테트리스틀 표현
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, duration);

  const blockArray = Object.entries(BLOCKS);
  const rendomIndex = Math.floor(Math.random() * blockArray.length);
  console.log(blockArray[rendomIndex][0]);
  //랜덤 인덱스 생성 타입을 랜덤한 번호로 설정을 한다
  movingItem.type = blockArray[rendomIndex][0];
  movingItem.top = 0;
  //   중간 지역으로 보내기 !
  movingItem.left = 3;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

function checkEmpty(target) {
  if (!target || target.classList.contains('seized')) {
    return false;
  }
  return true;
}

// 인자들을 받고 moveBlock일때에만 renderBlocks 를 해주고
function moveBlock(moveType, amount) {
  // left를 바꿔줌 이게 증가함에 따라 움직임 하지만 색칠이됨 이동하고
  // 남은 클래스 부분들을삭제를해야됨
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

function checkDirection() {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  renderBlocks();
}

function dropBlock() {
  // 현재 돌아가고 있는 인터벌을 끄고 빠른속도로 블록을 내림
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 10);
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
    case 38:
      checkDirection();
      break;
    case 40:
      moveBlock('top', 1);
      break;

    case 32:
      dropBlock();
      break;
    default:
      break;
  }
  //   console.log(e);
});

// direction keycode and 방향키 키코드
// https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
//  아래 밑에를 벗어나거나 엘리먼트를 넘어갈때 ? 에러처리 를 해줌
// childNodes[y]가 넘어갈때 target변수가 없을경우 처리해주는 방법
