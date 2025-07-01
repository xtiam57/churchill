import { createContext, useCallback, useEffect, useState } from 'react';

export const BackgroundMusicContext = createContext({});

export function BackgroundMusicProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [localUrl, setLocalUrl] = useState('');
  const [currentTrack, setCurrentTrack] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [playedIndexes, setPlayedIndexes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.electronAPI?.getBackgroundMusic().then((tracks) => {
      setPlaylist(tracks);
    });
  }, []);

  useEffect(() => {
    if (playlist.length > 0) {
      setCurrentTrack(playlist[index]);
    }
    setIsReady(false); // Reinicia el estado cuando cambia la pista
  }, [playlist, index]);

  useEffect(() => {
    if (currentTrack) {
      setLocalUrl(currentTrack.path);
    } else {
      setLocalUrl('');
    }
  }, [currentTrack]);

  const toggleShuffle = useCallback(() => {
    setShuffleMode((prev) => {
      if (!prev) {
        setPlayedIndexes([index]); // Marcar la canción actual como reproducida
      } else {
        setPlayedIndexes([]); // Limpiar el historial cuando se desactiva shuffle
      }
      return !prev;
    });
  }, [index]);

  const getNextIndex = useCallback(() => {
    if (playlist.length === 0) return 0;

    if (shuffleMode) {
      // Si ya se reprodujeron todas las canciones, reiniciar
      if (playedIndexes.length >= playlist.length) {
        setPlayedIndexes([]);
        return Math.floor(Math.random() * playlist.length);
      }

      // Buscar un índice que no haya sido reproducido
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (playedIndexes.includes(nextIndex));

      return nextIndex;
    } else {
      // Modo secuencial
      return (index + 1) % playlist.length;
    }
  }, [playlist.length, shuffleMode, playedIndexes, index]);

  const playNext = useCallback(() => {
    const nextIndex = getNextIndex();
    setIndex(nextIndex);

    if (shuffleMode) {
      setPlayedIndexes((prev) => [...prev, nextIndex]);
    }
  }, [getNextIndex, shuffleMode]);

  const updatePlayingState = useCallback((playing) => {
    setIsPlaying(playing);
  }, []);

  const showPlayer = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hidePlayer = useCallback(() => {
    setIsVisible(false);
    setIsPlaying(false); // Pausar cuando se cierra
  }, []);

  const refreshPlaylist = useCallback(() => {
    window.electronAPI?.getBackgroundMusic().then((tracks) => {
      setPlaylist(tracks);
      setIndex(0);
    });
  }, []);

  return (
    <BackgroundMusicContext.Provider
      value={{
        localUrl,
        isReady,
        setIndex,
        index,
        playlist,
        setIsReady,
        isPlaying,
        updatePlayingState,
        shuffleMode,
        toggleShuffle,
        playNext,
        isVisible,
        showPlayer,
        hidePlayer,
        refreshPlaylist,
      }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
}
