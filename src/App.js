import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import {
  AnthemnsProvider,
  AppProvider,
  PresenterProvider,
  ScripturesProvider,
  BirthdaysProvider,
} from 'providers';
import { Navbar, Settings } from 'components';
import { RouteMapper } from 'router';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './assets/styles/index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <PresenterProvider>
          <ScripturesProvider>
            <AnthemnsProvider>
              <BirthdaysProvider>
                {/* Top navbar */}
                <Navbar />
                {/* Routes */}
                <RouteMapper />
                {/* Sidebar settings */}
                <Settings />
              </BirthdaysProvider>
            </AnthemnsProvider>
          </ScripturesProvider>
        </PresenterProvider>
      </Router>
    </AppProvider>
  );
}

export default App;
