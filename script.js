/* =========================================================
   DP GAMES — FINAL GAME ENGINE
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initNumberGuessing();
    initRockPaperScissors();
    initTicTacToe();

});


/* =========================================================
   NUMBER GUESSING GAME
   ========================================================= */

function initNumberGuessing() {

    let secretNumber = generateSecretNumber();
    let attempts = 0;
    let gameWon = false;


    const input =
        document.getElementById("guess-input");

    const guessButton =
        document.getElementById("guess-button");

    const resetButton =
        document.getElementById("guess-reset");

    const message =
        document.getElementById("guess-message");

    const attemptDisplay =
        document.getElementById("attempt-count");


    if (
        !input ||
        !guessButton ||
        !resetButton ||
        !message ||
        !attemptDisplay
    ) {
        console.error(
            "Number Guessing elements missing."
        );

        return;
    }


    function generateSecretNumber() {

        return Math.floor(
            Math.random() * 100
        ) + 1;

    }


    function checkGuess() {

        if (gameWon) {

            message.textContent =
                "🏆 You already won! Start a new game.";

            return;
        }


        const value =
            input.value.trim();


        if (value === "") {

            message.textContent =
                "⚠️ Enter a number first.";

            input.focus();

            return;
        }


        const guess =
            Number(value);


        if (
            !Number.isInteger(guess) ||
            guess < 1 ||
            guess > 100
        ) {

            message.textContent =
                "⚠️ Enter a number between 1 and 100.";

            input.focus();

            return;
        }


        attempts++;

        attemptDisplay.textContent =
            attempts;


        if (guess === secretNumber) {

            gameWon = true;

            message.textContent =
                "🎉 CORRECT! You found it in " +
                attempts +
                " attempts.";

            input.value = "";

            return;
        }


        if (guess < secretNumber) {

            message.textContent =
                "⬆️ TOO LOW — Try a higher number.";

        } else {

            message.textContent =
                "⬇️ TOO HIGH — Try a lower number.";

        }


        input.value = "";

        input.focus();

    }


    function resetGame() {

        secretNumber =
            generateSecretNumber();

        attempts = 0;

        gameWon = false;

        input.value = "";

        attemptDisplay.textContent =
            "0";

        message.textContent =
            "Make your first guess.";

        input.focus();

    }


    guessButton.addEventListener(
        "click",
        checkGuess
    );


    resetButton.addEventListener(
        "click",
        resetGame
    );


    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                checkGuess();

            }

        }
    );

}


/* =========================================================
   ROCK PAPER SCISSORS
   ========================================================= */

function initRockPaperScissors() {

    let playerScore = 0;
    let computerScore = 0;


    const choices = [
        "rock",
        "paper",
        "scissors"
    ];


    const buttons =
        document.querySelectorAll(
            ".rps-choice"
        );


    const result =
        document.getElementById(
            "rps-result"
        );


    const playerScoreDisplay =
        document.getElementById(
            "player-score"
        );


    const computerScoreDisplay =
        document.getElementById(
            "computer-score"
        );


    const resetButton =
        document.getElementById(
            "rps-reset"
        );


    if (
        buttons.length !== 3 ||
        !result ||
        !playerScoreDisplay ||
        !computerScoreDisplay ||
        !resetButton
    ) {

        console.error(
            "Rock Paper Scissors elements missing."
        );

        return;

    }


    function computerMove() {

        const randomIndex =
            Math.floor(
                Math.random() *
                choices.length
            );

        return choices[randomIndex];

    }


    function getWinner(
        player,
        computer
    ) {

        if (player === computer) {

            return "draw";

        }


        if (

            (player === "rock" &&
                computer === "scissors") ||

            (player === "paper" &&
                computer === "rock") ||

            (player === "scissors" &&
                computer === "paper")

        ) {

            return "player";

        }


        return "computer";

    }


    function prettyName(choice) {

        return (
            choice.charAt(0).toUpperCase() +
            choice.slice(1)
        );

    }


    function play(choice) {

        if (!choices.includes(choice)) {

            return;

        }


        const computerChoice =
            computerMove();


        const winner =
            getWinner(
                choice,
                computerChoice
            );


        if (winner === "draw") {

            result.textContent =
                "🤝 DRAW — Both chose " +
                prettyName(choice) +
                ".";

        }


        else if (winner === "player") {

            playerScore++;

            result.textContent =
                "🎉 YOU WIN — " +
                prettyName(choice) +
                " beats " +
                prettyName(computerChoice) +
                ".";

        }


        else {

            computerScore++;

            result.textContent =
                "🤖 CPU WINS — " +
                prettyName(computerChoice) +
                " beats " +
                prettyName(choice) +
                ".";

        }


        playerScoreDisplay.textContent =
            playerScore;


        computerScoreDisplay.textContent =
            computerScore;

    }


    function resetGame() {

        playerScore = 0;

        computerScore = 0;

        playerScoreDisplay.textContent =
            "0";

        computerScoreDisplay.textContent =
            "0";

        result.textContent =
            "Choose your move.";

    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                play(
                    button.dataset.choice
                );

            }
        );

    });


    resetButton.addEventListener(
        "click",
        resetGame
    );

}


/* =========================================================
   TIC TAC TOE
   ========================================================= */

function initTicTacToe() {

    let board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    let mode = "friend";

    let currentPlayer = "X";

    let gameOver = false;

    let computerThinking = false;

    let xScore = 0;

    let oScore = 0;

    let computerTimer = null;


    const winningPatterns = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    const cells =
        document.querySelectorAll(
            ".ttt-cell"
        );


    const modeButtons =
        document.querySelectorAll(
            ".ttt-mode"
        );


    const result =
        document.getElementById(
            "ttt-result"
        );


    const xScoreDisplay =
        document.getElementById(
            "x-score"
        );


    const oScoreDisplay =
        document.getElementById(
            "o-score"
        );


    const resetButton =
        document.getElementById(
            "ttt-reset"
        );


    if (
        cells.length !== 9 ||
        modeButtons.length !== 2 ||
        !result ||
        !xScoreDisplay ||
        !oScoreDisplay ||
        !resetButton
    ) {

        console.error(
            "Tic Tac Toe elements missing."
        );

        return;

    }


    /* =========================================
       RENDER BOARD
    ========================================== */

    function renderBoard() {

        cells.forEach(
            (cell, index) => {

                cell.textContent =
                    board[index];

                cell.classList.remove(
                    "ttt-x",
                    "ttt-o",
                    "ttt-winning"
                );


                if (board[index] === "X") {

                    cell.classList.add(
                        "ttt-x"
                    );

                }


                if (board[index] === "O") {

                    cell.classList.add(
                        "ttt-o"
                    );

                }

            }
        );

    }


    /* =========================================
       UPDATE SCORE
    ========================================== */

    function updateScore() {

        xScoreDisplay.textContent =
            xScore;

        oScoreDisplay.textContent =
            oScore;

    }


    /* =========================================
       UPDATE MESSAGE
    ========================================== */

    function updateMessage(customMessage = "") {

        if (customMessage) {

            result.textContent =
                customMessage;

            return;

        }


        if (mode === "friend") {

            result.textContent =
                "Player " +
                currentPlayer +
                "'s turn";

        }

        else {

            result.textContent =
                "🎮 Your turn — X";

        }

    }


    /* =========================================
       WIN CHECK
    ========================================== */

    function getWinningPattern(
        player
    ) {

        return winningPatterns.find(
            pattern => {

                const [a, b, c] =
                    pattern;

                return (
                    board[a] === player &&
                    board[b] === player &&
                    board[c] === player
                );

            }
        ) || null;

    }


    /* =========================================
       DRAW CHECK
    ========================================== */

    function isDraw() {

        return board.every(
            cell => cell !== ""
        );

    }


    /* =========================================
       HIGHLIGHT WINNER
    ========================================== */

    function highlightWinner(
        pattern
    ) {

        pattern.forEach(index => {

            cells[index].classList.add(
                "ttt-winning"
            );

        });

    }


    /* =========================================
       MAKE MOVE
    ========================================== */

    function makeMove(
        index,
        player
    ) {

        if (
            gameOver ||
            board[index] !== ""
        ) {

            return false;

        }


        board[index] =
            player;


        renderBoard();


        const winningPattern =
            getWinningPattern(player);


        if (winningPattern) {

            gameOver = true;

            highlightWinner(
                winningPattern
            );


            if (player === "X") {

                xScore++;

            }

            else {

                oScore++;

            }


            updateScore();


            if (mode === "computer") {

                if (player === "X") {

                    updateMessage(
                        "🏆 YOU WIN!"
                    );

                }

                else {

                    updateMessage(
                        "🤖 COMPUTER WINS!"
                    );

                }

            }

            else {

                updateMessage(
                    "🏆 PLAYER " +
                    player +
                    " WINS!"
                );

            }


            return true;

        }


        if (isDraw()) {

            gameOver = true;

            updateMessage(
                "🤝 IT'S A DRAW!"
            );

            return true;

        }


        return true;

    }


    /* =========================================
       FIND WINNING MOVE
    ========================================== */

    function findWinningMove(
        player
    ) {

        for (
            const pattern
            of winningPatterns
        ) {

            const [a, b, c] =
                pattern;


            const values = [
                board[a],
                board[b],
                board[c]
            ];


            const playerCount =
                values.filter(
                    value =>
                        value === player
                ).length;


            const emptyCount =
                values.filter(
                    value =>
                        value === ""
                ).length;


            if (
                playerCount === 2 &&
                emptyCount === 1
            ) {

                if (board[a] === "") {
                    return a;
                }

                if (board[b] === "") {
                    return b;
                }

                if (board[c] === "") {
                    return c;
                }

            }

        }


        return -1;

    }


    /* =========================================
       COMPUTER AI
    ========================================== */

    function getComputerMove() {

        /* 1 — WIN */

        const winningMove =
            findWinningMove("O");


        if (winningMove !== -1) {

            return winningMove;

        }


        /* 2 — BLOCK */

        const blockingMove =
            findWinningMove("X");


        if (blockingMove !== -1) {

            return blockingMove;

        }


        /* 3 — CENTER */

        if (board[4] === "") {

            return 4;

        }


        /* 4 — CORNERS */

        const corners = [
            0,
            2,
            6,
            8
        ];


        const availableCorners =
            corners.filter(
                index =>
                    board[index] === ""
            );


        if (
            availableCorners.length > 0
        ) {

            return availableCorners[
                Math.floor(
                    Math.random() *
                    availableCorners.length
                )
            ];

        }


        /* 5 — SIDES */

        const sides = [
            1,
            3,
            5,
            7
        ];


        const availableSides =
            sides.filter(
                index =>
                    board[index] === ""
            );


        if (
            availableSides.length > 0
        ) {

            return availableSides[
                Math.floor(
                    Math.random() *
                    availableSides.length
                )
            ];

        }


        return -1;

    }


    /* =========================================
       COMPUTER TURN
    ========================================== */

    function computerTurn() {

        computerThinking = false;


        if (
            gameOver ||
            mode !== "computer"
        ) {

            return;

        }


        const move =
            getComputerMove();


        if (move !== -1) {

            makeMove(
                move,
                "O"
            );

        }


        if (!gameOver) {

            currentPlayer = "X";

            updateMessage(
                "🎮 YOUR TURN — X"
            );

        }

    }


    /* =========================================
       CELL CLICK
    ========================================== */

    cells.forEach(cell => {

        cell.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        cell.dataset.cell
                    );


                if (
                    gameOver ||
                    board[index] !== ""
                ) {

                    return;

                }


                if (mode === "friend") {

                    makeMove(
                        index,
                        currentPlayer
                    );


                    if (!gameOver) {

                        currentPlayer =
                            currentPlayer === "X"
                                ? "O"
                                : "X";

                        updateMessage();

                    }

                    return;

                }


                /* COMPUTER MODE */

                if (
                    computerThinking ||
                    currentPlayer !== "X"
                ) {

                    return;

                }


                makeMove(
                    index,
                    "X"
                );


                if (gameOver) {

                    return;

                }


                currentPlayer = "O";

                computerThinking = true;


                updateMessage(
                    "🤖 COMPUTER IS THINKING..."
                );


                computerTimer =
                    setTimeout(
                        computerTurn,
                        550
                    );

            }
        );

    });


    /* =========================================
       MODE BUTTONS
    ========================================== */

    modeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedMode =
                    button.dataset.mode;


                if (
                    selectedMode !== "friend" &&
                    selectedMode !== "computer"
                ) {

                    return;

                }


                mode =
                    selectedMode;


                modeButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                resetGame();

            }
        );

    });


    /* =========================================
       RESET
    ========================================== */

    function resetGame() {

        clearTimeout(
            computerTimer
        );


        board = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ];


        currentPlayer = "X";

        gameOver = false;

        computerThinking = false;


        renderBoard();

        updateScore();

        updateMessage();

    }


    resetButton.addEventListener(
        "click",
        resetGame
    );


    /* =========================================
       INITIALIZE
    ========================================== */

    renderBoard();

    updateScore();

    updateMessage();

}
/* ================================
   CRICKET CLASH
================================ */

(() => {
    const bat = document.getElementById("cricket-bat");
    const reset = document.getElementById("cricket-reset");

    const modeButtons = document.querySelectorAll(".cricket-mode");

    const playerScore = document.getElementById("cricket-player-score");
    const opponentScore = document.getElementById("cricket-opponent-score");
    const overs = document.getElementById("cricket-overs");
    const ballCount = document.getElementById("cricket-ball-count");

    const result = document.getElementById("cricket-result");
    const eventBox = document.getElementById("cricket-event");

    const wicketLights = document.querySelectorAll(".wicket");

    if (!bat || !reset) return;

    let playerRuns = 0;
    let opponentRuns = 0;
    let wickets = 0;
    let balls = 0;
    let mode = "friend";
    let gameOver = false;

    const MAX_BALLS = 12;
    const MAX_WICKETS = 3;

    function updateBoard() {
        playerScore.textContent = `${playerRuns}/${wickets}`;
        opponentScore.textContent = `${opponentRuns}/0`;

        const overNumber = Math.floor(balls / 6);
        const ballNumber = balls % 6;

        overs.textContent = `${overNumber}.${ballNumber} / 2`;
        ballCount.textContent = `BALL ${balls} / 12`;

        wicketLights.forEach((light, index) => {
            light.classList.toggle("alive", index >= wickets);
        });
    }

    function opponentPlay() {
        const choices = [0, 1, 1, 2, 2, 3, 4, 6];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function playBall() {
        if (gameOver) return;

        balls++;

        const possibleShots = [0, 1, 2, 3, 4, 6, "W"];
        const shot =
            possibleShots[Math.floor(Math.random() * possibleShots.length)];

        if (shot === "W") {
            wickets++;

            result.textContent = "OUT! 🏏";
            eventBox.textContent = `WICKET ${wickets} — Ball ${balls}`;
        } else {
            playerRuns += shot;

            result.textContent = `YOU SCORED ${shot} RUN${shot === 1 ? "" : "S"}!`;

            eventBox.textContent =
                shot === 6
                    ? "SIX! 🔥"
                    : shot === 4
                    ? "FOUR! 🚀"
                    : `${shot} run${shot === 1 ? "" : "s"}!`;
        }

        if (mode === "computer") {
            opponentRuns += opponentPlay();
        } else {
            opponentRuns += opponentPlay();
        }

        updateBoard();

        if (wickets >= MAX_WICKETS || balls >= MAX_BALLS) {
            finishGame();
        }
    }

    function finishGame() {
        gameOver = true;

        if (playerRuns > opponentRuns) {
            result.textContent = "YOU WIN! 🏆";
            eventBox.textContent =
                `${playerRuns} runs vs ${opponentRuns} runs`;
        } else if (playerRuns < opponentRuns) {
            result.textContent = "OPPONENT WINS! 😈";
            eventBox.textContent =
                `${opponentRuns} runs vs ${playerRuns} runs`;
        } else {
            result.textContent = "MATCH DRAW! 🤝";
            eventBox.textContent =
                `${playerRuns} runs each`;
        }
    }

    function resetGame() {
        playerRuns = 0;
        opponentRuns = 0;
        wickets = 0;
        balls = 0;
        gameOver = false;

        result.textContent = "Tap the bat to face the ball.";
        eventBox.textContent = "READY FOR THE FIRST BALL?";

        updateBoard();
    }

    modeButtons.forEach(button => {
        button.addEventListener("click", () => {
            modeButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            mode = button.dataset.cricketMode;

            resetGame();

            eventBox.textContent =
                mode === "computer"
                    ? "COMPUTER MODE SELECTED 🤖"
                    : "FRIEND MODE SELECTED 👥";
        });
    });

    bat.addEventListener("click", playBall);

    reset.addEventListener("click", resetGame);

    updateBoard();
})();
// ==============================
// REACTION RUSH
// ==============================

(() => {
    const button = document.getElementById("reaction-button");
    const timeDisplay = document.getElementById("reaction-time");
    const bestDisplay = document.getElementById("reaction-best");

    if (!button || !timeDisplay || !bestDisplay) return;

    let startTime = 0;
    let timer = null;
    let waiting = false;
    let ready = false;

    let bestTime = localStorage.getItem("reactionBest");

    if (bestTime) {
        bestDisplay.textContent = bestTime;
    }

    function startReactionTest() {
        clearTimeout(timer);

        waiting = true;
        ready = false;
        startTime = 0;

        button.textContent = "WAIT";
        button.classList.remove("ready");

        timeDisplay.textContent = "—";

        const delay = Math.floor(Math.random() * 3000) + 2000;

        timer = setTimeout(() => {
            ready = true;
            waiting = false;
            startTime = performance.now();

            button.textContent = "TAP!";
            button.classList.add("ready");
        }, delay);
    }

    button.addEventListener("click", () => {

        if (waiting) {
            clearTimeout(timer);

            waiting = false;
            button.textContent = "TOO SOON!";
            timeDisplay.textContent = "—";

            setTimeout(startReactionTest, 1200);
            return;
        }

        if (ready) {
            const reactionTime = Math.round(performance.now() - startTime);

            ready = false;

            button.classList.remove("ready");
            button.textContent = "WAIT";

            timeDisplay.textContent = reactionTime;

            if (!bestTime || reactionTime < Number(bestTime)) {
                bestTime = reactionTime;
                localStorage.setItem("reactionBest", bestTime);
                bestDisplay.textContent = bestTime;
            }

            setTimeout(startReactionTest, 1500);
        }
    });

    startReactionTest();
})();
// ===============================
// REACTION RUSH - FIXED VERSION
// ===============================

const reactionButtonOld = document.getElementById("reaction-button");

if (reactionButtonOld) {

    // Remove old click events
    const reactionButton = reactionButtonOld.cloneNode(true);
    reactionButtonOld.replaceWith(reactionButton);

    const timeDisplay = document.getElementById("reaction-time");
    const bestDisplay = document.getElementById("reaction-best");

    let reactionWaiting = false;
    let reactionReady = false;
    let reactionStartTime = 0;
    let reactionTimer = null;

    let reactionBest = localStorage.getItem("reactionBest");

    if (reactionBest && bestDisplay) {
        bestDisplay.textContent = reactionBest;
    }

    function startReactionRound() {

        clearTimeout(reactionTimer);

        reactionWaiting = true;
        reactionReady = false;

        reactionButton.textContent = "WAIT";
        reactionButton.classList.remove("ready");

        if (timeDisplay) {
            timeDisplay.textContent = "--";
        }

        const delay = Math.floor(Math.random() * 2500) + 1500;

        reactionTimer = setTimeout(() => {

            reactionWaiting = false;
            reactionReady = true;

            reactionStartTime = performance.now();

            reactionButton.textContent = "TAP!";
            reactionButton.classList.add("ready");

        }, delay);
    }

    reactionButton.addEventListener("click", () => {

        // Clicked too early
        if (reactionWaiting) {

            clearTimeout(reactionTimer);

            reactionWaiting = false;
            reactionReady = false;

            reactionButton.textContent = "TOO SOON!";
            reactionButton.classList.remove("ready");

            if (timeDisplay) {
                timeDisplay.textContent = "--";
            }

            setTimeout(startReactionRound, 1200);

            return;
        }

        // Correct reaction
        if (reactionReady) {

            const reactionTime = Math.round(
                performance.now() - reactionStartTime
            );

            reactionReady = false;

            reactionButton.classList.remove("ready");
            reactionButton.textContent = "WAIT";

            if (timeDisplay) {
                timeDisplay.textContent = reactionTime;
            }

            if (!reactionBest || reactionTime < Number(reactionBest)) {

                reactionBest = reactionTime;

                localStorage.setItem(
                    "reactionBest",
                    reactionBest
                );

                if (bestDisplay) {
                    bestDisplay.textContent = reactionBest;
                }
            }

            setTimeout(startReactionRound, 1500);
        }
    });

    // Start first round
    startReactionRound();
}
