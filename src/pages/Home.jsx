import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="page-wrapper">
      <h3>
        Welcome!<br/> This is a trauma-informed space where you can get support with
        JavaScript, as well as asking AnnieCannons related questions
      </h3>
      <div className="buttons-wrapper">
        <Link to="/javascript-buddy" className="journey js-journey">
          I have a JavaScript related question
        </Link>
        <Link to="/anniecannons-buddy" className="journey ac-journey">
          I have an AnnieCannons related question
        </Link>
      </div>
    </div>
  );
}

export default Home;
