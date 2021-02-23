import { useContext } from 'react';
import { AppContext } from 'providers/app';

export function useSettings() {
  const { showingSettings, toggleSettings } = useContext(AppContext);
  return { showingSettings, toggleSettings };
}
