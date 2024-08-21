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

    function GameController() {
        let possibleSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        
        function selectRandomMove() {
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
        const board = GameBoard();
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
            // game will go until board full or winner is declared
            let move = selectRandomMove();
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
            // takes the board.getBoard property and assigns it to property getBoard, parenthesis required
        };
    }

    return GameController();

})();


function ScreenController(game=GameBoardModule) {
    const winnerDiv = document.querySelector(".winner");
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    
    const updateScreen = () => {
        const board = game.getBoard();
        const winner = game.getWinner();
        boardDiv.innerHTML = "";
        playerTurnDiv.textContent = "";
        if (winner) {
            winnerDiv.textContent = `${winner.name} wins!`; // Display winner's name
            playerTurnDiv.textContent = "Game Over!";
        } else {
            winnerDiv.textContent = "No winner yet.";
            playerTurnDiv.textContent = `${game.getActivePlayer().name}'s turn now...`
        }

        board.forEach((spot, spotIndex) => {
            /*
            The forEach method's callback function has 2 parameters:
                1 : each element
                2 : (optional) the index of each element
            */
            const spotElement = document.createElement("button");
            spotElement.textContent = spot;
            boardDiv.appendChild(spotElement);
        });
    };
    updateScreen();
}

ScreenController();


