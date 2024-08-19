import { createContext, useContext, useState } from "react";
import {
  IDataContext,
  IDataProviderProps,
  IQuestions,
  IResponses,
  IScores,
} from "../interfaces/types";

const DataContext = createContext<IDataContext | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData debe ser usado con un DataProvider");
  return context;
};

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [responses, setResponses] = useState<IResponses[]>([]);
  const [scoreData, setScoreData] = useState<IScores[]>([]);

  return (
    <DataContext.Provider
      value={{
        questions,
        setQuestions,
        responses,
        setResponses,
        scoreData,
        setScoreData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
