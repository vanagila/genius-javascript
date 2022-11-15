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
