import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/">POKEDEX</Link>
        {/* <Link to="/about">About</Link> */}
      </nav>
      <Outlet />
    </>
  );
}

export default App;
