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
            getBoard,
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
                    console.log(`${activePlayer.name} wins the game!`);
                } else if (board.getBoard().every(cell => cell !== "")) {
                    winner = "Draw";
                    console.log("It's a draw!");
                } else {
                    console.log(`${activePlayer.name} played ${activePlayer.token}`);
                }
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
            getBoard: board.getBoard
        };
    }

    return GameController();

})();

function ScreenController(game = GameBoardModule) {
    const winnerDiv = document.querySelector(".winner");
    const playerTurnDiv = document.querySelector(".turn");
    const buttons = document.querySelectorAll(".spot");

    const updateScreen = () => {
        const board = game.getBoard();
        const winner = game.getWinner();

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

    return {
        updateScreen,
    };
}

function clickHandler(game, screenController) {
    const boardDiv = document.querySelector(".board");
    boardDiv.addEventListener("click", (event) => {
        const target = event.target;
        const index = parseInt(target.dataset.index, 10);
        console.log('Data-index attribute:', target.dataset.index);
        console.log(`Clicked index: ${index}`);
        if (game.placeToken(index)) {
            screenController.updateScreen();
        }
    });
    
}

// Initialize the game and screen controller
const screenController = ScreenController();
screenController.updateScreen(); // Call initially to set up the UI
clickHandler(GameBoardModule, screenController);
