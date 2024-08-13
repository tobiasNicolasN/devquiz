import style from "./App.module.css";
import { useState } from "react";

enum Language {
  spanish,
  english,
}

function App() {
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [score, _setScore] = useState<number>(0);
  const [_playing, setPlaying] = useState<boolean>(false);
  const [_response, _setResponse] = useState<boolean | undefined>(undefined)
  const lang = language === Language[0];

  if (language === undefined)
    return (
      <header>
        <h1 className={style.title}>DevQuiz Challenge</h1>
        <div className={style.selectLanguage}>
          <button className={style.languageButton} onClick={() => setLanguage(Language[0])}>Español</button>
          <button className={style.languageButton} onClick={() => setLanguage(Language[1])}>English</button>
        </div>
      </header>
    );

  return (
    <>
      <header>
        <h1 className={style.title}>DevQuiz Challenge</h1>
          <h2 className={style.score}>
            {lang ? "Puntuación:" : "Score:"} <span>{score}</span>
          </h2>
        <div></div>
      </header>
      <main>
        <div>
          <button onClick={() => (setPlaying(true))}>{lang ? "Comenzar" : "Start"}</button>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
