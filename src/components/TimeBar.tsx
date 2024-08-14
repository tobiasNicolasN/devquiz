import { useEffect } from "react";
import styles from "../styles/TimeBar.module.css";
import { ITimeBar } from "../interfaces/types";

const TimerBar = ({
  showCorrect,
  duration,
  setTimer,
  onComplete,
}: ITimeBar) => {
  useEffect(() => {
    if (!showCorrect) {
      if (duration <= 0) {
        if (onComplete) onComplete();
        return;
      }

      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [duration, showCorrect]);

  const percentage = (duration / 30) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{ width: `${percentage}%` }} />
      <div className={styles.label}>{duration}s</div>
    </div>
  );
};

export default TimerBar;
