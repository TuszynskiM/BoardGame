const throwBtn = document.querySelector('.throw');
const boardWraper = document.querySelector('.board');

// Special field:
// string - title to show
// number - move the pawn by this value 
const board = [
    {isActive: true, specialField:0},
    {isActive:false},
    {isActive:false},
    {isActive:false},
    {isActive:false},
    {isActive:false},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,specialField:'Przegraną'},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false,},
    {isActive:false, specialField:-8},
    {isActive:false, specialField:'Wygraną'},
]

const pawn = {currentField:0, numberOfThrows:0, numberOfStitches: 0}

const throwCube = () => {
    let throwedNumber = Math.floor((Math.random() * 5) + 1);
    pawn.numberOfThrows +=1;
    pawn.numberOfStitches += throwedNumber;
    movePawn(throwedNumber);
}

const movePawn = (number) => {
    board[pawn.currentField].isActive= false;
    boardWraper.children[pawn.currentField].classList.remove('active');
    pawn.currentField += number;
    if(pawn.currentField > 20){
        pawn.currentField = 20 - (pawn.currentField - 20);
    }    
    boardWraper.children[pawn.currentField].classList.add('active');
    board[pawn.currentField].isActive= true;
    result();
}

const result = () => {
    let activeField = board.filter(field => field.isActive);
    let field = activeField[0].specialField;
    if( typeof field === 'string') {
        alert(`Zakończyłeś gre: ${field}, liczba rzutów: ${pawn.numberOfThrows}, średnia liczba oczek na rzut: ${Math.round(pawn.numberOfStitches / pawn.numberOfThrows)}`);
        location.reload();
    } else if(typeof field === 'number'){
        movePawn(field);
    }
}

throwBtn.addEventListener('click', throwCube)


