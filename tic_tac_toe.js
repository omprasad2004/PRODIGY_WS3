document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector("#board");
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.querySelector("#reset");
    const message = document.querySelector("#message");
    let currentPlayer = "X";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return boardState.every(cell => cell);
    };

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-index");

        if (boardState[cellIndex] || !gameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            message.textContent = "The game is a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    };

    const resetGame = () => {
        currentPlayer = "X";
        gameActive = true;
        boardState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        message.textContent = "";
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});