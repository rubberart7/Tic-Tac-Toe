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
while (!board.every(cell => cell === 'X' || cell === 'O')) {
    randomValue = Math.floor(Math.random() * 9);
    while (!possibleSpots.includes(randomValue)) {
        randomValue = Math.floor(Math.random() * 9);
    }
    // if randomValue isnt present then keep getting a new one
    index = possibleSpots.indexOf(randomValue);
    if (board[randomValue] === "") {
        board[randomValue] = players[turn].token;
        // whoever turn it is will get their spot updated
        possibleSpots.splice(index, 1);
    }
    console.log(board);

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

