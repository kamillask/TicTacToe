function createPlayer(name, symbol) {
    symbol: symbol;
    name: name;
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
}


const Gameboard = (function() {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    const displayBoard = () => board.forEach((row) => console.log(row.join("|")));

    const getSquare = (row, column) => board[row][column];

    const setSquare = (row, column, player) => {
        if(board[row][column]===" "){
            board[row][column] = player.getSymbol();
        } else{
            alert("Space already occupied.");
        }
    };

    const resetBoard = () => {
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
    }

    // const checkWin = () => ;

    return {displayBoard, getSquare, setSquare, resetBoard};

})();

//iife
(function () {
    const player1name = prompt("Enter player 1's name.");
    const player2name = prompt("Enter player 2's name.");
    const player1 = createPlayer(player1name, "x");
    const player2 = createPlayer(player2name, "o");
    const players = [player1, player2];
    
    let currentPlayer = players[0];
    const getCurrent = () => currentPlayer;

    const switchPlayer = () => {
        if(currentPlayer===players[0]){
            currentPlayer=players[1];
        } else{
            currentPlayer=players[0];
        }
    }

    while(true){
        //wrap all this in a function, returns true if game not won, false if won
        Gameboard.displayBoard();
        console.log(getCurrent().getName() + "'s turn");
        const row = prompt("Enter row");
        const column = prompt("Enter column.");
        Gameboard.setSquare(row, column, getCurrent());
        Gameboard.displayBoard();
        switchPlayer();
    }
    
})();
