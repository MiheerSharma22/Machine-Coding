import "./App.css";
import { Routes, Route } from "react-router-dom";
import TicTacToe from "./components/TicTacToe";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="tic-tac-toe" element={<TicTacToe />} />
    </Routes>
  );
};

export default App;
