import { useIterate } from 'hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import { BROADCAST, MOVEMENT } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);

export function usePlaylistPlayer({ items, loop, interval, live }) {
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [currentId, setCurrentId] = useState(items[0]?.id ?? null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const current = items.find((item) => item.id === currentId) || null;
  const [move] = useIterate(current || { id: null, index: 0 }, items);

  useEffect(() => {
    if (!items.length) {
      setCurrentId(null);
      return;
    }

    if (!items.some((item) => item.id === currentId)) {
      setCurrentId(items[0].id);
    }
  }, [items, currentId]);

  useEffect(() => {
    setMessage(live && current ? current : null);
  }, [current, live, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = useCallback(() => {
    if (!items.length || !current) {
      return;
    }

    const next = move(MOVEMENT.NEXT, loop);
    setCurrentId(next.id);

    if (next.id === current.id) {
      setPlaying(false);
    }
  }, [items, move, loop, current]);

  const goPrev = useCallback(() => {
    if (!items.length || !current) {
      return;
    }

    setCurrentId(move(MOVEMENT.PREV, loop).id);
  }, [items, move, loop, current]);

  const goto = useCallback(
    (id) => {
      if (!items.some((item) => item.id === id)) {
        return;
      }

      setCurrentId(id);
    },
    [items]
  );

  const togglePlay = useCallback(() => setPlaying((state) => !state), []);

  const handleControls = useCallback((action) => {
    if (!videoRef.current) {
      return;
    }

    window.electronAPI?.setVideoControl({
      action,
      time: videoRef.current.currentTime,
    });
  }, []);

  // Auto-avanza los items que no son video pasado el `interval`; los videos
  // avanzan por su propio evento `onEnded` (ver JSX que usa `handleControls`).
  useEffect(() => {
    if (!playing || !current || current.type === 'video') {
      return;
    }

    const timer = setTimeout(goNext, interval || 10000);

    return () => clearTimeout(timer);
  }, [playing, current, interval, goNext]);

  // Mantiene el <video> del control en sync con el estado play/pause,
  // incluyendo cuando `current` cambia a un nuevo video de la secuencia.
  useEffect(() => {
    if (!videoRef.current || current?.type !== 'video') {
      return;
    }

    if (playing) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [playing, current]);

  return {
    current,
    playing,
    videoRef,
    next: goNext,
    prev: goPrev,
    goto,
    togglePlay,
    handleControls,
  };
}
