const GameBoardModule = (function() {
    function GameBoard() {
        const rows = 3;
        const columns = 3;
        let board = [];

        for (let i = 0; i < (rows * columns); i++) {
            board.push("");
        }

        const getBoard = () => board;

        const clearBoard = () => {
            board = Array(rows * columns).fill("");
            console.log("board has been cleared", board);
        };
        
        return {
            getBoard,
            clearBoard
        };
    }

    function GameController() {
        const board = GameBoard();
        const playerOneName = "Player One";
        const playerTwoName = "Player Two";
    
        const players = [
            {name: playerOneName, token: "X"},
            {name: playerTwoName, token: "O"}
        ];
    
        const getActivePlayer = () => activePlayer.name;
        const getWinner = () => winner;
        const getToken = () => activePlayer.token;
    
        let activePlayer = players[0];
        let winner = null;

        const resetGame = () => {
            activePlayer = players[0];
            winner = null;
            board.clearBoard();
        }

        function checkWinner(board, token) {
            return (
                (board[0] === token && board[1] === token && board[2] === token) ||
                (board[3] === token && board[4] === token && board[5] === token) ||
                (board[6] === token && board[7] === token && board[8] === token) ||
                (board[0] === token && board[3] === token && board[6] === token) ||
                (board[1] === token && board[4] === token && board[7] === token) ||
                (board[2] === token && board[5] === token && board[8] === token) ||
                (board[0] === token && board[4] === token && board[8] === token) ||
                (board[2] === token && board[4] === token && board[6] === token)
            );
        }

        function isValidMove(index) {
            return (index >= 0 && index < 9) && (board.getBoard()[index] === "");
        }

        function placeToken(index) {
            if (winner !== null) return false; // Prevent further moves if the game is over
            if (isValidMove(index)) {
                board.getBoard()[index] = activePlayer.token;
                if (checkWinner(board.getBoard(), activePlayer.token)) {
                    winner = activePlayer.name;
                    console.log(`${winner} wins the game!`);
                } else if (board.getBoard().every(cell => cell !== "")) {
                    winner = "Draw";
                    console.log("It's a draw!");
                } else {
                    console.log(`${activePlayer.name} played ${activePlayer.token}`);
                }
                console.log(board.getBoard());
                activePlayer = activePlayer === players[0] ? players[1] : players[0];
                return true;
            }
            return false;
        }
    
        return {
            getWinner,
            getActivePlayer,
            placeToken,
            getToken,
            resetGame,
            getBoard: board.getBoard,
            clearBoard: board.clearBoard
        };
    }

    return GameController();

})();

function ScreenController(game = GameBoardModule) {
    const winnerDiv = document.querySelector(".winner");
    const playerTurnDiv = document.querySelector(".turn");
    const buttons = document.querySelectorAll(".spot");

    const startGame = () => {
        winnerDiv.textContent = "Game has started";
        playerTurnDiv.textContent = "Click anywhere on the board to play";
    };

    const updateScreen = () => {
        const winner = game.getWinner();
        const board = game.getBoard(); // Get the latest board state

        buttons.forEach((button, index) => {
            button.textContent = board[index];
        });

        if (winner !== null && winner !== "Draw") {
            winnerDiv.textContent = `${winner} wins!`;
            playerTurnDiv.textContent = "Game Over!";
        } else if (winner === "Draw") {
            winnerDiv.textContent = "The game is a draw!";
            playerTurnDiv.textContent = "Game Over!";
        } else {
            playerTurnDiv.textContent = `${game.getActivePlayer()}'s turn now...`;
        }
    };

    const resetScreen = () => {
        const board = game.getBoard(); // Get the latest board state
        console.log("reset screen works");

        buttons.forEach((button, index) => {
            button.textContent = board[index];
        });

        winnerDiv.textContent = "No winner yet";
        playerTurnDiv.textContent = "Game has been reset";
    };

    return {
        updateScreen,
        resetScreen,
        startGame
    };
}

function clickHandler(game = GameBoardModule, screenController) {
    const boardDiv = document.querySelector(".board");
    document.querySelector(".container").addEventListener("click", (event) => {
        if (event.target.id === "reset") {
            game.resetGame(); // Reset the game state
            screenController.resetScreen(); // Reset the UI screen
        } else if (event.target.id === "start") {
            screenController.startGame();
        } else if (event.target.classList.contains("spot")) {
            const target = event.target;
            const index = parseInt(target.dataset.index, 10);
            console.log(`The player placed in ${index} spot`);

            if (game.placeToken(index)) {
                screenController.updateScreen(); // Update the screen after a valid move
            }
        }
    });
}

// Initialize the game and screen controller
const screenController = ScreenController();
screenController.updateScreen(); // Call initially to set up the UI
clickHandler(GameBoardModule, screenController);

