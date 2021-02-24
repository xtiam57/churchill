import { useContext } from 'react';
import { AppContext } from 'providers/app';

export function useSettingsSidebar() {
  const { showingSettings, toggleSettings } = useContext(AppContext);
  return { showingSettings, toggleSettings };
}
