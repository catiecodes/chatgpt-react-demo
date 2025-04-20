import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import JavaScriptBuddy from "./pages/JavaScriptBuddy";
import AnnieCannonsBuddy from "./pages/AnnieCannonsBuddy";
import TipsAndInstructions from "./pages/TipsAndInstructions";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <button
            className="hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/javascript-buddy" onClick={() => setMenuOpen(false)}>
                JavaScript Buddy
              </NavLink>
            </li>
            <li>
              <NavLink to="/anniecannons-buddy" onClick={() => setMenuOpen(false)}>
                AnnieCannons Buddy
              </NavLink>
            </li>
            <li>
              <NavLink to="/tips-and-instructions" onClick={() => setMenuOpen(false)}>
              Tips + Instructions
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/javascript-buddy" element={<JavaScriptBuddy />} />
        <Route path="/anniecannons-buddy" element={<AnnieCannonsBuddy />} />
        <Route path="/tips-and-instructions" element={<TipsAndInstructions />} />
      </Routes>
    </div>
  );
}

export default App;
