import "./App.css";
import '../../dist/output.css';

import { useState } from "react";
import TopMenu from "./TopMenu";

function App() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');

  return (
    <div className="w-full">

      <TopMenu />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <div className="flex flex-col items-center w-full">
        <div className='text-3xl'>Intro & Search</div>
        <input className='border-4 rounded-lg border-stone-500 p-4 mt-2' type="text" value={input} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event?.target.value)} />
        <button className='hover:bg-cyan-200 py-2 px-4 my-2 border-4 border-cyan-200' onClick={async () => await fetchGeneratedNames(input, setMessage)}>
          Submit
        </button>
        <div className="card">
          {message ?
            <div className='max-w-sm text-left gptResponse'>
              {message}
            </div> :
            <p />}
        </div>
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
  } catch (error: any) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}
export default App;
