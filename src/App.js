import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { AnthemnsProvider } from 'providers/anthemns';
import { AppProvider } from 'providers/app';
import { PresenterProvider } from 'providers/presenter';
import { ScripturesProvider } from 'providers/scriptures';
import { BirthdayProvider } from 'providers/birthdays';

import { Navbar } from 'components/navbar';
import { Settings } from 'components/settings';

import CastPage from 'pages/cast';
import HomePage from 'pages/home';
import ScripturesPage from 'pages/scriptures';
import AnthemnsPage from 'pages/anthemns';
import BirthdaysPage from 'pages/birthdays';

import { ROUTES } from 'values';

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

                <Switch>
                  <Route path={ROUTES.SCRIPTURES_PAGE}>
                    <ScripturesPage />
                  </Route>

                  <Route path={ROUTES.ANTHEMNS_PAGE}>
                    <AnthemnsPage />
                  </Route>

                  <Route path={ROUTES.BIRTHDAYS_PAGE}>
                    <BirthdaysPage />
                  </Route>

                  <Route path={ROUTES.CAST_PAGE}>
                    <CastPage />
                  </Route>

                  <Route path="/">
                    <HomePage />
                  </Route>
                </Switch>

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
