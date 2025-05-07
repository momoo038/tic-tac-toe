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
    return [
        "", "", "", 
        "", "", "", 
        "", "", ""];
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

  // TODO (#1): check winner function 
  // Details: After the playTurn is over, another function
  // should be ran to check the marker state of each player
  // The checks should be done on squares [0, 1, 2],
  // [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
  // [2, 5, 8], [0, 4, 8], [2, 4, 6]. It should check for:
  // player[0] OR player[1] markers at those exact positions.
  // If there are, either player[0] or player[1] wins.

  // TODO (#2): score tracking function
  // Details: Directly related to the function above
  // as well as initializePlayers function.

  // TODO (#3): visual indication of the board in console
  // Details: self-explanatory .

  // TODO (###): make the logic to create custom players
  // and for them to choose markers right before the game starts.

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
