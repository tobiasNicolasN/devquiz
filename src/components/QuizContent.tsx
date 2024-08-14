import { IQuiz, IQuizContentProps } from "../interfaces/types";
import style from "../styles/QuizContent.module.css";
import dataEs from "../../data.es.json";
import dataEn from "../../data.en.json";
import { useEffect, useState } from "react";

function QuizContent({
  lang,
  setResponse,
  round,
  showCorrect,
}: IQuizContentProps) {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [questionsUsed, setQuestionsUsed] = useState<number[]>([]);
  const [question, setQuestion] = useState<number>();
  // const [changeAnimation, setChangeAnimation] = useState<boolean>(false);
  const data: IQuiz[] = lang ? dataEs : dataEn;

  // Función para generar un número aleatorio dentro del rango dado
  const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max + 1);
  };

  // Setea una pregunta random
  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = randomNumber(data.length - 1);
      setQuestion(randomIndex);
    }
  }, [data]);

  // Cuando se responde, setea una pregunta random que no haya sido utilizada previamente
  useEffect(() => {
    let i: number = randomNumber(data.length - 1);
    while (questionsUsed.includes(i)) {
      i = randomNumber(data.length - 1);
    }
    setQuestionsUsed((prevQuestionsUsed) => [...prevQuestionsUsed, i]);
    setQuestion(i);
    setSelected(undefined);
  }, [round]);

  return (
    <div className={style.quizContainer}>
      {question !== undefined ? (
        <>
          <p className={style.question}>{data[question].question}</p>
          <div className={style.responsesContainer}>
            {data[question].responses.map((res, index) => {
              return (
                <div
                  className={`${style.responseCard} ${
                    selected === index ? style.selected : ""
                  } ${
                    showCorrect === true
                      ? res.correct === true
                        ? style.responseTrue
                        : style.responseFalse
                      : ""
                  }`}
                  onClick={() => {
                    setSelected(index), setResponse(res.correct);
                  }}
                  key={index}
                >
                  <p className={style.response}>{res.response}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default QuizContent;
