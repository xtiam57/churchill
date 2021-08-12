import { useEffect, useState } from 'react';

export function useCountdown(initialMinutes = 5, initialSeconds = 0) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const padMin = `${minutes}`.padStart(2, '0');
  const padSec = `${seconds}`.padStart(2, '0');

  return `${padMin}:${padSec}`;
}
