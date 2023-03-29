import React, { useCallback, useEffect, useState } from 'react';

const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [myDocumentsPath, setMyDocumentsPath] = useState('');

  const toggleSettings = useCallback(
    () => setShowSettings((state) => !state),
    []
  );

  const openSettings = useCallback(() => setShowSettings(true), []);

  const closeSettings = useCallback(() => setShowSettings(false), []);

  const openMyDocuments = useCallback(
    () => window.electronAPI.openMyDocuments(),
    []
  );

  const getPath = useCallback(
    (file) => {
      return `${myDocumentsPath}\\${file}.mp3`;
    },
    [myDocumentsPath]
  );

  useEffect(() => {
    window.electronAPI
      .getMyDocumentsPath()
      .then((response) => setMyDocumentsPath(response));
  }, []);

  return (
    <AppContext.Provider
      value={{
        showingSettings: showSettings,
        toggleSettings,
        openSettings,
        closeSettings,
        openMyDocuments,
        getPath,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
