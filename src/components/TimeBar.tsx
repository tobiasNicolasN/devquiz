import { useState, useEffect } from 'react';
import styles from '../styles/TimeBar.module.css';
import { ITimeBar } from '../interfaces/types';

const TimerBar = ({ duration, onComplete } : ITimeBar) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={styles.container}>
      <div
        className={styles.bar}
        style={{ width: `${percentage}%` }}
      />
      <div className={styles.label}>
        {timeLeft}s
      </div>
    </div>
  );
};

export default TimerBar;
