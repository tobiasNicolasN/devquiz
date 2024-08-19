import { useData } from "../context/DataContext";
import { IQuestions, IQuizContentProps } from "../interfaces/types";
import style from "../styles/QuizContent.module.css";
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
  const [questionsES, setQuestionsES] = useState<IQuestions[]>([]);
  const [questionsEN, setQuestionsEN] = useState<IQuestions[]>([]);
  const { questions, responses } = useData();
  const data: IQuestions[] = lang ? questionsES : questionsEN;

  // Función para generar un número aleatorio dentro del rango dado
  const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max + 1);
  };

  // Filtra las preguntas en ingles y español
  const filterData = (data: IQuestions[]) => {
    data.map((question) => {
      question.language === "es"
        ? setQuestionsES((prevQuestionsES) => [...prevQuestionsES, question])
        : setQuestionsEN((prevQuestionsEN) => [...prevQuestionsEN, question]);
    });
  };

  useEffect(() => {
    filterData(questions);
  }, []);

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
          <p className={style.question}>{data[question].question_text}</p>
          <div className={style.responsesContainer}>
            {responses.map((res, index) => {
              if (res.question_id === data[question].id)
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
                    <p className={style.response}>{res.response_text}</p>
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
