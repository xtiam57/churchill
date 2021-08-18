import { useEffect, useState, useCallback, useMemo } from 'react';
import { Time } from 'utils';

export function useCountdown(showLogo, callback = () => {}) {
  const audio = useMemo(() => new Audio('/audio/beep.mp3'), []);
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
            audio.play();
            setRunning(false);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    callback(
      showLogo
        ? null
        : {
            id: 'TEMP',
            text: `<strong class="fs-xxl">${time}</strong>`,
            type: 'temp',
          }
    );

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds, showLogo, running]);

  const stop = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;

    setMinutes(0);
    setSeconds(0);
    setTime(Time.formatTime(0, 0));
    setRunning(false);
  }, []);

  const start = useCallback((initialMinutes = 0, initialSeconds = 0) => {
    audio.pause();
    audio.currentTime = 0;

    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setRunning(true);
  }, []);

  return { start, stop, time };
}
