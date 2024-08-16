import style from "./App.module.css";
import { useState } from "react";
import QuizContent from "./components/QuizContent";
import TimeBar from "./components/TimeBar";
import { GameState, Language } from "./interfaces/types";
import LangButtons from "./components/LangButtons";
import Form from "./components/Form";

function App() {
  const [game, setGame] = useState<string>(GameState[0]);
  const [language, setLanguage] = useState<string>(Language[0]);
  const [score, setScore] = useState<number>(0);
  const [response, setResponse] = useState<boolean | undefined>(undefined);
  const [extraPoints, setExtraPoints] = useState<number>(0);
  const [showExtraPoints, setShowExtraPoints] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [round, setRound] = useState<number>(1);
  const [timer, setTimer] = useState<number>(30);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);

  const lang = language === Language[0];

  const confirm = () => {
    setShowCorrect(true);
    setTimer(10);
    const newExtraPoints = 100 + timer;
    setExtraPoints(newExtraPoints);

    if (response) {
      setVisible(true);
      setShowExtraPoints(true);
      setScore((prevScore) => prevScore + newExtraPoints);
    }

    setResponse(undefined);
  };

  const nextQuestion = () => {
    setTimer(30);
    setVisible(false);
    setShowCorrect(false);

    setTimeout(() => {
      setShowExtraPoints(false);
    }, 300);

    setTimeout(() => {
      setRound((prevRound) => prevRound + 1);
    }, 500);
  };

  const endQuiz = () => {
    setGame(GameState[2]);
  };

  if (timer <= 0) nextQuestion();

  if (round >= 8) setRound(0), setGame(GameState[2]);

  // Se rendizan los buttons de seleccion de idioma cuando este es undefined
  if (game === GameState[0])
    return (
      <>
        <header>
          <h1 className={style.title}>
            Dev<span>Quiz</span> Challenge
          </h1>
          <main>
            <p className={style.textIntro}>
              {lang
                ? "Poné a prueba tus conocimientos en desarrollo web con este quiz interactivo. Responde preguntas sobre TypeScript, JavaScript, React, HTML, CSS y más. ¡Desafiá tu mente y mejorá tus habilidades mientras te divertís!"
                : "Test your web development knowledge with this interactive quiz. Answer questions on TypeScript, JavaScript, React, HTML, CSS, and more. Challenge your mind and improve your skills while having fun!"}
            </p>
            <LangButtons lang={lang} setLanguage={setLanguage} />
            <button
              className={style.startButton}
              onClick={() => setGame(GameState[1])}
            >
              {lang ? "Comenzar" : "Start"}
            </button>
          </main>
        </header>
      </>
    );

  if (game === GameState[1])
    return (
      <>
        <header>
          <h1 className={style.title}>
            Dev<span>Quiz</span> Challenge
          </h1>
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
        </header>
        <main>
          <QuizContent
            round={round}
            lang={lang}
            setResponse={setResponse}
            showCorrect={showCorrect}
          />

          {showCorrect ? (
            round === 7 ? (
              <button className={style.confirmButton} onClick={() => endQuiz()}>
                {lang ? "Finalizar Quiz" : "Finish Quiz"}
              </button>
            ) : (
              <button
                className={style.confirmButton}
                onClick={() => nextQuestion()}
              >
                {lang ? "Siguiente Pregunta" : "Next Question"}
              </button>
            )
          ) : (
            <button onClick={() => confirm()} className={style.confirmButton}>
              {lang ? "Confirmar y Continuar" : "Confirm and Continue"}
            </button>
          )}
          <TimeBar
            showCorrect={showCorrect}
            duration={timer}
            setTimer={setTimer}
            confirm={() => confirm()}
            nextQuestion={() => nextQuestion()}
          />
        </main>
      </>
    );

  if (game === GameState[2])
    return (
      <>
        <header>
          <h1 className={style.title}>
            Dev<span>Quiz</span> Challenge
          </h1>
        </header>
        <main>
          <Form lang={lang} score={score} />
        </main>
      </>
    );
}

export default App;
