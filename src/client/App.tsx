import "./App.css";

import { useEffect, useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetchGeneratedNames('Oliver', setMessage);
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {message ? <p>{message}</p> : <p>Loading...</p>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

// Might be returning HTML instead of json...
const fetchGeneratedNames = async (text: string, setResponse: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const response = await fetch("api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: text }),
    });
    const data = await response.json();
    // setResponse(data); If not json, use response.text above
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    setResponse(data.result);
  } catch(error: any) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}
export default App;
