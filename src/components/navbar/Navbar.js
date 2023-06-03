import { Semaphore } from 'components';
import { usePresenter, useSettingsSidebar } from 'hooks';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsChatDotsFill, BsFillGearFill, BsHouseFill } from 'react-icons/bs';
import { RiComputerLine, RiSlideshow2Fill } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import { PATHS, routes } from 'router';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { AlertMessageModal } from './modal';

const useAlert = createPersistedState(BROADCAST.ALERT);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function Navbar() {
  const [alert, setAlert] = useAlert(BROADCAST.INITIAL_ALERT);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);

  const location = useLocation();
  const { toggleSettings } = useSettingsSidebar();
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
    presenting ? 'navbar-light bg-warning' : 'navbar-dark bg-primary'
  }`;

  return (
    <>
      <nav className={styles}>
        <div className="container-fluid">
          <NavLink exact to="/">
            <span className="navbar-brand">Churchill</span>
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li
              className="nav-item d-flex align-items-center justify-content-center"
              style={{ width: '42px', height: '38px' }}
            >
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
              >
                <BsHouseFill />
              </NavLink>
            </li>
            <li className="nav-item">
              <Button
                onClick={toggleSettings}
                className={presenting ? 'text-dark' : 'text-light'}
                variant="link"
              >
                <BsFillGearFill />
              </Button>
            </li>
            <li className="nav-item">
              <Button
                title="Aviso en pantalla"
                disabled={!presenting}
                onClick={() => setShowModal(true)}
                className={presenting ? 'text-dark' : 'text-light'}
                variant="link"
              >
                <BsChatDotsFill />
              </Button>
            </li>

            {routes
              .filter((route) => route.menu)
              .map((route, index) => (
                <li key={index} className="nav-item">
                  <NavLink
                    to={route.path}
                    className="nav-link"
                    activeClassName="active"
                    title={route.label}
                  >
                    {route.icon}
                    {route.showLabel && <span> {route.label}</span>}
                  </NavLink>
                </li>
              ))}
          </ul>

          {alert ? (
            <div className="marquee mr-3" style={{ maxWidth: '250px' }}>
              <p className="m-0">{alert}</p>
            </div>
          ) : null}

          <span className="mr-3">
            <Semaphore />
          </span>

          <Button
            onClick={toggle}
            variant={presenting ? 'outline-dark' : 'outline-light'}
          >
            {presenting ? <RiComputerLine /> : <RiSlideshow2Fill />}
          </Button>
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
