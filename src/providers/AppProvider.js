import React, { useState } from 'react';
import { Storage } from 'utils';
import { BROADCAST } from 'values';

const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [refreshSchedules, setRefreshSchedules] = useState(
    Storage.get(BROADCAST.SCHEDULES_AND_EVENTS)
  );

  const toggleSettings = () => {
    setShowSettings((state) => {
      if (!state) {
        setShowSchedule(false);
      }
      return !state;
    });
  };

  const openSettings = () => {
    setShowSettings(true);
    setShowSchedule(false);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const toggleSchedule = () => {
    setShowSchedule((state) => {
      if (!state) {
        setShowSettings(false);
      }
      return !state;
    });
  };

  const openSchedule = () => {
    setShowSchedule(true);
    setShowSettings(false);
  };

  const closeSchedule = () => {
    setShowSchedule(false);
  };

  return (
    <AppContext.Provider
      value={{
        showingSettings: showSettings,
        toggleSettings,
        openSettings,
        closeSettings,
        showingSchedule: showSchedule,
        toggleSchedule,
        openSchedule,
        closeSchedule,
        refreshSchedules,
        setRefreshSchedules,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
