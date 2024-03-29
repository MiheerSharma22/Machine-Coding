import { useState } from "react";
import GameBoard from "./GameBoard";
import "./index.css";

const Index = () => {
  const [n, setN] = useState(3);
  const [generateBoard, setGenerateBoard] = useState(false);

  return (
    <>
      {/* to get the value of n from user */}
      {!generateBoard && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setGenerateBoard(true);
          }}
        >
          <label htmlFor="n">
            <span>Enter N:</span>
            <input
              type="number"
              id="n"
              value={n}
              name="n"
              min={3}
              required
              onChange={(e) => {
                setN(e.target.value);
              }}
            />
          </label>

          <button type="submit">Generate Board</button>
        </form>
      )}

      {/*  generating the board for game */}
      {generateBoard && <GameBoard n={n} setGenerateBoard={setGenerateBoard} />}
    </>
  );
};

export default Index;
