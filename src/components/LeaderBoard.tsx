import { useEffect } from "react";
import { ILeaderBoard, IScores } from "../interfaces/types";
import { getScores } from "../api/api";
import style from "../styles/LeaderBoard.module.css";

function LeaderBoard({ scores, setScores, lang }: ILeaderBoard) {

  const loadData = async () => {
    const scoresRes = await getScores();
    const sortedScores = scoresRes.sort(
      (a: IScores, b: IScores) => b.score - a.score
    );
    setScores(sortedScores);
  };

  useEffect(() => {
    loadData();
  }, []);

  const capitalizeWords = (string:string) => {
      return string
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
  }

  return (
    <div className={style.container}>
  <div className={style.header}>
    <div className={style.headerItem}>{lang ? "Pos" : "Rank"}</div>
    <div className={style.headerItem}>{lang ? "Nombre" : "Name"}</div>
    <div className={style.headerItem}>{lang ? "Pts" : "Score"}</div>
  </div>
  {scores.slice(0, 5).map((score, index) => (
    <div className={style.card} key={index}>
      <div className={style.item}>{index + 1}</div>
      <div className={style.item}>{capitalizeWords(score.name)}</div>
      <div className={style.item}>{score.score}</div>
    </div>
  ))}
</div>
  );
}

export default LeaderBoard;
