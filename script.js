const tictactoe = (function () {
  let players = [];
  let gameBoard = "";
  let currentPlayer = "";
  let gameActive = true;

  function createPlayer(name, marker, score) {
    return { name: name, marker: marker, score: score };
  }

  const initializePlayers = function () {
    let playerOneName = prompt("Enter Player 1 name.");
    let playerOneMarker = prompt(
      `Enter ${playerOneName || "Player 1"}'s marker.`
    );
    let playerTwoName = prompt("Enter Player 2 name.");
    let playerTwoMarker = prompt(
      `Enter ${playerTwoName || "Player 2"}'s marker.`
    );

    // Check if Player One marker is a string or not
    // if it's not, it'll default to "X"
    // if it is, it will only take in the index 0 and capitalize it.
    if (typeof playerOneMarker === "string") {
      if (playerOneMarker.length === 0) {
        console.log(
          `${playerOneName || "Player 1"}'s marker was empty, defaulting to "X"`
        );
        playerOneMarker = "X";
      } else {
        let char = playerOneMarker[0].toUpperCase();
        if (char >= "A" && char <= "Z") {
          playerOneMarker = char;
        } else {
          console.log(
            `${
              playerOneName || "Player 1"
            }'s chosen marker is not a letter, defaulting to "X"`
          );
          playerOneMarker = "X";
        }
      }
    } else {
      console.log(
        `${
          playerOneName || "Player 1"
        }'s marker input was cancelled, defaulting to "X"`
      );
      playerOneMarker = "X";
    }

    // Check if Player Two marker is a string or not
    // if it's not, it'll default to "O"
    // if it is, it will only take in the index 0 and capitalize it.
    if (typeof playerTwoMarker === "string") {
      if (playerTwoMarker.length === 0) {
        console.log(
          `${playerTwoName || "Player 2"}'s marker was empty, defaulting to "O"`
        );
        playerTwoMarker = "O";
      } else {
        let char = playerTwoMarker[0].toUpperCase();
        if (char >= "A" && char <= "Z") {
          playerTwoMarker = char;
        } else {
          console.log(
            `${
              playerTwoName || "Player 2"
            }'s chosen marker is not a letter, defaulting to "O"`
          );
          playerTwoMarker = "O";
        }
      }
    } else {
      console.log(
        `${
          playerTwoName || "Player 2"
        }'s marker input was cancelled, defaulting to "O"`
      );
      playerTwoMarker = "O";
    }

    playerOneName = playerOneName || "Player 1";
    playerTwoName = playerTwoName || "Player 2";

    players[0] = createPlayer(playerOneName, playerOneMarker, 0);
    players[1] = createPlayer(playerTwoName, playerTwoMarker, 0);

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
    console.log("Game progress:");
    console.log(
      ` ${gameBoard[0] || "0"} | ${gameBoard[1] || "1"} | ${
        gameBoard[2] || "2"
      } `
    );
    console.log("---|---|---");
    console.log(
      ` ${gameBoard[3] || "3"} | ${gameBoard[4] || "4"} | ${
        gameBoard[5] || "5"
      } `
    );
    console.log("---|---|---");
    console.log(
      ` ${gameBoard[6] || "6"} | ${gameBoard[7] || "7"} | ${
        gameBoard[8] || "8"
      } `
    );
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
        } else {
          console.log(`${currentPlayer.name} wins the game!`);
          console.log("Game over. Start a new game to play again.");
          currentPlayer.score++;
          console.log(
            `Scores: ${players[0].name} - ${players[0].score}, ${players[1].name} - ${players[1].score}`
          );
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

    if (players.length > 0 && players[0] && players[0].name) {
      currentPlayer = players[0];
      console.log("Game started!");
      console.log(`${currentPlayer.name} goes first!`);
      displayBoard();
      console.log("Use tictactoe.turn(<index of the square>) to play!");
    } else {
      console.log("Players failed to initialize. Try again.");
      gameActive = false;
    }
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
