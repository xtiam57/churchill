import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import {
  AnthemnsProvider,
  AppProvider,
  PresenterProvider,
  ScripturesProvider,
  BirthdaysProvider,
} from 'providers';

import { Navbar } from 'components/navbar';
import { Settings } from 'components/settings';

import { RouteMapper } from 'router';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './assets/styles/index.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <PresenterProvider>
          <ScripturesProvider>
            <AnthemnsProvider>
              <BirthdaysProvider>
                <Navbar />

                <RouteMapper />

                <Settings />
              </BirthdaysProvider>
            </AnthemnsProvider>
          </ScripturesProvider>
        </PresenterProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
