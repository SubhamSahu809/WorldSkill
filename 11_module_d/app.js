const cube = document.querySelector('.cube');
let isPaused = false;

cube.addEventListener('click', () => {
  isPaused = !isPaused;
  cube.style.animationPlayState = isPaused ? 'paused' : 'running';
});
