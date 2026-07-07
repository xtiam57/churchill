import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Time } from 'utils';

function getMessage(time) {
  return {
    id: 'TEMP',
    processedText: `<span class="fs-timer">${time}</span>`,
    type: 'corner',
  };
}

function buildState(minutes, seconds, running) {
  const time = Time.formatTime(minutes, seconds);

  return { minutes, seconds, time, running, message: getMessage(time) };
}

export function useCountdown(disabled) {
  const audio = useMemo(() => new Audio('./audio/beep.mp3'), []);
  const deadlineRef = useRef(null);

  const [state, setState] = useState(() => buildState(0, 0, false));

  // Driven by an absolute deadline (Date.now()) instead of counting ticks,
  // so a throttled/paused interval (e.g. minimized window) self-corrects
  // instead of drifting.
  const tick = useCallback(() => {
    if (deadlineRef.current === null) {
      return;
    }

    const remaining = Math.max(
      Math.round((deadlineRef.current - Date.now()) / 1000),
      0
    );

    if (remaining === 0) {
      deadlineRef.current = null;
      audio.play();
      setState(buildState(0, 0, false));
      return;
    }

    setState(buildState(Math.floor(remaining / 60), remaining % 60, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [tick]);

  const stop = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;
    deadlineRef.current = null;

    setState(buildState(0, 0, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback((initialMinutes = 0, initialSeconds = 0) => {
    audio.pause();
    audio.currentTime = 0;

    const totalSeconds = initialMinutes * 60 + initialSeconds;
    deadlineRef.current = Date.now() + totalSeconds * 1000;

    setState(buildState(initialMinutes, initialSeconds, true));
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
