import { useState } from 'react'
import Home from './Home.jsx'
import Game from './Game.jsx'
import ScoreBoard from './ScoreBoard.jsx'
// import './App.css'

function App() {
  const [showPage, setShowPage] = useState("home")

  return (
    <div className='d-flex flex-column min-vh-100 overflow-x-hidden p-2 bg-danger-subtle'>
      <main className='flex-fill'>
        {showPage == 'home' && <Home setShowPage={setShowPage} />}
        {showPage == 'game' && <Game setShowPage={setShowPage} />}
        {showPage == 'score' && <ScoreBoard setShowPage={setShowPage} />}
      </main>

      <footer className='text-center p-2 m-0'>
          Designed and created by YcWong @2024
      </footer>

    </div>
  )
}

export default App
