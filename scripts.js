function createPlayer(name, symbol) {
    symbol: symbol;
    name: name;
    const getWinningString = () => symbol + symbol + symbol;
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol, getWinningString };
}

const Gameboard = (function () {
    const ticBoard = document.querySelector(".board");
    //this was in display board, first line

    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const clearBoard = () => {
        while(ticBoard.firstChild){
            ticBoard.removeChild(ticBoard.firstChild);
        }
    }

    const displayBoard = () => {
        board.forEach((row, rowIndex) => {
            row.forEach((col, columnIndex) => {
                const tile = document.createElement("div");
                tile.setAttribute("class", "tile");
                tile.setAttribute("id", rowIndex + " " + columnIndex);
                tile.textContent = col;
                ticBoard.appendChild(tile);
            });
        });
    };

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
        clearBoard
    };
})();

function Controller() {
    const startButton = document.querySelector("#startGame");
    const playerArray = [];

    const addFunctionToTiles = () => {
        const tileFunction = document.querySelectorAll(".tile");
        tileFunction.forEach(function (div) {
            div.addEventListener("click", (event) => {
                let target = event.target;
                const targetIDsplit = target.id.split(" ");
                const selectedRow = targetIDsplit[0];
                const selectedColumn = targetIDsplit[1];
                Gameboard.setSquare(selectedRow, selectedColumn, getCurrent());
                Gameboard.clearBoard();
                playGame();
            });
        });
    };

    let currentPlayer;
    const getPlayers = () => {
        const player1name = document.querySelector("#player1Name").value;
        const player2name = document.querySelector("#player2Name").value;
        const player1 = createPlayer(player1name, "x");
        const player2 = createPlayer(player2name, "o");
        playerArray.push(player1);
        playerArray.push(player2);
        currentPlayer = playerArray[0];
        Gameboard.displayBoard();
        addFunctionToTiles();
        // playGame();
    };
    startButton.addEventListener("click", getPlayers);

    const getCurrent = () => currentPlayer;

    const switchPlayer = () => {
        if (currentPlayer === playerArray[0]) {
            currentPlayer = playerArray[1];
        } else {
            currentPlayer = playerArray[0];
        }
    };

    const playGame = () => {
            Gameboard.displayBoard();
            addFunctionToTiles();
            console.log(getCurrent().getName() + "'s turn");
            // const row = prompt("Enter row");
            // const column = prompt("Enter column.");
            //
            if (Gameboard.checkWin(getCurrent())) {
                alert("win");
                return false;
            }
            switchPlayer();
    };

    return {
        getPlayers,
        getCurrent,
        switchPlayer,
        playGame,
    };
}

//THIS IS USED, DONT DELETE, THIS IS COMMENTED SO POP UPS STOP
const controller = Controller();
// controller.playGame();

// Gameboard.displayBoard();
