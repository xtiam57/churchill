import { useCallback, useEffect, useState } from 'react';
import { Time } from 'utils';

export function useSemaphore() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(Time.formatTime(minutes, seconds));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(Time.formatTime(minutes, seconds));

      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          setTime(Time.formatTime(0, 0));
          if (running) {
            setRunning(false);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds, running]);

  const stop = useCallback(() => {
    setMinutes(0);
    setSeconds(0);
    setTime(Time.formatTime(0, 0));
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback((initialMinutes = 40, initialSeconds = 0) => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { start, stop, time, minutes, running };
}
