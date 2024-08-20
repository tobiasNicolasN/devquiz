import { GameState } from '../interfaces/types'
import style from '../styles/Header.module.css'
import Spinner from './Spinner'

export interface IHeader {
    lang: boolean
    game: string
    loadingData: boolean
    timesPlayed: number
    round: number
    visible: boolean
    showExtraPoints: boolean
    score: number
    extraPoints: number
}


function Header({lang, game, loadingData, timesPlayed, round, visible, showExtraPoints, score, extraPoints}: IHeader) {
  return (
    <header>
          <h1 className={style.title}>
            Dev<span>Quiz</span> Challenge
          </h1>
          {(game === GameState[0] || game === GameState[2]) && (
            <div style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>
              <h2 className={style.score}>
              {lang
                ? `Total de partidas jugadas: ${loadingData ? '' : timesPlayed}`
                : `Total games played: ${loadingData ? '' : timesPlayed}`}
            </h2>
              {loadingData && <Spinner width='0.8rem'/>}
            </div>
          )}

          {game === GameState[1] && (
            <h2 className={style.score}>
            {round}/7 {lang ? "Puntuación: " : "Score: "}
            <span
              className={`${style.extraPoints} ${
                visible ? style.showExtraPoints : ""
              }`}
            >
              {showExtraPoints ? `+ ${extraPoints}` : ""}
            </span>
            <span>{score}</span>
          </h2>
          )}
        </header>
  )
}

export default Header