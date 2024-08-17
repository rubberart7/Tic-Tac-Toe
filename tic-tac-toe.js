const GameBoardModule = (function(){
    function GameBoard() {
        const rows = 3;
        const columns = 3;
        const board = [];
        /*
        initially create a 3x3 one dimensional board and push in cells to it
        */
        for (let i = 0; i < (rows * columns); i++) {
            board.push(Cell());
        }
    
        
    }
    
    function Cell() {
        /*
        0: represents empty
        1: represents X(player 1)
        2: represents O(player 2)
        */
        let value = 0;
        
        const addToken = (player) => {
            value = player;
        };

        const getToken = (player) => value; 
        //implicit return statement with an arrow function
    
        
    }

    return {
        addToken, 
        getToken
    };
}) ();