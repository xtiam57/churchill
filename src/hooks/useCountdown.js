import { useCallback, useEffect, useMemo, useState } from 'react';
import { Time } from 'utils';

export function useCountdown(disabled, callback = () => {}) {
  const audio = useMemo(() => new Audio('./audio/beep.mp3'), []);
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
      disabled
        ? null
        : {
            id: 'TEMP',
            text: `<strong class="fs-timer">${time}</strong>`,
            type: 'corner',
          }
    );

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds, disabled, running]);

  const stop = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;

    setMinutes(0);
    setSeconds(0);
    setTime(Time.formatTime(0, 0));
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback((initialMinutes = 0, initialSeconds = 0) => {
    audio.pause();
    audio.currentTime = 0;

    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setTime(Time.formatTime(initialMinutes, initialSeconds));
    setRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { start, stop, time, running };
}
