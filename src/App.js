import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import HomeView from 'views/home';
import ScripturesView from 'views/scriptures';
import AnthemnsView from 'views/anthemns';
import ProjectionView from 'views/projection';

import { ViewProvider } from 'providers/view';
import { ScripturesProvider } from 'providers/scriptures';

import { Navbar } from 'components/navbar';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './index.css';

function App() {
  return (
    <Router>
      <ViewProvider>
        <Navbar />

        <Switch>
          <Route path="/biblia">
            <ScripturesProvider>
              <ScripturesView />
            </ScripturesProvider>
          </Route>

          <Route path="/himnos">
            <AnthemnsView />
          </Route>

          <Route path="/proyeccion">
            <ProjectionView />
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
