import { useBackgroundMusic } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSound from 'use-sound';
import { MiniPlayer } from './MiniPlayer';

// Constantes
const SOUND_CONFIG = {
  volume: 1,
  playbackRate: 1,
  interrupt: true,
  html5: true,
};

const PLAY_DELAY = 50;

export function BackgroundMusic() {
  const folder = useMemo(() => {
    return {
      open: async () => {
        const paths = await window.electronAPI.getPaths();
        window.electronAPI?.openDirectory(paths.BACKGROUND_MUSIC_PATH);
      },
    };
  }, []);

  const {
    localUrl,
    setIsReady,
    index,
    setIndex,
    playlist,
    updatePlayingState,
    shuffleMode,
    toggleShuffle,
    playNext,
    isVisible,
    hidePlayer,
    refreshPlaylist,
  } = useBackgroundMusic();

  const [shouldPlay, setShouldPlay] = useState(false);
  const [pendingIndex, setPendingIndex] = useState(null);

  const [play, { stop, isPlaying }] = useSound(localUrl, {
    ...SOUND_CONFIG,
    onload: () => setIsReady(true),
    onloaderror: (err) => {
      console.error(`Error cargando audio ${localUrl}:`, err);
      setIsReady(false);
    },
    onend: () => {
      // Cuando termina una canción, reproducir la siguiente
      setShouldPlay(false);
      updatePlayingState(false);
      setTimeout(() => {
        playNext();
        setShouldPlay(true);
      }, 100);
    },
  });

  // Sincronizar el estado de reproducción con el contexto
  useEffect(() => {
    updatePlayingState(isPlaying);
  }, [isPlaying, updatePlayingState]);

  const handlePause = useCallback(() => {
    stop();
    setShouldPlay(false);
    updatePlayingState(false);
  }, [stop, updatePlayingState]);

  useEffect(() => {
    if (shouldPlay && localUrl && playlist.length > 0) {
      stop();
      const timer = setTimeout(() => play(), PLAY_DELAY);
      return () => clearTimeout(timer);
    }
  }, [shouldPlay, localUrl, play, stop, playlist.length]);

  useEffect(() => {
    if (pendingIndex !== null && playlist.length > 0) {
      stop();
      setIndex(pendingIndex);
      setShouldPlay(true);
      setPendingIndex(null);
    }
  }, [pendingIndex, setIndex, stop, playlist.length]);

  const handlePlay = (idx) => {
    if (index === idx && isPlaying) {
      handlePause();
    } else {
      stop();
      setShouldPlay(false);
      setPendingIndex(idx);
    }
  };

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      setShouldPlay(true);
    }
  }, [isPlaying, handlePause]);

  const handleNext = useCallback(() => {
    stop();
    setShouldPlay(false);
    setTimeout(() => {
      playNext();
      setShouldPlay(true);
    }, 100);
  }, [stop, playNext]);

  const currentTrack = playlist[index] || null;

  return (
    <MiniPlayer
      isVisible={isVisible}
      currentTrack={currentTrack}
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onNext={handleNext}
      shuffleMode={shuffleMode}
      onToggleShuffle={toggleShuffle}
      currentIndex={index}
      totalTracks={playlist.length}
      playlist={playlist}
      onTrackSelect={handlePlay}
      folder={folder}
      onClose={hidePlayer}
      refreshPlaylist={refreshPlaylist}
    />
  );
}
