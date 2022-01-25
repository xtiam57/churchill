// CSS
import 'bootstrap/dist/css/bootstrap.css';
import { AudioPlayer, Navbar, Settings } from 'components';
import {
  AnthemnsProvider,
  AppProvider,
  BirthdaysProvider,
  PresenterProvider,
  ScripturesProvider,
} from 'providers';
import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { HashRouter as Router } from 'react-router-dom';
import { RouteMapper } from 'router';
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
                {/* Global audio player */}
                <AudioPlayer />
              </BirthdaysProvider>
            </AnthemnsProvider>
          </ScripturesProvider>
        </PresenterProvider>
      </Router>
    </AppProvider>
  );
}

export default App;
