const playground = document.querySelector('.playground >ul');

// console.log(playground);

// setting
const GAME_ROWS = 20;
const GAME_COLS = 10;
for (let i = 0; i < 20; i++) {
  console.log(i);

  const li = document.createElement('li');
  const ul = document.createElement('ul');

  for (let j = 0; j < 10; j++) {
    const matrix = document.createElement('li');
    // ul -> li
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}
