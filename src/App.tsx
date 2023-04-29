import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getSuperheroName } from './api/generate';

function App() {
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    if (isClick) {
      //fetchGeneratedNames(text, setResponse);
      getSuperheroName(text).then((value: string | undefined) => {
        if (!value) {
          setResponse('Sorry, we were unable to process your request');
        } else {
          setResponse(value);
        }
      }).catch((error: any) => setResponse(error.message));
    }
  }, [isClick]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={async () => setIsClick(true)}> 
          Submit
        </button>
        <button onClick={async () => setIsClick(false)}> 
          Clear
        </button>
        <input type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}/>
      </div>
      {response ? <p>{response}</p> : <p>Click the button to fetch your pet's superhero names</p>}
    </>
  )
}
// The below doesn't make sense since this isn't a nest.js server app
const fetchGeneratedNames = async (text: string, setResponse: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const response = await fetch("/api/generate", {
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

export default App
