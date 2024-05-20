import { useCallback, useEffect, useMemo, useState } from 'react';
import { Time } from 'utils';

export function useCountdown(disabled) {
  const audio = useMemo(() => new Audio('./audio/beep.mp3'), []);

  const [state, setState] = useState({
    minutes: 0,
    seconds: 0,
    time: Time.formatTime(0, 0),
    running: false,
    message: null,
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setState((prev) => {
        const { minutes, seconds, running } = prev;

        if (running) {
          if (seconds > 0) {
            return {
              minutes,
              seconds: seconds - 1,
              time: Time.formatTime(minutes, seconds - 1),
              running,
              message: {
                id: 'TEMP',
                text: `<strong class="fs-timer">${Time.formatTime(
                  minutes,
                  seconds - 1
                )}</strong>`,
                type: 'corner',
              },
            };
          }

          if (minutes === 0) {
            audio.play();

            return {
              minutes: 0,
              seconds: 0,
              time: Time.formatTime(0, 0),
              running: false,
              message: {
                id: 'TEMP',
                text: `<strong class="fs-timer">${Time.formatTime(
                  0,
                  0
                )}</strong>`,
                type: 'corner',
              },
            };
          }

          return {
            minutes: minutes - 1,
            seconds: 59,
            time: Time.formatTime(minutes - 1, 59),
            running,
            message: {
              id: 'TEMP',
              text: `<strong class="fs-timer">${Time.formatTime(
                minutes - 1,
                59
              )}</strong>`,
              type: 'corner',
            },
          };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;

    setState({
      minutes: 0,
      seconds: 0,
      time: Time.formatTime(0, 0),
      running: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback((initialMinutes = 0, initialSeconds = 0) => {
    audio.pause();
    audio.currentTime = 0;

    setState({
      minutes: initialMinutes,
      seconds: initialSeconds,
      time: Time.formatTime(initialMinutes, initialSeconds),
      running: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    start,
    stop,
    time: state.time,
    running: state.running,
    message: disabled ? null : state.message,
  };
}
