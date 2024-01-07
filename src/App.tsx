import { useState } from 'react'
import './App.css'
import KanbanBoard from './Components/KanbanBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <KanbanBoard />
    </>
  )
}

export default App
