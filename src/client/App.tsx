import "./App.css";
import '../../dist/output.css';

import { useState } from "react";
import TopMenu from "./TopMenu";

function App() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');

  // Justify items stretch not working yet FYI
  return (
    <div className="w-full flex flex-col bg-gray-200 items-center justify-center">

      {/* <TopMenu /> */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 my-6 w-448 max-w-md">
        <span className='text-3xl font-semibold'>Welcome to CHEFT</span>
        <span className='text-xl px-2'>Search a cuisine type to get recipe ideas</span>
        <input className='rounded-md py-1 px-3 border border-gray-200' type="text" placeholder="Search a cuisine type" value={input} onChange={
          (event: React.ChangeEvent<HTMLInputElement>) => setInput(event?.target.value)
        } />
        <button className='text-sm font-semibold m-2 rounded-lg bg-indigo-500 text-white' onClick={async () => await fetchGeneratedNames(input, setMessage)}>
          Get Recipes
        </button>
      </div>
      {message ?
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 mb-6 w-448 max-w-md">
        <span className='text-xl font-semibold'> Recipes </span>
        <span className='font-light'> Here are a few recipes based on "{input}" </span>
        <div className='max-w-sm text-left gptResponse'>
          {message}
        </div>
      </div> :
      <p/>}
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
