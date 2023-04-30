import "./App.css";

import { useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');

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
      <h1>Welcome Ariel!</h1>
      <h2>Please type in a cuisine</h2>
      <input type="text" value={input} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event?.target.value)} />
      <div className="card">
        <button onClick={async () => await fetchGeneratedNames(input, setMessage)}>
          Submit
        </button>
        {message ?
        <div className='gptResponse'>
            {message}
        </div> :
        <p/>}
      </div>
    </div>
  );
}

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
