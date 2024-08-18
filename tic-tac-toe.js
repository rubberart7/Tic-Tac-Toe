const GameBoardModule = (function() {
    function Cell(ind) {
        let value = "";
        const index = ind;

        const addToken = (player) => {
            value = player;
        };

        const getToken = () => value;

        const getIndex = () => ind;

        return {
            addToken,
            getToken,
            getIndex
        };
    }

    function GameBoard() {
        const rows = 3;
        const columns = 3;
        const board = [];

        for (let i = 0; i < (rows * columns); i++) {
            board.push(Cell(i));
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

board.forEach(cell => {
    console.log(`Cell ${cell.getIndex()}: Token: ${cell.getToken()}`);
});
console.log("");

const randomValue = Math.floor(Math.random() * 9);

const playerOneName = "Player One";
const playerTwoName = "Player Two";

const players = [{name: playerOneName, token: "X"}, {name: playerTwoName, token: "O"}];

board[randomValue].addToken(players[0].token.toUpperCase());


board.forEach(cell => {
    console.log(`Cell ${cell.getIndex()}: Token: ${cell.getToken()}`);
});


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

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two",
) {
    const board = GameBoardModule.getBoard();
    const players = [{name: playerOneName, token: "X"}, {name: playerTwoName, token: "O"}];

    board.addToken(players[0].token);



}


