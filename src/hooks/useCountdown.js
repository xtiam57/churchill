import { useCallback, useEffect, useRef, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import { Time } from 'utils';
import { BROADCAST, SETTINGS_OPTIONS } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

function getSoundFile(countdownsound) {
  return SETTINGS_OPTIONS.COUNTDOWN_SOUNDS.find(
    ({ value }) => value === countdownsound
  )?.file;
}

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
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const audioRef = useRef(null);
  const deadlineRef = useRef(null);
  const soundRef = useRef(settings?.countdownsound);

  const [state, setState] = useState(() => buildState(0, 0, false));

  useEffect(() => {
    soundRef.current = settings?.countdownsound;
  }, [settings?.countdownsound]);

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

      const file = getSoundFile(soundRef.current);
      if (file) {
        const audio = new Audio(file);
        audioRef.current = audio;
        audio.play();
      }

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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    deadlineRef.current = null;

    setState(buildState(0, 0, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback((initialMinutes = 0, initialSeconds = 0) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

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
