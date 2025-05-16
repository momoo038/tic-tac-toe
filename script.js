const tictactoe = (function () {
  let players = [];
  let gameBoard = "";
  let currentPlayer = "";
  let gameActive = true;

  const board = document.querySelector("#gameBoard");
  const boardCell = document.querySelectorAll(".cell");
  const playerScore = document.querySelector("#playerScore");
  const playerOneScore = document.querySelector(".playerScoreOne");
  const playerTwoScore = document.querySelector(".playerScoreTwo");
  const playerTurn = document.querySelector("#playerTurn");
  const playerInit = document.querySelector("#player-init");
  const startBtn = document.querySelector("#startGame");

  function createPlayer(name, marker, score) {
    return { name: name, marker: marker, score: score };
  }

  const initializePlayers = function () {
    const playerOneName =
      document.querySelector("#player1Name").value || "Player 1";
    const playerTwoName =
      document.querySelector("#player2Name").value || "Player 2";

    let playerOneMarker = document.querySelector("#player1Marker").value.trim();
    let playerTwoMarker = document.querySelector("#player2Marker").value.trim();

    if (playerOneMarker === "") {
      playerOneMarker = "X";
      document.querySelector("#player1Marker").value = "X";
    }
    if (playerTwoMarker === "") {
      playerTwoMarker = "O";
      document.querySelector("#player2Marker").value = "O";
    }

    if (playerOneMarker === playerTwoMarker) {
      alert(
        `Players cannot use the same marker ('${playerOneMarker}'). Player 2's marker will be changed.`
      );
      playerTwoMarker = (playerOneMarker === "X") ? "O" : "X";
      document.querySelector("#player2Marker").value = playerTwoMarker;
    }

    if (!players || players.length === 0) {
      players[0] = createPlayer(playerOneName, playerOneMarker, 0);
      players[1] = createPlayer(playerTwoName, playerTwoMarker, 0);
    } else {
      players[0].name = playerOneName;
      players[1].name = playerTwoName;
      players[0].marker = playerOneMarker;
      players[1].marker = playerTwoMarker;
    }

    currentPlayer = players[0];

    if (playerTurn) {
      playerTurn.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    }

    if (playerOneScore && players[0]) {
      playerOneScore.textContent = `${players[0].name}'s score: ${players[0].score}`;
    }

    if (playerTwoScore && players[1]) {
      playerTwoScore.textContent = `${players[1].name}'s score: ${players[1].score}`;
    }playerOneMarker

    console.log("Players updated:");
    console.log(`${players[0].name} is P1 with marker ${players[0].marker}`);
    console.log(`${players[1].name} is P2 with marker ${players[1].marker}`);
  };

  const createBoard = function () {
    return ["", "", "", "", "", "", "", "", ""];
  };

  const displayBoard = function () {
    if (!gameBoard || !Array.isArray(gameBoard)) {
      console.log("Board does not exist.");
      return;
    }

    boardCell.forEach((cell, index) => {
      const displayMarker = gameBoard[index];
      cell.textContent = displayMarker;
    });
    console.log("");
  };

  const checkWinner = function () {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return gameBoard[a];
      }
    }
    if (!gameBoard.includes("")) {
      return "draw";
    }
    return null;
  };

  const switchTurn = function () {
    if (!players || players.length < 2 || !players[0] || !players[1]) {
      console.error("Players not found, can't switch turns.");
      gameActive = false;
      return;
    }
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    playerTurn.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    console.log(currentPlayer.name + "'s turn now.");
  };

  const playTurn = function (boardIndex) {
    if (!gameActive) {
      console.log("Game over. Start a new game to play again.");
      return;
    }

    if (typeof boardIndex !== "number" || boardIndex < 0 || boardIndex > 8) {
      console.log("Invalid square index. Use 0-8");
      displayBoard();
      return;
    }

    if (gameBoard[boardIndex] === "") {
      gameBoard[boardIndex] = currentPlayer.marker;
      console.log(currentPlayer.name + " marked square " + boardIndex);
      displayBoard();

      const winnerResult = checkWinner();
      if (winnerResult) {
        gameActive = false;
        if (winnerResult === "draw") {
          console.log("It's a draw!");
          setTimeout(() => {
            if (
              confirm(
                `It's a draw. \n\Do you want to play another round?`
              )
            ) {
              startGame();
            } else {
              alert("Loser!");
            }
          });
        } else {
          console.log(`${currentPlayer.name} wins the game!`);
          console.log("Game over. Start a new game to play again.");
          currentPlayer.score++;
          console.log(
            `Scores: ${players[0].name} - ${players[0].score}, ${players[1].name} - ${players[1].score}`
          );
          playerOneScore.textContent = `${players[0].name}'s score:  ${players[0].score}`;
          playerTwoScore.textContent = `${players[1].name}'s score:  ${players[1].score}`;

          setTimeout(() => {
            if (
              confirm(
                `${currentPlayer.name} won. \n\Do you want to play another round?`
              )
            ) {
              startGame();
            } else {
              alert("Loser!");
            }
          });
        }
      } else {
        switchTurn();
      }
    } else {
      console.log("Square already filled.");
      displayBoard();
    }
  };

  const startGame = function () {
    gameBoard = createBoard();
    gameActive = true;
    initializePlayers();

    displayBoard();

    playerInit.style.display = "none";
    board.style.display = "grid";
    playerScore.style.display = "flex";
    playerTurn.style.display = "block";
    startBtn.textContent = "Restart"
    if (startBtn) {
      startBtn.addEventListener("click", function() {location.reload()})
    }

    console.log("Game started.");
  };

  return {
    start: startGame,
    board: function () {
      return gameBoard;
    },
    displayCurrentBoard: displayBoard,
    getPlayers: function () {
      return players;
    },
    getCurrentPlayer: function () {
      return currentPlayer;
    },
    turn: playTurn,
  };
})();
