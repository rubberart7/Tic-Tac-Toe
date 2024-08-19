const GameBoardModule = (function() {
    function GameBoard() {
        const rows = 3;
        const columns = 3;
        const board = [];

        for (let i = 0; i < (rows * columns); i++) {
            board.push("");
        }

        const getBoard = () => board;


        return {
            getBoard
        };
    }

    // Create and return a single instance of the GameBoard
    const gameBoardInstance = GameBoard();
    return gameBoardInstance;
})();

const board = GameBoardModule.getBoard();
console.log(board);

let possibleSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let randomValue = Math.floor(Math.random() * 9);
// math.random() gets num from 0 and 1(exclusive) and multiplies by 9 to be from 0 and 9(exclusive)
// after that the number is floored down to recieve from 0 to 8

const playerOneName = "Player One";
const playerTwoName = "Player Two";

const players = [
    {name: playerOneName, token: "X"}, {name: playerTwoName, token: "O"}
];
let index = possibleSpots.indexOf(randomValue);
if (board[randomValue] === "") {
    board[randomValue] = players[0].token;
    // if the spot is empty then make it the first players mark
    possibleSpots.splice(index, 1);
}
// find the index of where the item is placed and remove it from possible spots left

console.log(board);

let turn = 1;
let winner = null;
while (!board.every(cell => cell === 'X' || cell === 'O') && (winner === null)) {
    randomValue = Math.floor(Math.random() * 9);
    while (!possibleSpots.includes(randomValue)) {
        // if randomValue isnt present then keep getting a new one
        randomValue = Math.floor(Math.random() * 9);
    }
    index = possibleSpots.indexOf(randomValue);
    if (board[randomValue] === "") {
        board[randomValue] = players[turn].token;
        // whoever turn it is will get their spot updated and removed from spots available
        possibleSpots.splice(index, 1);
    }

    console.log(board);

    if (
        // Top row
        (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') ||
        (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') ||
        (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') ||
    
        // Left column
        (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') ||
        (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') ||
        (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') ||
    
        // Diagonals
        (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') ||
        (board[2] === 'X' && board[4] === 'X' && board[6] === 'X')
    ) {
        winner = players[0];
        console.log(`${playerOneName} wins!`);
    } else if (
        // Top row
        (board[0] === 'O' && board[1] === 'O' && board[2] === 'O') ||
        (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') ||
        (board[6] === 'O' && board[7] === 'O' && board[8] === 'O') ||
    
        // Left column
        (board[0] === 'O' && board[3] === 'O' && board[6] === 'O') ||
        (board[1] === 'O' && board[4] === 'O' && board[7] === 'O') ||
        (board[2] === 'O' && board[5] === 'O' && board[8] === 'O') ||
    
        // Diagonals
        (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') ||
        (board[2] === 'O' && board[4] === 'O' && board[6] === 'O')
    ) {
        winner = players[1];
        console.log(`${playerTwoName} wins!`);
    }

    turn = (turn + 1) % players.length;
    /*
    initially starts the turn off with player 0 and then switches at the end after X or O is placed
    */
}




/*
    Horizontal Lines:

    Indices: [0, 1, 2] (Top row)
    Indices: [3, 4, 5] (Middle row)
    Indices: [6, 7, 8] (Bottom row)
    Vertical Lines:

    Indices: [0, 3, 6] (Left column)
    Indices: [1, 4, 7] (Center column)
    Indices: [2, 5, 8] (Right column)
    Diagonal Lines:

    Indices: [0, 4, 8] (Top-left to bottom-right diagonal)
    Indices: [2, 4, 6] (Top-right to bottom-left diagonal)
*/

