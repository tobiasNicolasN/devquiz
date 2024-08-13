export interface IQuiz {
  question: string;
  responses: Response[];
}

export interface Response {
  response: string;
  correct: boolean;
}

export interface IQuizContentProps {
  lang: boolean;
  setResponse: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export interface ITimeBar {
  duration: number; // Duración total en segundos
  onComplete?: () => void; // Función opcional que se ejecuta cuando el tiempo se agota
}
