import React from 'react';
import MainView from 'views/main';
import { ScripturesProvider } from 'providers/scriptures';
import { VerseSelectionProvider } from 'providers/verseSelection';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function App() {
  return (
    <ScripturesProvider>
      <VerseSelectionProvider>
        <MainView />
      </VerseSelectionProvider>
    </ScripturesProvider>
  );
}

export default App;
