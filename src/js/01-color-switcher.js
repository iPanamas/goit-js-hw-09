const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeBgColor() {
  const DELAY = 1000;
  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled', '');
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, DELAY);
}
refs.startBtn.addEventListener('click', startChangeBgColor);

function stopChangeBgColor() {
  refs.startBtn.removeAttribute('disabled', '');
  refs.stopBtn.setAttribute('disabled', '');
  clearInterval(intervalId);
}
refs.stopBtn.addEventListener('click', stopChangeBgColor);
