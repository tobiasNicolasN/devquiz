import style from "./App.module.css";
import { useEffect, useState } from "react";
import QuizContent from "./components/QuizContent";
import TimeBar from "./components/TimeBar";
import { GameState, IScores, Language } from "./interfaces/types";
import LangButtons from "./components/LangButtons";
import Form from "./components/Form";
import { getQuestions, getResponses, getScores } from "./api/api";
import { useData } from "./context/DataContext";
import LeaderBoard from "./components/LeaderBoard";
import Button from "./components/Button";
import Header from "./components/Header";
import Spinner from "./components/Spinner";

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
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [scores, setScores] = useState<IScores[]>([]);
  const [sended, setSended] = useState<boolean>(false);
  const { setQuestions, setResponses } = useData();
  const lang = language === Language[0];

  const loadData = async () => {
    const questionsRes = await getQuestions();
    const responsesRes = await getResponses();
    const scoresRes = await getScores();
    setScores(scoresRes);
    setResponses(responsesRes);
    setQuestions(questionsRes);
    setLoadingData(false);
  };

  useEffect(() => {
    loadData();
  }, []);

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

  // Finaliza el game cuando se pasa la ronda final
  if (round >= 8) setRound(0), setGame(GameState[2]);

  // Inicio
  if (game === GameState[0])
    return (
      <>
        <Header
          game={game}
          loadingData={loadingData}
          lang={lang}
          timesPlayed={scores.length}
          extraPoints={extraPoints}
          round={round}
          score={score}
          showExtraPoints={showExtraPoints}
          visible={visible}
        />
        <main>
          <p className={style.textIntro}>
            {lang
              ? "Poné a prueba tus conocimientos en desarrollo web con este quiz interactivo. Responde preguntas sobre TypeScript, JavaScript, React, HTML, CSS y más. ¡Desafiá tu mente y mejorá tus habilidades mientras te divertís!"
              : "Test your web development knowledge with this interactive quiz. Answer questions on TypeScript, JavaScript, React, HTML, CSS, and more. Challenge your mind and improve your skills while having fun!"}
          </p>
          <LangButtons lang={lang} setLanguage={setLanguage} />
          <div className={style.buttonContainer}>
            <Button
              disabled={loadingData}
              onClick={() => setGame(GameState[1])}
            >
              {loadingData ? (
                <Spinner width={"0.8rem"} />
              ) : lang ? (
                "Comenzar"
              ) : (
                "Start"
              )}
            </Button>
          </div>
        </main>
      </>
    );

  // In game
  if (game === GameState[1])
    return (
      <>
        <Header
          game={game}
          loadingData={loadingData}
          lang={lang}
          timesPlayed={scores.length}
          extraPoints={extraPoints}
          round={round}
          score={score}
          showExtraPoints={showExtraPoints}
          visible={visible}
        />
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
            <button className={style.confirmButton} onClick={() => confirm()}>
              {lang ? "Confirmar y Continuar" : "Confirm and Continue"}
            </button>
          )}
          <TimeBar
            showCorrect={showCorrect}
            duration={timer}
            setTimer={setTimer}
            confirm={confirm}
            nextQuestion={nextQuestion}
          />
        </main>
      </>
    );

  // Despues del game
  if (game === GameState[2])
    return (
      <>
        <Header
          game={game}
          loadingData={loadingData}
          lang={lang}
          timesPlayed={scores.length}
          extraPoints={extraPoints}
          round={round}
          score={score}
          showExtraPoints={showExtraPoints}
          visible={visible}
        />
        <main>
          {sended ? (
            <LeaderBoard scores={scores} setScores={setScores} lang={lang} />
          ) : (
            <Form lang={lang} score={score} setSended={setSended} />
          )}
        </main>
      </>
    );
}

export default App;
