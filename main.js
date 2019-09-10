const throwBtn = document.querySelector(".throwBtn");
const closeBtn = document.querySelector(".closeBtn");
const boardWraper = document.querySelectorAll(".field");
const pawn = document.getElementById("pawnID");
const dice = document.getElementById("diceID");
const results = document.querySelector(".results");

// Special field:
// string - title to show
// number - move the pawn by this value
const board = [
  { isActive: true ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false, specialField: "Przegrana" ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false ,top:"", left:""},
  { isActive: false, specialField: -8 ,top:"", left:""},
  { isActive: false, specialField: "Wygrana" ,top:"", left:""}
];

const pawnInfo = { currentField: 0, numberOfThrows: 0, numberOfStitches: 0 };

const getCoordinates = () => {
    boardWraper.forEach((fieldDiv, index) => {
      let coordinates = fieldDiv.getBoundingClientRect();
      board[index].top = `${coordinates.top}px`;  
      board[index].left = `${coordinates.left}px`;
    });
};

(function init(){
  getCoordinates();
  pawn.style.top = board[0].top;
  pawn.style.left = board[0].left;
})();

const throwCube = () => {
  let throwedNumber = Math.floor(Math.random() * 6 + 1);
  pawnInfo.numberOfThrows += 1;
  pawnInfo.numberOfStitches += throwedNumber;
  dice.style.backgroundPositionX = `${-20 - (throwedNumber - 1) * 116}px`;
  pawnPosition(throwedNumber);
};

const pawnPosition = number => {

  board[pawnInfo.currentField].isActive = false;
  pawnInfo.currentField += number;

  //let endPoint = pawnInfo.currentField + number;
  //movePawn(endPoint);

  if (pawnInfo.currentField > 20) {
    pawnInfo.currentField = 20 - (pawnInfo.currentField - 20);
  }

  movePawn(pawnInfo.currentField-number,pawnInfo.currentField);

  board[pawnInfo.currentField].isActive = true;
  result();
};

const result = () => {
  let activeField = board.filter(field => field.isActive);
  let field = activeField[0].specialField;
  if (typeof field === "string") {
    results.children[0].textContent = field;
    results.children[1].textContent = `Liczba rzutów: ${pawnInfo.numberOfThrows}`
    results.children[2].textContent = ` Srednia liczba oczek: ${Math.round(pawnInfo.numberOfStitches / pawnInfo.numberOfThrows)}`
    results.classList.toggle("hideResults");
  } else if (typeof field === "number") {
    pawnPosition(field);
  }
};


const movePawn = (startPoint, endPoint)=> {
  for(let i = startPoint; i <= endPoint; i++){
  pawn.style.top = board[i].top;
  pawn.style.left = board[i].left;
  sleep(500);
}
}

function sleep(milliseconds) {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

throwBtn.addEventListener("click", throwCube);

closeBtn.addEventListener("click", function () {
    results.classList.toggle("hideResults");
    pawnInfo.currentField = 0;
    pawnInfo.numberOfStitches = 0;
    pawnInfo.numberOfThrows = 0;
    pawnPosition(pawnInfo.currentField);
})
