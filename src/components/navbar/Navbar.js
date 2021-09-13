import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsHouseFill, BsFillGearFill } from 'react-icons/bs';
import { RiSlideshow2Fill, RiComputerLine } from 'react-icons/ri';

import { usePresenter, useSettingsSidebar, useClock } from 'hooks';
import { routes, PATHS } from 'router';

export function Navbar() {
  const location = useLocation();
  const time = useClock();
  const { toggleSettings } = useSettingsSidebar();
  const { toggle, presenting } = usePresenter();

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
            <li className="nav-item">
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

            {routes
              .filter((route) => route.menu)
              .map((route, index) => (
                <li key={index} className="nav-item">
                  <NavLink
                    to={route.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {route.icon} {route.label}
                  </NavLink>
                </li>
              ))}
          </ul>

          <span className="navbar-text d-block mr-3">{time}</span>

          <Button
            onClick={toggle}
            variant={presenting ? 'outline-dark' : 'outline-light'}
          >
            {presenting ? <RiComputerLine /> : <RiSlideshow2Fill />}
          </Button>
        </div>
      </nav>
    </>
  );
}
