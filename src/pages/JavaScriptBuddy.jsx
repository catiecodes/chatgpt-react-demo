import { useState } from "react";
import axios from "axios";
import "../App.css";
import ReactMarkdown from "react-markdown";
import systemPrompt from "../systemPromptJs.js";
import stockAnswers from "../stockAnswersJs.js";

function JavaScriptBuddy() {
  const [prompt, setPrompt] = useState({
    prompt: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_KEY;

  function getStockAnswer(userInput) {
    const input = userInput.toLowerCase();
    return stockAnswers.find(({ keywords }) =>
      keywords.some((kw) => input.includes(kw))
    )?.response;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrompt((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const userQuestion = prompt.prompt.toLowerCase();

    // 👇 Custom stock answer check
    const stockReply = getStockAnswer(prompt.prompt);
    if (stockReply) {
      setResponse(stockReply);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: prompt.prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResponse(
        res.data.choices[0].message.content
          // Fix list formatting
          .replace(/-\s*`([^`]+)`\s*\n\s*:/g, "- `$1`:")
          // Join broken lines unless they are inside code blocks
          .replace(/([^\n])\n(?=[^\n`])/g, "$1 ")
          // Remove newline before inline code
          .replace(/\n(?=\s*`)/g, "")
          // Remove bad newline after inline code
          .replace(/`(\w+)`\n/g, "`$1` ")
          // Normalize properly formatted code blocks
          .replace(/```(?:\s*javascript)?\n/g, "```js\n")
          // ⚠️ Remove accidental inline code blocks like: Here's code:```code```
          .replace(/([a-zA-Z0-9.,:!?])```(.*?)```/gs, "$1\n```js\n$2\n```")
          // Clean up lingering "js" as text
          .replace(/\n?js\s*/g, "")
      );
      // setPrompt({
      //   prompt: "",
      // });
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   console.log(prompt)
  // }, [prompt])

  return (
    <div className="page-wrapper">
      <h1>Your JavaScript Coding Buddy</h1>
      <div className="li-wrapper">
        <p>
          Your buddy is here to help with your coding journey. Things we can do
          together:
        </p>
        <ul>
          <li>Understand code</li>
          <li>Learn syntax</li>
          <li>Debug code</li>
          <li>Get more practice exercises for a specific skill</li>
          <li>Help with pseudocoding</li>
          <li>Visual Studio Code</li>
          <li>GitHub</li>
        </ul>
      </div>
      <form action="#">
        <div className="label-div-wrapper">
          <label htmlFor="prompt">What can I help you with?</label>
          <textarea
            id="prompt"
            name="prompt"
            rows="5"
            cols="33"
            value={prompt.prompt}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} type="submit" id="submit">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      {response ? (
        <div className="response-wrapper">
          <h3>Response</h3>
          <div className="response">
            <ReactMarkdown
              components={{
                li: ({ children }) => (
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.6" }}>
                    {children}
                  </li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#62dafc", textDecoration: "underline" }}
                  >
                    {children}
                  </a>
                ),            
                code({ inline, children, className }) {
                  const codeString = Array.isArray(children)
                    ? children.join("")
                    : String(children).trim();

                  if (inline) {
                    return (
                      // <span style={{ display: "inline" }}>
                      <code
                        style={{
                          backgroundColor: "#222",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontFamily: "Fira Code, monospace",
                          color: "#62dafc",
                          fontSize: "0.95rem",
                        }}
                      >
                        {codeString}
                      </code>
                      // </span>
                    );
                  }

                  return (
                    <pre
                      style={{
                        backgroundColor: "#111",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        overflowX: "auto",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <code
                        style={{
                          fontFamily: "Fira Code, monospace",
                          color: "#62dafc",
                        }}
                      >
                        {codeString}
                      </code>
                    </pre>
                  );
                },
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default JavaScriptBuddy;
