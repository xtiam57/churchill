import { BackgroundMusicContext } from 'providers';
import { useContext } from 'react';

export function useBackgroundMusic() {
  const {
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
  } = useContext(BackgroundMusicContext);
  return {
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
  };
}
