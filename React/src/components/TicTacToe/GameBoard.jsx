import { useState } from "react";

const GameBoard = ({ n }) => {
  const dimensionOfBoard = Number(n);
  const [whoseTurnIsIt, setWhoseTurnIsIt] = useState("X");

  const [result, setResult] = useState("");

  const [gameBoard, setGameBaord] = useState(
    new Array(dimensionOfBoard)
      .fill("")
      .map(() => new Array(dimensionOfBoard).fill(""))
  );

  console.log(gameBoard);

  return (
    <div
      style={{
        marginTop: "3rem",
        display: "grid",
        gridTemplateColumns: `repeat(${dimensionOfBoard}, 1fr)`,
        gridTemplateRows: `repeat(${dimensionOfBoard}, 1fr)`,
        height: `${dimensionOfBoard}00px`,
        aspectRatio: "1/1",
      }}
    >
      {/* mapping to generate columns */}
      {gameBoard.map((boardRow) => {
        return boardRow.map((rowCol) => {
          return (
            <div
              key={`${boardRow}${rowCol}`}
              style={{ border: "1px solid white" }}
            >
              {boardRow}
              {rowCol}
            </div>
          );
        });
      })}
    </div>
  );
};

export default GameBoard;
