import { useCallback, useEffect, useMemo, useState } from 'react';
import { Time } from 'utils';

function getMessage(time) {
  return {
    id: 'TEMP',
    processedText: `<span class="fs-timer">${time}</span>`,
    type: 'corner',
  };
}

export function useCountdown(disabled) {
  const audio = useMemo(() => new Audio('./audio/beep.mp3'), []);

  const [state, setState] = useState({
    minutes: 0,
    seconds: 0,
    time: Time.formatTime(0, 0),
    running: false,
    message: getMessage(Time.formatTime(0, 0)),
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setState((prev) => {
        const { minutes, seconds, running } = prev;

        if (running) {
          if (seconds > 0) {
            const time = Time.formatTime(minutes, seconds - 1);

            return {
              minutes,
              seconds: seconds - 1,
              time,
              running,
              message: getMessage(time),
            };
          }

          if (minutes === 0) {
            audio.play();

            const time = Time.formatTime(0, 0);

            return {
              minutes: 0,
              seconds: 0,
              time,
              running: false,
              message: getMessage(time),
            };
          }

          const time = Time.formatTime(minutes - 1, 59);

          return {
            minutes: minutes - 1,
            seconds: 59,
            time,
            running,
            message: getMessage(time),
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

    const time = Time.formatTime(0, 0);

    setState({
      minutes: 0,
      seconds: 0,
      time,
      running: false,
      message: getMessage(time),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback((initialMinutes = 0, initialSeconds = 0) => {
    audio.pause();
    audio.currentTime = 0;

    const time = Time.formatTime(initialMinutes, initialSeconds);

    setState({
      minutes: initialMinutes,
      seconds: initialSeconds,
      time,
      running: true,
      message: getMessage(time),
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
