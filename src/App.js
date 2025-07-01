import {
  BackgroundMusic,
  Navbar,
  Routesbar,
  Schedule,
  Settings,
} from 'components';
import {
  AppProvider,
  BackgroundMusicProvider,
  BirthdaysProvider,
  HymnalProvider,
  PresenterProvider,
  ScripturesProvider,
} from 'providers';
import { HashRouter as Router } from 'react-router-dom';
import { RouteMapper } from 'router';
import styled from 'styled-components';

// CSS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './assets/styles/custom.scss';
import './assets/styles/index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <PresenterProvider>
          <BackgroundMusicProvider>
            <ScripturesProvider>
              <HymnalProvider>
                <BirthdaysProvider>
                  <GridStyled>
                    {/* Nav */}
                    <Routesbar />
                    {/* Top navbar */}
                    <Navbar />
                    {/* Routes */}
                    <RouteMapper />
                    {/* Sidebar settings */}
                  </GridStyled>

                  <Schedule />

                  <Settings />
                  <BackgroundMusic />
                </BirthdaysProvider>
              </HymnalProvider>
            </ScripturesProvider>
          </BackgroundMusicProvider>
        </PresenterProvider>
      </Router>
    </AppProvider>
  );
}

export default App;

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'navbar navbar'
    'routesbar content';
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
