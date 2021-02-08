import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { PresenterProvider } from 'providers/presenter';
import { ScripturesProvider } from 'providers/scriptures';
import { AnthemnsProvider } from 'providers';

import { Navbar } from 'components/navbar';

import AnthemnsView from 'views/anthemns';
import CastView from 'views/cast';
import HomeView from 'views/home';
import ScripturesView from 'views/scriptures';
import BirthdaysView from 'views/birthdays';

import {
  ANTHEMNS_VIEW_PATH,
  BIBLE_VIEW_PATH,
  BIRTHDAYS_VIEW_PATH,
  CAST_VIEW_PATH,
} from 'values';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './index.css';

function App() {
  return (
    <Router>
      <PresenterProvider>
        <Navbar />

        <Switch>
          <Route path={BIBLE_VIEW_PATH}>
            <ScripturesProvider>
              <ScripturesView />
            </ScripturesProvider>
          </Route>

          <Route path={ANTHEMNS_VIEW_PATH}>
            <AnthemnsProvider>
              <AnthemnsView />
            </AnthemnsProvider>
          </Route>

          <Route path={BIRTHDAYS_VIEW_PATH}>
            <AnthemnsProvider>
              <BirthdaysView />
            </AnthemnsProvider>
          </Route>

          <Route path={CAST_VIEW_PATH}>
            <CastView />
          </Route>

          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </PresenterProvider>
    </Router>
  );
}

export default App;
