import { useFolder } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { Storage, generateGUID } from 'utils';
import { BROADCAST } from 'values';

const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const folder = useFolder();
  const [myDocumentsPath, setMyDocumentsPath] = useState('');
  const [displaysQty, setDisplaysQty] = useState(1);

  const [showSettings, setShowSettings] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [refreshSchedules, setRefreshSchedules] = useState(() => {
    const schedules =
      Storage.get(BROADCAST.SCHEDULES_AND_EVENTS)?.map(
        ({ id, ...schedule }) => ({
          id: id ?? generateGUID(),
          ...schedule,
        })
      ) ?? BROADCAST.INITIAL_SCHEDULES_AND_EVENTS;

    Storage.set(BROADCAST.SCHEDULES_AND_EVENTS, schedules, true);

    return schedules;
  });

  const toggleSettings = useCallback(() => {
    setShowSettings((state) => {
      if (!state) {
        setShowSchedule(false);
      }
      return !state;
    });
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowSchedule(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  const toggleSchedule = useCallback(() => {
    setShowSchedule((state) => {
      if (!state) {
        setShowSettings(false);
      }
      return !state;
    });
  }, []);

  const openSchedule = useCallback(() => {
    setShowSchedule(true);
    setShowSettings(false);
  }, []);

  const closeSchedule = useCallback(() => {
    setShowSchedule(false);
  }, []);

  useEffect(() => {
    window.electronAPI
      .getDisplays()
      .then((displays) => setDisplaysQty(displays.length));
  }, []);

  useEffect(() => {
    folder.getPath().then((url) => setMyDocumentsPath(url));
  }, [folder]);

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
        myDocumentsPath,
        displaysQty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
