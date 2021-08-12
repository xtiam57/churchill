import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { AnthemnsProvider } from 'providers/anthemns';
import { AppProvider } from 'providers/app';
import { PresenterProvider } from 'providers/presenter';
import { ScripturesProvider } from 'providers/scriptures';
import { BirthdayProvider } from 'providers/birthdays';

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
              <BirthdayProvider>
                <Navbar />

                <RouteMapper />

                <Settings />
              </BirthdayProvider>
            </AnthemnsProvider>
          </ScripturesProvider>
        </PresenterProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
