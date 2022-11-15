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

  disablePads();
  feedbackCursor("auto");
  startGame();
});

const openModal = () => {
  _game.modal.classList.add("open");
  _game.overlay.classList.add("open");

  disablePads();
};

const closeModal = () => {
  _game.modal.classList.remove("open");
  _game.overlay.classList.remove("open");
};

_game.rulesBtn.addEventListener("click", openModal);
_game.modalBtn.addEventListener("click", closeModal);

const padListener = (ev) => {
  if (!_data.playerTurn) return;

  let padId;

  _game.pads.forEach((pad, index) => {
    if (pad === ev.target) {
      padId = index;
    }
  });

  ev.target.classList.add("game__pad--active");

  _data.playerSequence.push(padId);

  setTimeout(() => {
    ev.target.classList.remove("game__pad--active");

    const currentColor = _data.playerSequence.length - 1;

    if (
      _data.playerSequence[currentColor] !== _data.gameSequence[currentColor]
    ) {
      _data.playerTurn = false;
      disablePads();
      gameOver();
    } else if (currentColor === _data.gameSequence.length - 1) {
      randomColor();
      playSequence();
    }
  }, 200);
};

_game.pads.forEach((pad) => {
  pad.addEventListener("click", padListener);
});

const startGame = () => {
  printInfo("GAME ON", () => {
    randomColor();
    playSequence();
  });
  waitForClick();
};

const setScore = () => {
  const score = _data.score.toString();
  const display = "00".substring(0, 2 - score.length) + score;

  _game.counter.innerText = display;
};

const randomColor = () => {
  if (_data.score === 20) {
    printInfo("VOCÊ VENCEU", disablePads());
    return;
  }

  _data.gameSequence.push(Math.floor(Math.random() * 4));
  _data.score++;

  setScore();
};

const playSequence = () => {
  let counter = 0;
  let padOn = true;

  _data.playerSequence = [];
  _data.playerTurn = false;

  feedbackCursor("auto");

  const interval = setInterval(() => {
    if (padOn) {
      if (counter === _data.gameSequence.length) {
        clearInterval(interval);

        disablePads();
        waitForClick();
        feedbackCursor("pointer");

        _data.playerTurn = true;
        return;
      }

      const padId = _data.gameSequence[counter];
      const pad = _game.pads[padId];

      pad.classList.add("game__pad--active");
      counter++;
    } else {
      disablePads();
    }

    padOn = !padOn;
  }, 750);
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

const waitForClick = () => {
  clearTimeout(_data.timeout);

  _data.timeout = setTimeout(() => {
    if (!_data.playerTurn) return;

    disablePads();
  }, 4000);
};

const gameOver = () => {
  _data.playerTurn = false;

  disablePads();
  feedbackCursor("auto");

  printInfo("GAME OVER", () => {
    _data.score = 0;
    _data.gameSequence = [];
    _data.playerSequence = [];
  });
};

const feedbackCursor = (cursorType) => {
  _game.pads.forEach((pad) => {
    pad.style.cursor = cursorType;
  });
};

const disablePads = () => {
  _game.pads.forEach((pad) => {
    pad.classList.remove("game__pad--active");
  });
};
