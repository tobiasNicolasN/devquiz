import { useEffect } from "react";
import { ILeaderBoard } from "../interfaces/types";
import { getScores } from "../api/api";
import style from '../styles/LeaderBoard.module.css'

function LeaderBoard({ scores, setScores }: ILeaderBoard) {
  const loadData = async () => {
    const scoresRes = await getScores();
    setScores(scoresRes);
  };

  useEffect(() => {
    loadData();
  }, [[], scores]);

  return (
    <div className={style.container}>
      {scores.map((score, index) => {
        return (
          <div key={index}>
            <p>{score.name}</p>
            <p>{score.score}</p>
          </div>
        );
      })}
    </div>
  );
}

export default LeaderBoard;
