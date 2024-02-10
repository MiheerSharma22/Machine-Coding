import { useEffect, useState } from "react";
import "./index.css";

const TicTacToe = () => {
  const [whoseTurnIsIt, setWhoseTurnIsIt] = useState("X");

  const [result, setResult] = useState("");

  const [gameBoard, setGameBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  useEffect(() => {
    console.log("GameBoard: ", gameBoard);
  }, [gameBoard]);

  // function to update the game board after each player's turn
  const handleSettingMoveOnBoard = (
    currentSelectedBlockRow,
    currentSelectedBlockCol
  ) => {
    // setting the game board at currentSelectedBlockRow and currentSelectedBlockCol with value of whoseTurnIsIt state value
    const updatedGameBoard = [...gameBoard];
    updatedGameBoard[currentSelectedBlockRow][currentSelectedBlockCol] =
      whoseTurnIsIt;
    setGameBoard(updatedGameBoard);

    // changing the player turns
    if (whoseTurnIsIt === "X") setWhoseTurnIsIt("O");
    else setWhoseTurnIsIt("X");

    // checking if we found a winner or not
    const [winnerFound, Winner] = checkWinner();

    if (winnerFound) {
      console.log("winner found: ", Winner);
      setResult(Winner);
    } else {
      let isTie = true;
      // check if its a tie
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameBoard[i][j] === "") {
            isTie = false;
            break;
          }
        }
      }
      if (isTie) setResult("tie");
    }
  };

  // function to check for winner after every turn
  const checkWinner = () => {
    // checking the first row
    if (
      gameBoard[0][0] &&
      gameBoard[0][0] === gameBoard[0][1] &&
      gameBoard[0][0] === gameBoard[0][2]
    )
      return [true, gameBoard[0][0]];
    // checking the middle row
    else if (
      gameBoard[1][0] &&
      gameBoard[1][0] === gameBoard[1][1] &&
      gameBoard[1][0] === gameBoard[1][2]
    )
      return [true, gameBoard[1][0]];
    // checking the last row
    else if (
      gameBoard[2][0] &&
      gameBoard[2][0] === gameBoard[2][1] &&
      gameBoard[2][0] === gameBoard[2][2]
    )
      return [true, gameBoard[2][0]];
    // checking the first column
    else if (
      gameBoard[0][0] &&
      gameBoard[0][0] === gameBoard[1][0] &&
      gameBoard[0][0] === gameBoard[2][0]
    )
      return [true, gameBoard[0][0]];
    //checking the middle column
    else if (
      gameBoard[0][1] &&
      gameBoard[0][1] === gameBoard[1][1] &&
      gameBoard[0][1] === gameBoard[2][1]
    )
      return [true, gameBoard[0][1]];
    // checking the last column
    else if (
      gameBoard[0][2] &&
      gameBoard[0][2] === gameBoard[1][2] &&
      gameBoard[0][2] === gameBoard[2][2]
    )
      return [true, gameBoard[0][2]];
    //checking the left diagonal
    else if (
      gameBoard[0][0] &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]
    )
      return [true, gameBoard[0][0]];
    //checking the right diagonal
    else if (
      gameBoard[0][2] &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[0][2] === gameBoard[2][0]
    )
      return [true, gameBoard[0][2]];
    return [false, ""];
  };

  //function to reset the game
  const resetGame = () => {
    setGameBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

    setWhoseTurnIsIt("X");
    setResult("");
  };

  return (
    <>
      {/* heading to display player turn */}
      <h2>
        {!result
          ? `${whoseTurnIsIt}'s Turn`
          : result === "tie"
          ? "It's a Tie"
          : `${result} won`}
      </h2>

      {/* game container */}
      <div className="game-container">
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[0][0] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(0, 0)}
        >
          {gameBoard[0][0]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[0][1] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(0, 1)}
        >
          {gameBoard[0][1]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[0][2] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(0, 2)}
        >
          {gameBoard[0][2]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[1][0] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(1, 0)}
        >
          {gameBoard[1][0]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[1][1] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(1, 1)}
        >
          {gameBoard[1][1]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[1][2] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(1, 2)}
        >
          {gameBoard[1][2]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[2][0] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(2, 0)}
        >
          {gameBoard[2][0]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[2][1] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(2, 1)}
        >
          {gameBoard[2][1]}
        </div>
        <div
          className="game-columns"
          style={{
            pointerEvents: !gameBoard[2][2] && !result ? "all" : "none",
          }}
          onClick={() => handleSettingMoveOnBoard(2, 2)}
        >
          {gameBoard[2][2]}
        </div>
      </div>

      {/* button to reset the game */}
      {result && (
        <button className="restart-btn" onClick={resetGame}>
          Restart
        </button>
      )}
    </>
  );
};

export default TicTacToe;
