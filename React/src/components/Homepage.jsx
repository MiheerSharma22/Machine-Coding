import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
      <Link to="/toast">Toast</Link>
      <Link to="/search">Search</Link>
      <Link to="/countdown-timer">Timer</Link>
    </div>
  );
};

export default Homepage;
