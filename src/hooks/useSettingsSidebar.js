import { useContext } from 'react';
import { AppContext } from 'providers';

export function useSettingsSidebar() {
  const { showingSettings, toggleSettings, openSettings, closeSettings } =
    useContext(AppContext);
  return { showingSettings, toggleSettings, openSettings, closeSettings };
}
