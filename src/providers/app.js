import React, { useState, useCallback } from 'react';
import { CAST_VIEW_PATH } from 'values';

const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings((state) => !state);
  };

  return (
    <AppContext.Provider
      value={{
        showingSettings: showSettings,
        toggleSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
