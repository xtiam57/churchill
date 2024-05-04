import { AppContext } from 'providers';
import { useContext } from 'react';

export function useSettingsSidebar() {
  const {
    showingSettings,
    toggleSettings,
    openSettings,
    closeSettings,
    showingSchedule,
    toggleSchedule,
    openSchedule,
    closeSchedule,
  } = useContext(AppContext);
  return {
    showingSettings,
    toggleSettings,
    openSettings,
    closeSettings,
    showingSchedule,
    toggleSchedule,
    openSchedule,
    closeSchedule,
  };
}
