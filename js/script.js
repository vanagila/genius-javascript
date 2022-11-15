const _data = {
  gameOn: false,
  timeout: undefined,
  playerTurn: false,
  score: 0,
  gameSequence: [],
  playerSequence: [],
};

const _game = {
  pads: document.querySelectorAll(".pads"),
  startBtn: document.querySelector(".start_btn"),
  rulesBtn: document.querySelector(".rules_btn"),
  modalBtn: document.querySelector(".modal_btn"),
  counter: document.querySelector(".counter"),
  scoreArea: document.querySelector(".score_area"),
  overlay: document.querySelector(".overlay"),
  modal: document.querySelector(".modal_box"),
};

_game.startBtn.addEventListener("click", () => {
  _data.playerTurn = false;
  _data.score = 0;
  _data.gameSequence = [];
  _data.playerSequence = [];
  _data.gameOn = true;
});

const openModal = () => {
  _game.modal.classList.add("open");
  _game.overlay.classList.add("open");
};

const closeModal = () => {
  _game.modal.classList.remove("open");
  _game.overlay.classList.remove("open");
};

_game.rulesBtn.addEventListener("click", openModal);
_game.modalBtn.addEventListener("click", closeModal);

const setScore = () => {
  const score = _data.score.toString();
  const display = "00".substring(0, 2 - score.length) + score;

  _game.counter.innerText = display;
};

const randomColor = () => {
  if (_data.score === 20) {
    printInfo("VOCÊ VENCEU");
    return;
  }

  _data.gameSequence.push(Math.floor(Math.random() * 4));
  _data.score++;

  setScore();
};

const printInfo = (text, callback) => {
  let counter = 0;

  _game.counter.innerText = text;

  const interval = setInterval(() => {
    if (++counter === 3) {
      clearInterval(interval);
      callback();
    }
  }, 250);
};
