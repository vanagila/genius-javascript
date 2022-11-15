const _data = {
  gameOn: false,
  timeout: undefined,
  playerTurn: false,
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
