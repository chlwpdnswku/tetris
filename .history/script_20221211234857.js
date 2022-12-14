const playground = document.querySelector('.playground >ul');

for (let i = 0; i < 20; i++) {
  console.log(i);

  const li = document.createElement('li');
  const ul = document.createElement('ul');

  for (let j = 0; j < 10; j++) {
    const matrix = document.createElement('li');
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playgrounds.prepend(li);
}
