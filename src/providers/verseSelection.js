import React, { useState } from 'react';
import { useVerse } from 'hooks';

const VerseSelectionContext = React.createContext([]);

function VerseSelectionProvider({ children }) {
  const { verse } = useVerse();
  const [verseSelection, setVerseSelection] = useState([verse]);

  return (
    <VerseSelectionContext.Provider
      value={{ verseSelection, setVerseSelection }}
    >
      {children}
    </VerseSelectionContext.Provider>
  );
}

export { VerseSelectionProvider, VerseSelectionContext };
