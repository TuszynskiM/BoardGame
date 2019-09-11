const startBtn = document.querySelector(".startBtn");
const startWindow = document.querySelector(".startWindow");
const throwBtn = document.querySelector('.throwBtn');
const closeBtn = document.querySelector('.closeBtn');
const boardWraper = document.querySelectorAll('.field');
const pawn = document.getElementById('pawnID');
const dice = document.getElementById('diceID');
const results = document.querySelector('.results');
const wrapper = document.getElementById("wrapperID");

// Special field:
// string - title to show
// number - move the pawn by this value
const board = [{
    isActive: true,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    specialField: 'Przegrana',
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    top: '',
    left: ''
  },
  {
    isActive: false,
    specialField: -8,
    top: '',
    left: ''
  },
  {
    isActive: false,
    specialField: 'Wygrana',
    top: '',
    left: ''
  }
];

const pawnInfo = {
  currentField: 0,
  numberOfThrows: 0,
  numberOfStitches: 0
};

const fullScreen = () => {
  wrapper.requestFullscreen();
}

const getCoordinates = () => {
  boardWraper.forEach((fieldDiv, index) => {
    let coordinates = fieldDiv.getBoundingClientRect();
    board[index].top = `${coordinates.top + (coordinates.height / 2)}px`;
    board[index].left = `${coordinates.left + (coordinates.width / 2)}px`;
  });
};


(function init() {
  getCoordinates();
  pawn.style.top = board[0].top;
  pawn.style.left = board[0].left;
})();


const throwCube = async () => {
  throwBtn.disabled = true;
  let diceNumber = Math.floor(Math.random() * 6 + 1);
  pawnInfo.numberOfThrows += 1;
  pawnInfo.numberOfStitches += diceNumber;
  let diceSize = dice.getBoundingClientRect().width;
  console.log(diceSize)
  dice.style.backgroundPositionX = `${-(diceSize / 3.65) - (diceNumber - 1) * (diceSize * 1.5890411)}px`;
  await pawnPosition(diceNumber);
  throwBtn.disabled = false;
};

const pawnPosition = async rolledNumber => {
  board[pawnInfo.currentField].isActive = false;
  await movePawn(rolledNumber);
  pawnInfo.currentField += rolledNumber;
  if (pawnInfo.currentField > 20) {
    pawnInfo.currentField = 20 - (pawnInfo.currentField - 20);
  }
  board[pawnInfo.currentField].isActive = true;
  await result();
};

const result = async () => {
  let activeField = board.filter(field => field.isActive);
  let field = activeField[0].specialField;
  if (typeof field === 'string') {
    results.children[0].textContent = field;
    results.children[1].textContent = `Liczba rzutów: ${pawnInfo.numberOfThrows}`;
    results.children[2].textContent = ` Srednia liczba oczek: ${Math.round(pawnInfo.numberOfStitches / pawnInfo.numberOfThrows)}`;
    results.classList.toggle('hideWindow');
  } else if (typeof field === 'number') {
    await pawnPosition(field);
  }
};

const movePawn = async (increaseNumber) => {
  let index = pawnInfo.currentField;
  if (index + increaseNumber <= 20 && increaseNumber > 0) {
    let maxIndex = index + increaseNumber;
    while (index <= maxIndex) {
      pawn.style.top = board[index].top;
      pawn.style.left = board[index].left;
      index++;
      await sleep(500);
    }
  } else if (increaseNumber > 0) {
    for (let i = index; i <= 20; i++) {
      pawn.style.top = board[i].top;
      pawn.style.left = board[i].left;
      await sleep(500);
    }

    let decreaseIndex = 20 - ((index + increaseNumber) - 20);
    for (let i = 20; i >= decreaseIndex; i--) {
      pawn.style.top = board[i].top;
      pawn.style.left = board[i].left;
      await sleep(500);
    }
  } else {
    let backIndex = index + increaseNumber;
    pawn.style.top = board[backIndex].top;
    pawn.style.left = board[backIndex].left;
    await sleep(500);
  }
};

const sleep = async (milliseconds) => {
  const promise = new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, milliseconds)
  );
  return await promise;
}

startBtn.addEventListener("click", fullScreen);

wrapper.addEventListener("fullscreenchange", () => {
  getCoordinates();
  pawn.style.top = board[pawnInfo.currentField].top;
  pawn.style.left = board[pawnInfo.currentField].left;
  if (window.innerWidth == screen.width && window.innerHeight == screen.height) {
    startWindow.classList.add("hideWindow");
  } else {
    startWindow.classList.remove("hideWindow");
  }
})

throwBtn.addEventListener('click', throwCube);

closeBtn.addEventListener('click', async function () {
  results.classList.toggle('hideWindow');
  await pawnPosition(-pawnInfo.currentField);
  pawnInfo.numberOfStitches = 0;
  pawnInfo.numberOfThrows = 0;
});