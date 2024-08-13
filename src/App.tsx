import style from "./App.module.css";
import { useState } from "react";
import QuizContent from "./components/QuizContent";
import TimeBar from "./components/TimeBar";

enum Language {
  spanish,
  english,
}

function App() {
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [score, setScore] = useState<number>(0);
  const [response, setResponse] = useState<boolean | undefined>(undefined)
  const [extraPoints, setExtraPoints] = useState<boolean>(false)
  const lang = language === Language[0];

  // Se rendizan los buttons de seleccion de idioma cuando este es undefined
  if (language === undefined)
    return (
      <header>
        <h1 className={style.title}>Dev<span>Quiz</span> Challenge</h1>
        <div className={style.selectLanguage}>
          <button className={style.languageButton} onClick={() => setLanguage(Language[0])}>Comenzar</button>
          <button className={style.languageButton} onClick={() => setLanguage(Language[1])}>Start</button>
        </div>
      </header>
    );

    const confirm = () => {
      response === true ? setScore(score + 100) : ""
      setExtraPoints(true)
      setTimeout(() => {
        setExtraPoints(false)
      }, 1500);
    }

  return (
    <>
      <header>
        <h1 className={style.title}>Dev<span>Quiz</span>  Challenge</h1>
          <h2 className={style.score}>
            {lang ? "Puntuación:" : "Score:"} <span>{score} </span><span>{extraPoints ? "+100" : ""}</span>
          </h2>
      </header>
      <main>
        <QuizContent lang={lang} setResponse={setResponse}/>
        <button onClick={() => confirm()} className={style.confirmButton}>{lang ? "Confirmar y Continuar" : "Confirm and Continue"}</button>
          <TimeBar duration={30} onComplete={() => console.log("hola")}/>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
