import React, { useState, useCallback } from 'react';
import { CAST_VIEW_PATH } from 'values';

const PresenterContext = React.createContext({});

const PresenterProvider = ({ children }) => {
  const [presenter, setPresenter] = useState(null);
  const [presenting, setPresenting] = useState(false);

  const toggle = useCallback(() => {
    const electron = window.require('electron');
    const remote = electron.remote;
    const { BrowserWindow, screen, app } = remote;
    const [parent] = BrowserWindow.getAllWindows();
    let url = parent.webContents.getURL();

    if (presenter) {
      presenter.isVisible() ? presenter.hide() : presenter.show();
      setPresenting(presenter.isVisible());
      return;
    }

    app.whenReady().then(() => {
      const displays = screen.getAllDisplays();
      const extDisplay = displays.find(
        ({ bounds }) => bounds.x !== 0 || bounds.y !== 0
      );

      if (extDisplay) {
        let win = new BrowserWindow({
          x: extDisplay.bounds.x + 50,
          y: extDisplay.bounds.y + 50,
          frame: false,
          fullscreen: true,
          show: false,
          parent,
        });

        // Open the DevTools.
        // win.webContents.openDevTools();

        win.loadURL(url.replace(/#.*$/, `#${CAST_VIEW_PATH}`));
        win.once('ready-to-show', () => {
          win.show();
          setPresenting(true);
        });

        setPresenter(win);
      }
    });
  }, [presenter]);

  const close = useCallback(() => {
    if (presenter) {
      presenter.close();
      setPresenting(false);
      setPresenter(null);
    }
  }, [presenter]);

  return (
    <PresenterContext.Provider
      value={{
        toggle,
        close,
        presenter,
        presenting,
      }}
    >
      {children}
    </PresenterContext.Provider>
  );
};

export { PresenterContext, PresenterProvider };
