const gamecells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartbtn = document.querySelector('.restartbtn');
const alertBox = document.querySelector('.alertBox');

// making variable

let currentPlayer = 'X';
let nextPlayer = 'O';
let PlayerTurn = currentPlayer;

player1.textContent = `player 1: ${currentPlayer}`;
player2.textContent = `player 2: ${nextPlayer}`;

// function to start your game 

const startGame = () => {
    gamecells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
};

// function to change player's turn

const changePlayerTurn = () => {
    PlayerTurn = PlayerTurn === currentPlayer ? nextPlayer : currentPlayer;
};

// function to checkwin 

const checkWin = () =>{
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < winningCondition.length; i++) {
        const [pos1, pos2, pos3] = winningCondition[i];
        if(gamecells[pos1].textContent !== '' &&
           gamecells[pos1].textContent === gamecells[pos2].textContent &&
           gamecells[pos2].textContent === gamecells[pos3].textContent){
                return true;    
        }
    }
    return false;
};

// function to checktie

const checkTie = () => {
    let emptycellsCount = 0;
    gamecells.forEach(cell => {
        if(cell.textContent === ''){
            emptycellsCount++;
        }
    });
    return emptycellsCount === 0 && !checkWin();
};

const handleClick = (e) => {
    if(e.target.textContent === ''){
        e.target.textContent = PlayerTurn;
        if(checkWin()){
            showAlert(`${PlayerTurn} is a winner`);
            disableCells();
        }
        else if(checkTie()){
            showAlert(`it's a Tie`);
            disableCells();
        }
        else{
            changePlayerTurn();
            showAlert(`Turn for player : ${PlayerTurn}`);
        };
    }
};

const disableCells = () => {
    gamecells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
};

// function to restart game 

const restartGame = () => {
    gamecells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
};

restartbtn.addEventListener('click', restartGame);

const showAlert = (msg) => {
    alertBox.textContent = msg;
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 4000);
};

startGame();