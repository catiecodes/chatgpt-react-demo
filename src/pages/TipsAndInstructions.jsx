import { Link } from "react-router-dom";
import "../App.css";

function TipsAndInstructions() {
  return (
    <div className="tips-wrapper">
      <h1>How to Use This App</h1>

      <section>
        <h2>JavaScript Buddy</h2>
        <p>
          This is your go-to assistant for anything related to learning
          JavaScript! The JavaScript Buddy can:
        </p>
        <ul>
          <li>Explain code and syntax in plain English</li>
          <li>Offer step-by-step guidance when you're stuck</li>
          <li>Give you practice exercises to try out</li>
          <li>
            Help you understand tricky concepts (like loops, objects, or array
            methods)
          </li>
        </ul>
        <p>You can:</p>
        <ul>
          <li>Copy and paste errors to from the console</li>
          <li>Ask for help in finding your syntax error</li>
          <li>Learn more about what a for loop is, and how it works</li>
          <li>Ask about the syntax of a function</li>
        </ul>
        <p>Tips:</p>
        <ul>
          <li>Be specific: do you need a 'for loop', or a 'for of' loop?</li>
          <li>Refine your question if you don't get a helpful answer</li>
          <li>Copy and paste your code into the chat box</li>
        </ul>
        <p>
          <strong>It won’t:</strong> write full solutions or fix your code for
          you — but it will guide you in figuring things out yourself.
        </p>
        <Link className="buddy-link js" to="/javascript-buddy">
          Open JavaScript Buddy
        </Link>
      </section>

      <section>
        <h2>AnnieCannons Buddy</h2>
        <p>
          This assistant is here to support you with your learning journey at
          AnnieCannons. You can ask it about:
        </p>
        <ul>
          <li>How to use platforms like Gusto, Slack, Notion, or Zoom</li>
          <li>Study tips or time management strategies</li>
          <li>Communication, peer collaboration, or class expectations</li>
          <li>Motivation, imposter syndrome, or burnout</li>
        </ul>
        <p>
          <strong>It won’t:</strong> answer coding or JavaScript questions — if
          you ask about code, it will gently send you to the JavaScript Buddy.
        </p>
        <Link className="buddy-link ac" to="/anniecannons-buddy">
          Open AnnieCannons Buddy
        </Link>
      </section>

      <section>
        <h2>Helpful Tips</h2>
        <ul>
          <li>
            Use simple, specific questions — like “what is a callback function?”
          </li>
          <li>
            If you're stuck, describe what you're trying to do, not just the
            code
          </li>
          <li>
            Try again if the answer isn’t quite right — this assistant improves
            with context!
          </li>
          <li>Be kind to yourself. Learning is hard. You're doing great.</li>
        </ul>
      </section>
    </div>
  );
}

export default TipsAndInstructions;
