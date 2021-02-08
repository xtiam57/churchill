import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Button, Tooltip } from 'react-bootstrap';
import {
  BsMusicNoteList,
  BsBook,
  BsGift,
  BsFillGearFill,
} from 'react-icons/bs';
import { RiSlideshow2Fill, RiStopFill } from 'react-icons/ri';
import {
  ANTHEMNS_VIEW_PATH,
  BIBLE_VIEW_PATH,
  BIRTHDAYS_VIEW_PATH,
  CAST_VIEW_PATH,
  CHANNEL_NAME,
  SETTINGS_VIEW_PATH,
} from 'values';
import { usePresenter } from 'hooks';

const useBroadcast = createPersistedState(CHANNEL_NAME);

export function Navbar() {
  const location = useLocation();
  const { toggle, presenting } = usePresenter();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (location.pathname === CAST_VIEW_PATH) {
    return null;
  }

  const navbarStyle = `navbar navbar-expand-lg sticky-top ${
    presenting ? 'navbar-light bg-warning' : 'navbar-dark bg-primary'
  }`;

  return (
    <>
      <nav className={navbarStyle}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Churchill
          </Link>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to={SETTINGS_VIEW_PATH}
                className="nav-link"
                activeClassName="active"
              >
                <BsFillGearFill />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={BIBLE_VIEW_PATH}
                className="nav-link"
                activeClassName="active"
              >
                <BsBook /> Escrituras
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={ANTHEMNS_VIEW_PATH}
                className="nav-link"
                activeClassName="active"
              >
                <BsMusicNoteList /> Himnos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={BIRTHDAYS_VIEW_PATH}
                className="nav-link"
                activeClassName="active"
              >
                <BsGift /> Cumpleaños
              </NavLink>
            </li>
          </ul>

          <span className="navbar-text d-block mr-3">
            {date.toLocaleTimeString()}
          </span>

          <Button
            onClick={toggle}
            variant={presenting ? 'outline-dark' : 'outline-light'}
          >
            {presenting ? <RiStopFill /> : <RiSlideshow2Fill />}
          </Button>
        </div>
      </nav>
    </>
  );
}
