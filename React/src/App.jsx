import "./App.css";
import { Routes, Route } from "react-router-dom";
import TicTacToe from "./components/TicTacToe";
import Toast from "./components/Toast";
import Homepage from "./components/Homepage";
import DebouncedSearch from "./components/DebouncedSearch";
import Timer from "./components/CountdownTimer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="tic-tac-toe" element={<TicTacToe />} />
      <Route path="/toast" element={<Toast />} />
      <Route path="/search" element={<DebouncedSearch />} />
      <Route path="/countdown-timer" element={<Timer />} />
    </Routes>
  );
};

export default App;
