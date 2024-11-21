import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Link to="/all-jobs">Go to All Jobs</Link>
      </div>
      <div>This is the welcome page</div>
    </>
  )
}

export default App
