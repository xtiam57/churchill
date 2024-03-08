import { HashRouter as Router } from 'react-router-dom';

import { Navbar, Settings } from 'components';
import {
  AnthemnsProvider,
  AppProvider,
  BirthdaysProvider,
  PresenterProvider,
  ScripturesProvider,
} from 'providers';
import { RouteMapper } from 'router';

// CSS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './assets/styles/custom.scss';
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
