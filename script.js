const tictactoe = (function () {
  const initializePlayers = function () {
    function createPlayer(name, marker) {
      return { name: name, marker: marker };
    }

    const playerOne = createPlayer("P1", "X");
    const playerTwo = createPlayer("P2", "O");

    const players = [playerOne, playerTwo];
    return players;
  };

  const createBoard = function () {
    return ["", "", "", "", "", "", "", "", ""];
  };

  const gameBoard = createBoard();
  const players = initializePlayers();
  let currentPlayer = players[0];

  const switchTurn = function () {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    console.log(currentPlayer.name + "'s turn now.");
  };

  const playTurn = function (boardIndex) {
    if (gameBoard[boardIndex] === "") {
      gameBoard[boardIndex] = currentPlayer.marker;
      console.log(currentPlayer.name + " marked square " + boardIndex);
      switchTurn();
    } else {
      console.log("Square already filled.");
    }
  };

  return {
    board: gameBoard,
    getPlayers: function () {
      return players;
    },
    getCurrentPlayer: function () {
      return currentPlayer;
    },
    turn: playTurn,
  };
})();
