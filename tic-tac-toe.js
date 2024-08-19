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

function gameController() {
    let possibleSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    function selectRandomMove(possibleSpots) {
        let randomValue = Math.floor(Math.random() * possibleSpots.length);
        // math.random() gets num from 0 and 1(exclusive) and multiplies by 9 to be from 0 and 9(exclusive)
        // after that the number is floored down to recieve from 0 to 8
        let selectedSpot = possibleSpots[randomValue];
        possibleSpots.splice(randomValue, 1);
        return selectedSpot;
    }

    function checkWinner(board, token) {
        return (
            // Top row
            (board[0] === token && board[1] === token && board[2] === token) ||
            (board[3] === token && board[4] === token && board[5] === token) ||
            (board[6] === token && board[7] === token && board[8] === token) ||

            // Left column
            (board[0] === token && board[3] === token && board[6] === token) ||
            (board[1] === token && board[4] === token && board[7] === token) ||
            (board[2] === token && board[5] === token && board[8] === token) ||

            // Diagonals
            (board[0] === token && board[4] === token && board[8] === token) ||
            (board[2] === token && board[4] === token && board[6] === token)
        );
        // returns true if you get any same tokens in a row like this
    }

    function printBoard(board) {
        const rowSize = 3;
        let boardStr = '';
    
        for (let i = 0; i < board.length; i++) {
            boardStr += (board[i] || ' ') + ' '; // Add a space between cells
    
            if ((i + 1) % rowSize === 0) {
                boardStr += '\n'; // New line after each row
            }
        }
    
        console.log(boardStr);
    }

    const board = GameBoardModule.getBoard();
    printBoard(board);

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const players = [
        {name: playerOneName, token: "X"}, {name: playerTwoName, token: "O"}
    ];

    let turn = 1;
    let winner = null;
    while (!board.every(cell => cell === 'X' || cell === 'O') && (winner === null)) {
        randomValue = Math.floor(Math.random() * 9);
        while (!possibleSpots.includes(randomValue)) {
            // if randomValue isnt present then keep getting a new one
            randomValue = Math.floor(Math.random() * 9);
        }
        let move = selectRandomMove(possibleSpots);
        board[move] = players[turn].token;

        printBoard(board);

        if (checkWinner(board, players[turn].token)) {
            winner = players[turn];
            console.log(`${winner.name} wins the game!`);
        }

        turn = (turn + 1) % players.length;
        /*
        initially starts the turn off with player 0 and then switches at the end after X or O is placed
        */
    }
}

gameController();
