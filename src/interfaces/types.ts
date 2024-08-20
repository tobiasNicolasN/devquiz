import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IDataContext {
  questions: IQuestions[];
  setQuestions: Dispatch<SetStateAction<IQuestions[]>>;
  responses: IResponses[];
  setResponses: Dispatch<SetStateAction<IResponses[]>>;
  scoreData: IScores[];
  setScoreData: Dispatch<SetStateAction<IScores[]>>;
}

export interface IDataProviderProps {
  children: ReactNode;
}

export interface IQuestions {
  id: number;
  question_text: string;
  language: string;
}

export interface IResponses {
  id: number;
  question_id: number;
  response_text: string;
  correct: boolean;
}

export interface IScores {
  name: string;
  score: number;
}

export enum Language {
  spanish,
  english,
}

export enum GameState {
  BeforePlaying,
  Playing,
  AfterPlaying,
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
  nextQuestion: () => void;
  setTimer: Dispatch<SetStateAction<number>>;
  showCorrect: boolean;
}

export interface ILangButtonsProps {
  lang: boolean;
  setLanguage: Dispatch<SetStateAction<string>>;
}

export interface IFormProps {
  score: number;
  lang: boolean;
  setSended: Dispatch<SetStateAction<boolean>>
}

export interface IFormData {
  score: number;
  name: string;
}

export interface ILeaderBoard {
  scores: IScores[]
  setScores: Dispatch<SetStateAction<IScores[]>>
  lang: boolean
}