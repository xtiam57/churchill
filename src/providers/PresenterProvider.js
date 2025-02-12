import React, { useCallback, useState } from 'react';

const PresenterContext = React.createContext({});

const PresenterProvider = ({ children }) => {
  const [presenting, setPresenting] = useState(false);

  const close = useCallback(async () => {
    const result = await window.electronAPI.closePresenter();
    setPresenting(result);
  }, []);

  const reload = useCallback(async () => {
    await window.electronAPI.reload();
    close();
  }, [close]);

  const toggle = useCallback(async () => {
    const isPresenting = await window.electronAPI.togglePresenter();
    setPresenting(isPresenting);
  }, []);

  return (
    <PresenterContext.Provider value={{ toggle, close, reload, presenting }}>
      {children}
    </PresenterContext.Provider>
  );
};

export { PresenterContext, PresenterProvider };
