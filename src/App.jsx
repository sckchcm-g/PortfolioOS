import { useState } from 'react'
import Hello from './Hello'
import MainPage from './MainPage'
import './App.css'

function App() {
  const [launched, setLaunched] = useState(false)

  return (
    <div className="app-root">
      {!launched ? (
        <Hello onLaunch={() => setLaunched(true)} />
      ) : (
        <MainPage />
      )}
    </div>
  )
}

export default App
