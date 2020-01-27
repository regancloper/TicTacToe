// initial setup of game and variables
let turn = "X";
let numturns = 0;
let squares = document.querySelectorAll('.row > div');
let result = document.querySelector('h2');

// adds click listener for all squares in game
squares.forEach(function (square) {
    square.addEventListener("click", cellClicked);
});

// handles what happens when user clicks on a square
function cellClicked(e) {
    if (numturns >= 9) {
        resetGame();
    } else if (e.target.textContent.length == 0) {
        e.target.textContent = turn;
        setSquareColor(e);
        numturns++;
        // checks for winner, and if so posts result to screen
        if (checkForWinner()) {
            result.textContent = turn + " wins!";
            numturns = 9;
        // if the game is over with no winner, accounces a draw
        } else if (numturns == 9) {
            result.textContent = "Draw!";
        // if there is no winner and game isn't over, switches turns
        } else {
            switchTurns();
        }   
    }
}

// checks to see if there is a winner
function checkForWinner() {
    return (checkRow(1, 3) || checkRow(3, 1) || checkDiagonal());
}

// resets the game board
function resetGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
        squares[i].style.backgroundColor = "";
    }
    turn = "X";
    numturns = 0;
    result.textContent = "";
}

// checks whether player has won with either horizontal or vertical row
// @param j - number to increment for loop
// @param k - number to increment squares to check for completed row
function checkRow(j, k) {
    for (let i = 0; i < ((j * 2) + 1); i += j) {
        if (squares[i].textContent.length > 0) {
            if ((squares[i].textContent == squares[i + k].textContent) &&
                (squares[i].textContent == squares[i + (2 * k)].textContent)) {
                return true;
            }
        }
    }
    return false;
}

// checks whether a player has won with a diagonal
function checkDiagonal() {
    if (squares[4].textContent.length > 0) {
        if ((squares[4].textContent == squares[0].textContent) &&
            (squares[4].textContent == squares[8].textContent)) {
            return true;
        } else if ((squares[4].textContent == squares[2].textContent) &&
            (squares[4].textContent == squares[6].textContent)) {
            return true;
        }
    }
    return false;
}

// switches turns
function switchTurns() {
    if (turn == "X") {
        turn = "O";
    } else {
        turn = "X";
    }
}

// sets color of square clicked depending on turn
function setSquareColor(e) {
    if (e.target.textContent == "X") {
        e.target.style.backgroundColor = "green";
    } else {
        e.target.style.backgroundColor = "yellow";
    }
}