import { useState } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {
  const [prompt, setPrompt] = useState({
    prompt: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrompt((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    // if (userInput.includes("addEventListner")) {
    //   setResponse(
    //     "This is a known React error that happens when server-rendered HTML doesn’t match the client. Try using useEffect instead of useLayoutEffect, or check that your DOM isn’t changing between server and client render."
    //   );
    //   return;
    // }

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "Explain this for a eighth-grade student with clear line breaks between ideas. Do not write any code unless you are shoing the syntax of something, just explain in plain English. Do not tell the user how to fix the code. If you need to show syntax, wrap it in triple backticks like a Markdown code block. Do not include explanation in the same block. All prompts and responses will be JavaScript. If the user asks something that is not about code, kindly remind them that you are a coding buddy.",
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
      setResponse(res.data.choices[0].message.content); // Optional: show the response
      setPrompt({
        prompt: "",
      });
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
                code({ inline, children, ...props }) {
                  return inline ? (
                    <code
                      style={{
                        backgroundColor: "#222",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontFamily: "Fira Code, monospace",
                        color: "#62dafc",
                      }}
                    >
                      {children}
                    </code>
                  ) : (
                    <pre
                      style={{
                        backgroundColor: "#111",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        overflowX: "auto",
                      }}
                    >
                      <code>{children}</code>
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

export default App;
