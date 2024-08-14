import { Dispatch, SetStateAction } from "react";

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
  round: number;
}

export interface ITimeBar {
  duration: number;
  onComplete?: () => void;
  setTimer: Dispatch<SetStateAction<number>>;
  showCorrect: boolean;
}
