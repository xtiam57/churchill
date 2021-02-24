import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { AnthemnsProvider } from 'providers/anthemns';
import { AppProvider } from 'providers/app';
import { PresenterProvider } from 'providers/presenter';
import { ScripturesProvider } from 'providers/scriptures';

import { Navbar } from 'components/navbar';
import { Settings } from 'components/settings';

import AnthemnsView from 'views/anthemns';
import BirthdaysView from 'views/birthdays';
import CastView from 'views/cast';
import HomeView from 'views/home';
import ScripturesView from 'views/scriptures';

import { PATHS } from 'values';

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
              <Navbar />

              <Switch>
                <Route path={PATHS.BIBLE_VIEW}>
                  <ScripturesView />
                </Route>

                <Route path={PATHS.ANTHEMNS_VIEW}>
                  <AnthemnsView />
                </Route>

                <Route path={PATHS.BIRTHDAYS_VIEW}>
                  <BirthdaysView />
                </Route>

                <Route path={PATHS.CAST_VIEW}>
                  <CastView />
                </Route>

                <Route path="/">
                  <HomeView />
                </Route>
              </Switch>

              <Settings />
            </AnthemnsProvider>
          </ScripturesProvider>
        </PresenterProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
