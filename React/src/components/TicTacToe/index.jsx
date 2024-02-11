import { useState } from "react";
import GameBoard from "./GameBoard";

const Index = () => {
  const [n, setN] = useState(3);
  const [generateBoard, setGenerateBoard] = useState(false);

  return (
    <>
      {/* to get the value of n from user */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setGenerateBoard(true);
        }}
      >
        <label htmlFor="n">
          <input
            type="number"
            id="n"
            value={n}
            name="n"
            min={3}
            required
            onChange={(e) => setN(e.target.value)}
          />
        </label>

        <button type="submit">Generate Board</button>
      </form>

      {/*  generating the board for game */}
      {generateBoard && <GameBoard n={n} />}
    </>
  );
};

export default Index;
