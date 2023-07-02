import { useEffect, useState } from 'react'
import StartUp from './components/StartUp.tsx';
import DeckBuilder from './components/DeckBuilder.tsx';

function App() {
  const [startUp, setStartUp] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setStartUp(true)
    }, 4000)
  }, [])

  if (!startUp) return <StartUp />

  return (
    <DeckBuilder />
  )
}

export default App;