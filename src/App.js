import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import HomeView from 'views/home';
import ScripturesView from 'views/scriptures';
import AnthemnsView from 'views/anthemns';
import CastView from 'views/cast';

import { ViewProvider } from 'providers/view';
import { ScripturesProvider } from 'providers/scriptures';

import { Navbar } from 'components/navbar';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './index.css';
import { ANTHEMNS_VIEW_PATH, BIBLE_VIEW_PATH, CAST_VIEW_PATH } from 'values';

function App() {
  return (
    <Router>
      <ViewProvider>
        <Navbar />

        <Switch>
          <Route path={BIBLE_VIEW_PATH}>
            <ScripturesProvider>
              <ScripturesView />
            </ScripturesProvider>
          </Route>

          <Route path={ANTHEMNS_VIEW_PATH}>
            <AnthemnsView />
          </Route>

          <Route path={CAST_VIEW_PATH}>
            <CastView />
          </Route>

          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </ViewProvider>
    </Router>
  );
}

export default App;
