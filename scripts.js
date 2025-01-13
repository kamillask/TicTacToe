function createPlayer(name, symbol) {
    symbol: symbol;
    name: name;
    let score = 0;

    const addScore = () => score++;
    const getScore = () => score;
    const getWinningString = () => symbol + symbol + symbol;
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol, getWinningString, addScore, getScore };
}

const Gameboard = (function () {
    const ticBoard = document.querySelector(".board");
    let symbolCount = 0;

    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];

    const clearBoard = () => {
        while (ticBoard.firstChild) {
            ticBoard.removeChild(ticBoard.firstChild);
        }
    };

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
            symbolCount++;
        } else {
            // alert("Space already occupied.");
            return false;
        }
    };

    const resetBoard = () => {
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
        symbolCount = 0;
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

    const checkTie = () => {
        if(symbolCount===9){
            return true;
        }
    }

    return {
        displayBoard,
        getSquare,
        setSquare,
        resetBoard,
        checkWin,
        clearBoard,
        checkTie,
    };
})();

function Controller() {
    const startButton = document.querySelector("#startGame");
    const currentPlayerDisplay = document.querySelector(".currentPlayer");
    const resultDialog = document.querySelector("#resultDialog");
    const resultText = document.querySelector("#resultText");
    const closeDialog = document.querySelector("#closeButton");
    let playerArray = [];

    const addFunctionToTiles = () => {
        const tileFunction = document.querySelectorAll(".tile");
        tileFunction.forEach(function (div) {
            div.addEventListener("click", (event) => {
                let target = event.target;
                const targetIDsplit = target.id.split(" ");
                const selectedRow = targetIDsplit[0];
                const selectedColumn = targetIDsplit[1];
                if(Gameboard.setSquare(selectedRow, selectedColumn, getCurrent())===false){
                    return;
                }
                Gameboard.setSquare(selectedRow, selectedColumn, getCurrent());
                Gameboard.clearBoard();
                playGame();
            });
        });
    };

    const setScoreboard = (player1, player2) => {
        const player1ScoreCardName = document.querySelector(".playerScoreCard1Name");
        const player2ScoreCardName = document.querySelector(".playerScoreCard2Name");
        const playerScoreCard1Score = document.querySelector(".playerScoreCard1Score");
        const playerScoreCard2Score = document.querySelector(".playerScoreCard2Score");

        player1ScoreCardName.textContent = player1.getName() + "(" + player1.getSymbol() + ")";
        player2ScoreCardName.textContent = player2.getName() + "(" + player2.getSymbol() + ")";
        playerScoreCard1Score.textContent = player1.getScore();
        playerScoreCard2Score.textContent = player2.getScore();
    }

    let currentPlayer;
    const getPlayers = () => {
        startButton.textContent = "Reset Game"
        const player1name = document.querySelector("#player1Name").value;
        const player2name = document.querySelector("#player2Name").value;
        const player1symbol = document.querySelector("input[name='player1Symbol']:checked").value;
        const player2symbol = document.querySelector("input[name='player2Symbol']:checked").value;

        if (player1symbol === player2symbol) {
            alert("Symbols must be unique.");
        } else  if(player1name==="" || player2name==="") {
            alert("Please enter a name.")
        }else {
            playerArray = [];
            const player1 = createPlayer(player1name, player1symbol);
            const player2 = createPlayer(player2name, player2symbol);
            playerArray.push(player1);
            playerArray.push(player2);
            currentPlayer = playerArray[0];
            setScoreboard(player1, player2);
            Gameboard.clearBoard();
            Gameboard.resetBoard();
            Gameboard.displayBoard();
            currentPlayerDisplay.textContent = getCurrent().getName() + "'s turn (" + getCurrent().getSymbol() + ")";
            addFunctionToTiles();
        }
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

    closeDialog.addEventListener("click", () => {
        resultDialog.close();
    })

    const playGame = () => {
        Gameboard.displayBoard();
        addFunctionToTiles();
        if (Gameboard.checkWin(getCurrent())) {
            getCurrent().addScore();
            Gameboard.resetBoard();
            currentPlayerDisplay.textContent = getCurrent().getName().toUpperCase() + " WINS!";
            resultText.textContent = getCurrent().getName().toUpperCase() + " WINS!";
            resultDialog.showModal();
            return;
        } else if(Gameboard.checkTie()){
            Gameboard.resetBoard();
            currentPlayerDisplay.textContent = "IT'S A TIE!";
            resultText.textContent = "IT'S A TIE!";
            resultDialog.showModal();
            return;
        }
        setScoreboard(playerArray[0], playerArray[1]);
        switchPlayer();
        currentPlayerDisplay.textContent = getCurrent().getName() + "'s turn(" + getCurrent().getSymbol() + ")";
    };

    return {
        getPlayers,
        getCurrent,
        switchPlayer,
        playGame,
    };
}

const controller = Controller();
