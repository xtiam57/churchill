import React, { useState } from 'react';

const ViewContext = React.createContext({});

function ViewProvider({ children }) {
  const [view, setView] = useState('scriptures');

  return (
    <ViewContext.Provider
      value={{
        view,
        setView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export { ViewProvider, ViewContext };
