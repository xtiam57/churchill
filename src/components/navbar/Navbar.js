import {
  CalendarMonth,
  CancelPresentation,
  Chat,
  Settings,
  Slideshow,
  PlayArrow,
} from '@mui/icons-material';
import { Countdown, Logo } from 'components';
import { useApp, usePresenter } from 'hooks';
import { useCallback, useContext, useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { PATHS } from 'router';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { AlertMessageModal } from './modal';
import { BackgroundAudioContext } from 'providers';

const useAlert = createPersistedState(BROADCAST.ALERT);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function Navbar() {
  const [alert, setAlert] = useAlert(BROADCAST.INITIAL_ALERT);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { setShowOptions } = useContext(BackgroundAudioContext);
  const location = useLocation();
  const { toggleSettings, toggleSchedule } = useApp();
  const { toggle, presenting } = usePresenter();
  const [showModal, setShowModal] = useState(false);

  const handleSendMessage = useCallback(
    ({ message }) => {
      setShowModal(false);
      setAlert(message);

      setTimeout(() => {
        setAlert('');
      }, settings.alertsinterval || 30000);
    },
    [setAlert, settings]
  );

  if (location.pathname === PATHS.CAST_PAGE) {
    return null;
  }

  const styles = `navbar navbar-expand-lg sticky-top ${
    presenting ? 'navbar-light bg-secondary' : 'navbar-dark bg-primary'
  }`;

  return (
    <>
      <nav
        style={{
          gridArea: 'navbar',
          boxShadow: '0 -2px 15px 0 rgba(0, 0, 0, 1)',
        }}
        className={styles}
      >
        <div className="container-fluid">
          <span className="navbar-brand d-flex align-items-center">
            <Logo
              height={24}
              logo="horizontal"
              color={presenting ? '#20232a' : '#fff'}
            />
          </span>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Ajustes</Tooltip>}
              >
                <Button
                  onClick={toggleSettings}
                  className={presenting ? 'text-dark' : 'text-light'}
                  variant="link"
                >
                  <Settings />
                </Button>
              </OverlayTrigger>
            </li>
            <li className="nav-item">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Anuncios</Tooltip>}
              >
                <Button
                  onClick={toggleSchedule}
                  className={presenting ? 'text-dark' : 'text-light'}
                  variant="link"
                >
                  <CalendarMonth />
                </Button>
              </OverlayTrigger>
            </li>
            <li className="nav-item">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Fondos musicales</Tooltip>}
              >
                <Button
                  onClick={() => setShowOptions(true)}
                  className={presenting ? 'text-dark' : 'text-light'}
                  variant="link"
                >
                  <PlayArrow />
                </Button>
              </OverlayTrigger>
            </li>
            {presenting && (
              <li className="nav-item">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Aviso en pantalla</Tooltip>}
                >
                  <Button
                    onClick={() => setShowModal(true)}
                    className={presenting ? 'text-dark' : 'text-light'}
                    variant="link"
                  >
                    <Chat />
                  </Button>
                </OverlayTrigger>
              </li>
            )}
          </ul>
          {alert ? (
            <div className="marquee mr-3" style={{ maxWidth: '250px' }}>
              <p className="m-0">{alert}</p>
            </div>
          ) : null}

          <span>
            <Countdown presenting={presenting} />
          </span>

          {/* <span className="mr-3">
            <Semaphore />
          </span> */}

          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                {presenting ? 'Detener proyección' : 'Iniciar proyección'}
              </Tooltip>
            }
          >
            <Button
              onClick={toggle}
              variant={presenting ? 'outline-dark' : 'secondary'}
              className="ml-3"
            >
              {presenting ? <CancelPresentation /> : <Slideshow />}
            </Button>
          </OverlayTrigger>
        </div>
      </nav>

      <AlertMessageModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSendMessage}
      />
    </>
  );
}
