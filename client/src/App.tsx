import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

switch(process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://roy-glick.com:5000';
    break;
  case 'development':
    axios.defaults.baseURL = 'http://localhost:5001';
    break;
}

function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState('s')

  useEffect(() => {

    axios.get('/api/time')
    .then((res) => {
      console.log(res.data)
      setTime(res.data.time)
      })
  }, []);

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
      <h1>Vite + React time is {time}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
