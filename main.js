const throwBtn = document.querySelector(".throw");
const boardWraper = document.querySelectorAll(".field");
const pawn = document.querySelector(".pawn");
const dice = document.getElementById("diceID");

// Special field:
// string - title to show
// number - move the pawn by this value
const board = [
  { isActive: true, specialField: 0 },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false, specialField: "Przegraną" },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false },
  { isActive: false, specialField: -8 },
  { isActive: false, specialField: "Wygraną" }
];

const pawnInfo = { currentField: 0, numberOfThrows: 0, numberOfStitches: 0 };

const throwCube = () => {
  let throwedNumber = Math.floor(Math.random() * 6 + 1);
  pawnInfo.numberOfThrows += 1;
  pawnInfo.numberOfStitches += throwedNumber;
  dice.style.backgroundPositionX = `${-20 - (throwedNumber - 1) * 116}px`;
  pawnPosition(throwedNumber);
};

const pawnPosition = number => {
  board[pawnInfo.currentField].isActive = false;

  //movePawn(pawnInfo.currentField, pawnInfo.currentField + number);

  pawnInfo.currentField += number;
  if (pawnInfo.currentField > 20) {
    pawnInfo.currentField = 20 - (pawnInfo.currentField - 20);
  }
  board[pawnInfo.currentField].isActive = true;
  boardWraper[pawnInfo.currentField].appendChild(pawn);
  result();
};

const result = () => {
  let activeField = board.filter(field => field.isActive);
  let field = activeField[0].specialField;
  if (typeof field === "string") {
    console.log(
      `Zakończyłeś gre: ${field}, liczba rzutów: ${
        pawnInfo.numberOfThrows
      }, średnia liczba oczek na rzut: ${Math.round(
        pawnInfo.numberOfStitches / pawnInfo.numberOfThrows
      )}`
    );
  } else if (typeof field === "number") {
    pawnPosition(field);
  }
};

const movePawn = (i, max) => {
  while (i < max) {
    i++;
    setTimeout(() => {
      boardWraper[i].appendChild(pawn);
    }, 1000);
  }
};

throwBtn.addEventListener("click", throwCube);
