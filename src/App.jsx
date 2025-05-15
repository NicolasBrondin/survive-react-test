
import { Menu } from './components/Menu'
import { Game } from './components/Game'
import { GameOver } from './components/GameOver'
import { use, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGameState } from '@/stores/GameState';
function App() {

  const version = '0.0.1';
  const [status, setStatus] = useState('menu');
  const {score} = useGameState();

  const [leaderboard, setLeaderboard] = useState([
    { name: 'Player 1', score: 10 },
    { name: 'Player 2', score: 5 },
    { name: 'Player 3', score: 2 }
  ]);

  function handleLeaderboardEntry(name) {
    const newEntry = { name, score: score};
    const newLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(newLeaderboard);
  }


  return (
    <BrowserRouter basename="/survive-react-test/">
      <Routes>
        <Route path="/" element={<Menu version={version} />} />
        <Route path="/game" element={<Game/>} />
        <Route path="/gameover" element={<GameOver leaderboard={leaderboard} onLeaderboardEntry={handleLeaderboardEntry}/>} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
