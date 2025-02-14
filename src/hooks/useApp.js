import { AppContext } from 'providers';
import { useContext } from 'react';

export function useApp() {
  const {
    showingSettings,
    toggleSettings,
    openSettings,
    closeSettings,
    showingSchedule,
    toggleSchedule,
    openSchedule,
    closeSchedule,
    refreshSchedules,
    setRefreshSchedules,
    myDocumentsPath,
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
    refreshSchedules,
    setRefreshSchedules,
    myDocumentsPath,
  };
}
