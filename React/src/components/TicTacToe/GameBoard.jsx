import { useState } from "react";
import "./index.css";

// eslint-disable-next-line react/prop-types
const GameBoard = ({ n, setGenerateBoard }) => {
  // to set the dimension of the game board
  const dimensionOfBoard = Number(n);

  // to maintain the number of moves already made
  const [numberOfMovesMade, setNumberOfMovesMade] = useState(1);

  // state to determine whose turn is it, is it X's turn or O's
  const [whoseTurnIsIt, setWhoseTurnIsIt] = useState("X");

  // state to store the result
  const [result, setResult] = useState("");

  // state to maintain a logical representation of the game board to check for winner and change turns
  const [gameBoard, setGameBaord] = useState(
    new Array(dimensionOfBoard)
      .fill("")
      .map(() => new Array(dimensionOfBoard).fill(""))
  );

  // handler function to set the current clicked block of the board with X or O
  const handleSettingCurrentBlockOfBoard = (
    currentClickedRowIndex,
    currentClickedColumnIndex
  ) => {
    // updating the board with current move
    const updatedGameBoard = [...gameBoard];
    updatedGameBoard[currentClickedRowIndex][currentClickedColumnIndex] =
      whoseTurnIsIt;
    setGameBaord(updatedGameBoard);

    // changing the player turn
    whoseTurnIsIt === "X" ? setWhoseTurnIsIt("O") : setWhoseTurnIsIt("X");

    // incresing the number of moves played already
    setNumberOfMovesMade(numberOfMovesMade + 1);

    // checking for the winner after at least (2*n)-1 moves are made
    if (numberOfMovesMade >= 2 * dimensionOfBoard - 1) {
      const [winnerFound, Winner] = checkWinner(
        currentClickedRowIndex,
        currentClickedColumnIndex
      );

      // if the board is filled completely and we have no winner, set result to tie
      if (
        numberOfMovesMade === dimensionOfBoard * dimensionOfBoard &&
        !winnerFound
      ) {
        setResult("tie");
      }

      if (winnerFound) setResult(Winner);
    }
  };

  const checkWinner = (currentRowIndex, currentColIndex) => {
    let col, row;

    // checking the current row values
    for (col = 1; col < dimensionOfBoard; col++) {
      if (
        !gameBoard[currentRowIndex][col] ||
        gameBoard[currentRowIndex][col] !== gameBoard[currentRowIndex][col - 1]
      ) {
        break;
      }
    }
    // if col === dimensionOfBoard, means we traversed the whole row successfully and it is a winning condition met
    if (col === dimensionOfBoard) return [true, gameBoard[currentRowIndex][0]];

    // if not found in row, checking the current column
    for (row = 1; row < dimensionOfBoard; row++) {
      if (
        !gameBoard[row][currentColIndex] ||
        gameBoard[row][currentColIndex] !== gameBoard[row - 1][currentColIndex]
      ) {
        break;
      }
    }
    // if row === dimensionOfBoard, means we traversed the whole column successfully and it is a winning condition met
    if (row === dimensionOfBoard) return [true, gameBoard[0][currentColIndex]];

    // if not found in column, checking the left diagonal, checking left diagonal only if the current clicked rowIndex and colIndex are equal
    if (currentColIndex === currentRowIndex) {
      row = 1;
      for (; row < dimensionOfBoard; row++) {
        if (
          !gameBoard[row][row] ||
          gameBoard[row][row] !== gameBoard[row - 1][row - 1]
        ) {
          break;
        }
      }
      if (row === dimensionOfBoard) return [true, gameBoard[0][0]];
    }

    // checking the right diagonal
    row = 1;
    col = dimensionOfBoard - 2;
    for (; row < dimensionOfBoard, col >= 0; row++, col--) {
      if (
        !gameBoard[row][col] ||
        gameBoard[row][col] !== gameBoard[row - 1][col + 1]
      ) {
        break;
      }
    }
    if (row === dimensionOfBoard && col === -1)
      return [true, gameBoard[0][dimensionOfBoard - 1]];

    // if no winning condition met, return false
    return [false, ""];
  };

  return (
    <>
      {/* heading to display player turn or the result*/}
      <h2>
        {!result
          ? `${whoseTurnIsIt}'s Turn`
          : result === "tie"
          ? "It's a Tie"
          : `${result} won`}
      </h2>

      {/* game board container */}
      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: `repeat(${dimensionOfBoard}, 1fr)`,
          gridTemplateRows: `repeat(${dimensionOfBoard}, 1fr)`,
          height: `${dimensionOfBoard}00px`,
          aspectRatio: "1/1",
        }}
      >
        {/* mapping to generate each column */}
        {gameBoard.map((boardRow, rowIndex) => {
          return boardRow.map((rowCol, colIndex) => {
            return (
              <div
                className="game-columns"
                key={`${rowIndex}${colIndex}`}
                style={{
                  border: "1px solid white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents:
                    gameBoard[rowIndex][colIndex] === "" && !result
                      ? "all"
                      : "none",
                  cursor:
                    !gameBoard[rowIndex][colIndex] && !result
                      ? "pointer"
                      : "default",
                }}
                // on clicking current block => setting the X or O in the block and changing player's turn
                onClick={() =>
                  handleSettingCurrentBlockOfBoard(rowIndex, colIndex)
                }
              >
                {gameBoard[rowIndex][colIndex]}
              </div>
            );
          });
        })}
      </div>

      {/* restart button */}
      {result && (
        <button className="restart-btn" onClick={() => setGenerateBoard(false)}>
          Restart
        </button>
      )}
    </>
  );
};

export default GameBoard;
