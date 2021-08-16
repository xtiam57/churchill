import { useEffect, useState, useCallback } from 'react';

const formatTime = (minutes, seconds) =>
  `${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`;

export function useCountdown(callback = () => {}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(
    `${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
  );

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        setTime(formatTime(minutes, seconds - 1));
      }

      if (seconds === 0) {
        if (minutes === 0) {
          // clearInterval(interval);
          setTime(formatTime(0, 0));
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
          setTime(formatTime(minutes - 1, 59));
        }
      }
    }, 1000);

    callback(
      `${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`,
      minutes,
      seconds
    );

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  const start = useCallback((initialMinutes = 0, initialSeconds = 0) => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  }, []);

  return { start, time };
}
