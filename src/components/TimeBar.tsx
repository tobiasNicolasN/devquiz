import { useEffect } from "react";
import styles from "../styles/TimeBar.module.css";
import { ITimeBarProps } from "../interfaces/types";

const TimerBar = ({
  showCorrect,
  duration,
  setTimer,
  confirm,
}: ITimeBarProps) => {
  useEffect(() => {
    if (!showCorrect) {
      if (duration <= 0) {
        confirm();
      }

      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [duration,showCorrect]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [duration]);

  const barDuration = showCorrect ? 10 : 30;
  const percentage = (duration / barDuration) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{ width: `${percentage}%` }} />
      <div className={styles.label}>{duration}s</div>
    </div>
  );
};

export default TimerBar;
