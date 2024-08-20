const GameBoardModule = (function() {
    function GameBoard() {
        const rows = 3;
        const columns = 3;
        const board = [];

        for (let i = 0; i < (rows * columns); i++) {
            board.push("");
        }

        const getBoard = () => board;

        function printBoard() {
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
        
        return {
            getBoard,
            printBoard
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
    }

    // const board = GameBoardModule.getBoard();
    const board = GameBoardModule;
    board.printBoard();

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const players = [
        {name: playerOneName, token: "X"},
        {name: playerTwoName, token: "O"}
    ];

    const getActivePlayer = () => activePlayer;

    const getWinner = () => winner;

    const getToken = () => activePlayer.token;

    // Initialize activePlayer to playerOne
    let activePlayer = players[0];
    let winner = null;

    while (!board.getBoard().every(cell => cell === 'X' || cell === 'O') && winner === null) {
        let randomValue = Math.floor(Math.random() * 9);
        while (!possibleSpots.includes(randomValue)) {
            randomValue = Math.floor(Math.random() * 9);
        }
        
        let move = selectRandomMove(possibleSpots);
        board.getBoard()[move] = activePlayer.token;
        board.printBoard();

        if (checkWinner(board.getBoard(), activePlayer.token)) {
            winner = activePlayer;
            console.log(`${getActivePlayer().name} wins the game!`);
        }

        // Toggle activePlayer
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    if (!winner) {
        console.log("It's a draw!");
    }

    

    return {
        getWinner,
        getActivePlayer,
        getToken,
        getBoard: board.getBoard
    }
}

function screenController() {
    const game = gameController();
    const board = game.getBoard();
    const winnerDiv = document.querySelector(".winner");
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = docuemnt.querySelector(".board");


    const updateScreen = () => {
        boardDiv.innerHtml = "";
        playerTurnDiv.textContent = "";
        winnerDiv.textContent = game.getWinner();

        playerTurnDiv.textContent = `${game.getActivePlayer()}'s turn now...`

        board.forEach(spot => {
            const spotElement = document.createElement("div");
            spotElement.textContent = `${game.getToken()}`;
        })


    }
}

