import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import JavaScriptBuddy from './pages/JavaScriptBuddy';
import AnnieCannonsBuddy from './pages/AnnieCannonsBuddy';


function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/javascript-buddy">JavaScript Buddy</Link>
          </li>
          <li>
            <Link to="/anniecannons-buddy">AnnieCannons Buddy</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/javascript-buddy" element={<JavaScriptBuddy />} />
        <Route path="/anniecannons-buddy" element={<AnnieCannonsBuddy />} />
      </Routes>
    </div>
  );
}

export default App;
