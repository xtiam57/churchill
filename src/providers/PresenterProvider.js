import React, { useCallback, useState } from 'react';
import { PATHS } from 'router';

const PresenterContext = React.createContext({});

const PresenterProvider = ({ children }) => {
  const [presenter, setPresenter] = useState(null);
  const [presenting, setPresenting] = useState(false);

  const close = useCallback(() => {
    if (presenter) {
      presenter.close();
      setPresenting(false);
      setPresenter(null);
    }
  }, [presenter]);

  const reload = useCallback(() => {
    const electron = window.require('electron');
    const remote = electron.remote;
    const { BrowserWindow } = remote;
    const main = BrowserWindow.getFocusedWindow();

    close();
    main.reload();
  }, [close]);

  const toggle = useCallback(() => {
    window.electronAPI.togglePresenter(
      presenter,
      setPresenter,
      setPresenting,
      PATHS.CAST_PAGE
    );
  }, [presenter]);

  return (
    <PresenterContext.Provider
      value={{
        toggle,
        close,
        reload,
        presenter,
        presenting,
      }}
    >
      {children}
    </PresenterContext.Provider>
  );
};

export { PresenterContext, PresenterProvider };
