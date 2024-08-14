import style from "./App.module.css";
import { useState } from "react";
import QuizContent from "./components/QuizContent";
import TimeBar from "./components/TimeBar";

enum Language {
  spanish,
  english,
}

function App() {
  // Estado para manejo del lenguaje
  const [language, setLanguage] = useState<string | undefined>(undefined);
  // Estado para manejo de la puntuación
  const [score, setScore] = useState<number>(0);
  // Estado para manejo de las respuestas dadas por el jugador
  const [response, setResponse] = useState<boolean | undefined>(undefined);
  // Estado para manejo de puntos extra
  const [extraPoints, setExtraPoints] = useState<boolean>(false);
  // Estado para manejo de rondas
  const [round, setRound] = useState<number>(0);
  const [timer, setTimer] = useState<number>(30);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);

  const lang = language === Language[0];

  // Se rendizan los buttons de seleccion de idioma cuando este es undefined
  if (language === undefined)
    return (
      <header>
        <h1 className={style.title}>
          Dev<span>Quiz</span> Challenge
        </h1>
        <div className={style.selectLanguage}>
          <button
            className={style.languageButton}
            onClick={() => setLanguage(Language[0])}
          >
            Comenzar
          </button>
          <button
            className={style.languageButton}
            onClick={() => setLanguage(Language[1])}
          >
            Start
          </button>
        </div>
      </header>
    );

  const confirm = () => {
    setShowCorrect(true);
    response === true ? (setScore(score + 100 + timer), setExtraPoints(true)) : "";
    setTimeout(() => {
      setExtraPoints(false);
    }, 1500);
    setResponse(undefined);
    setTimeout(() => {
      setShowCorrect(false);
      setRound(round + 1);
      setTimer(30);
    }, 5000);
  };

  return (
    <>
      <header>
        <h1 className={style.title}>
          Dev<span>Quiz</span> Challenge
        </h1>
        <h2 className={style.score}>
          {lang ? "Puntuación:" : "Score:"} <span>{score} </span>
          <span>
            {extraPoints ? `+${100 + timer}` : ""}
          </span>
        </h2>
      </header>
      <main>
        <QuizContent round={round} lang={lang} setResponse={setResponse} />
        <button
          disabled={showCorrect}
          onClick={() => confirm()}
          className={style.confirmButton}
        >
          {lang ? "Confirmar y Continuar" : "Confirm and Continue"}
        </button>
        <TimeBar
          showCorrect={showCorrect}
          duration={timer}
          setTimer={setTimer}
          onComplete={() => confirm()}
        />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
