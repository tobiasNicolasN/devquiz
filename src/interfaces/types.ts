import { Dispatch, SetStateAction } from "react";

export enum Language {
  spanish,
  english,
}

export enum GameState {
  BeforePlaying,
  Playing,
  AfterPlaying,
}

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
  setResponse: Dispatch<SetStateAction<boolean | undefined>>;
  round: number;
  showCorrect: boolean;
}

export interface ITimeBarProps {
  duration: number;
  confirm: () => void;
  nextQuestion: () => void
  setTimer: Dispatch<SetStateAction<number>>;
  showCorrect: boolean;
}

export interface ILangButtonsProps {
  lang: boolean;
  setLanguage: Dispatch<SetStateAction<string>>;
}
