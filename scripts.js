function createPlayer(name, symbol) {
    symbol: symbol;
    name: name;
    const getWinningString = () => symbol + symbol + symbol;
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol, getWinningString };
}

const Gameboard = (function () {
    let board = [
        [" ", " ", "x"],
        [" ", " ", " "],
        ["x", " ", " "],
    ];

    const displayBoard = () =>
        board.forEach((row) => console.log(row.join("|")));

    const getSquare = (row, column) => board[row][column];

    const setSquare = (row, column, player) => {
        if (board[row][column] === " ") {
            board[row][column] = player.getSymbol();
        } else {
            alert("Space already occupied.");
        }
    };

    const resetBoard = () => {
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
    };

    const checkRows = (player) => {
        for (let row in board) {
            if (board[row].join("") === player.getWinningString()) {
                return true;
            }
        }
    };

    const checkColumns = (player) => {
        for (let row in board) {
            let columnString = "";
            for (let col = 0; col < board.length; col++) {
                columnString += board[col][row];
            }
            if (columnString === player.getWinningString()) {
                return true;
            }
        }
    };

    const checkDiagonals = (player) => {
        let diagonalStringLtR = "";
        let diagonalStringRtL = "";
        for (let row in board) {
            diagonalStringLtR += board[row][row];
            diagonalStringRtL += board[row][board.length - 1 - row];
        }
        if (
            diagonalStringLtR === player.getWinningString() ||
            diagonalStringRtL === player.getWinningString()
        ) {
            return true;
        }
    };

    const checkWin = (player) => {
        if (
            checkRows(player) ||
            checkColumns(player) ||
            checkDiagonals(player)
        ) {
            return true;
        }
    };

    return {
        displayBoard,
        getSquare,
        setSquare,
        resetBoard,
        checkWin,
    };
})();

function Controller() {
    const getPlayers = () => {
        const player1name = prompt("Enter player 1's name.");
        const player2name = prompt("Enter player 2's name.");
        const player1 = createPlayer(player1name, "x");
        const player2 = createPlayer(player2name, "o");
        const players = [player1, player2];
        return players;
    };

    const playerArray = getPlayers();
    let currentPlayer = playerArray[0];
    console.log(currentPlayer);
    const getCurrent = () => currentPlayer;

    const switchPlayer = () => {
        if (currentPlayer === playerArray[0]) {
            currentPlayer = playerArray[1];
        } else {
            currentPlayer = playerArray[0];
        }
    };

    const playGame = () => {
        while (true) {
            Gameboard.displayBoard();
            console.log(getCurrent().getName() + "'s turn");
            const row = prompt("Enter row");
            const column = prompt("Enter column.");
            Gameboard.setSquare(row, column, getCurrent());
            if (Gameboard.checkWin(getCurrent())) {
                alert("win");
                return false;
            }
            switchPlayer();
        }
    };

    return {
        getPlayers,
        getCurrent,
        switchPlayer,
        playGame,
    };
}

//iife
// (function () {
//     // const player1name = prompt("Enter player 1's name.");
//     // const player2name = prompt("Enter player 2's name.");
//     // const player1 = createPlayer(player1name, "x");
//     // const player2 = createPlayer(player2name, "o");
//     // const players = [player1, player2];

//     // let currentPlayer = players[0];
//     // const getCurrent = () => currentPlayer;

//     // const switchPlayer = () => {
//     //     if (currentPlayer === players[0]) {
//     //         currentPlayer = players[1];
//     //     } else {
//     //         currentPlayer = players[0];
//     //     }
//     // };

//     while (true) {
//         //wrap all this in a function, returns true if game not won, false if won

//         Gameboard.displayBoard();
//         console.log(getCurrent().getName() + "'s turn");
//         const row = prompt("Enter row");
//         const column = prompt("Enter column.");
//         Gameboard.setSquare(row, column, getCurrent());
//         if (Gameboard.checkWin(getCurrent())) {
//             alert("win");
//             break;
//         }
//         switchPlayer();
//         // playRound();
//     }
// })();
const controller = Controller();
controller.getPlayers();
controller.playGame();
