import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="page-wrapper">
      <section className="welcome-section">
        <h2>Welcome</h2>
        <p>
          This is a <strong>trauma-informed space</strong> where you can get
          support with your learning journey.
        </p>
        <p>
          You can ask questions about JavaScript or get help with things
          related to AnnieCannons, including emotional support, using our tools, or navigating the
          program.
        </p>
        <p>
          We’re here to support you with patience, clarity, and compassion — you
          don’t have to figure things out alone.
        </p>
      </section>
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
