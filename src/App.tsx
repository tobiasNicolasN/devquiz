import style from './App.module.css'
import {useState} from 'react'

function App() {
  const [score, _setScore] = useState<number>(0)
  
  return (
    <>
    <header>
      <h1 className={style.title}>DevQuiz Challenge</h1>
      <h2>Puntuación: <span>{score}</span></h2>
      
      <div></div>
    </header>

    </>
  )
}
export default App