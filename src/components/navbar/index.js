import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  BsMusicNoteList,
  BsBook,
  BsGift,
  BsFillGearFill,
  BsHouseFill,
} from 'react-icons/bs';
import { RiSlideshow2Fill, RiStopFill } from 'react-icons/ri';

import { PATHS } from 'values';
import { usePresenter, useSettingsSidebar } from 'hooks';

export function Navbar() {
  const location = useLocation();
  const { toggleSettings } = useSettingsSidebar();
  const { toggle, presenting } = usePresenter();
  // const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   const timer = setInterval(() => setDate(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  if (location.pathname === PATHS.CAST_VIEW) {
    return null;
  }

  const navbarStyle = `navbar navbar-expand-lg sticky-top ${
    presenting ? 'navbar-light bg-warning' : 'navbar-dark bg-primary'
  }`;

  return (
    <>
      <nav className={navbarStyle}>
        <div className="container-fluid">
          <span className="navbar-brand">Churchill</span>

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
              <NavLink
                to={PATHS.BIBLE_VIEW}
                className="nav-link"
                activeClassName="active"
              >
                <BsBook /> Escrituras
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={PATHS.ANTHEMNS_VIEW}
                className="nav-link"
                activeClassName="active"
              >
                <BsMusicNoteList /> Himnos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={PATHS.BIRTHDAYS_VIEW}
                className="nav-link"
                activeClassName="active"
              >
                <BsGift /> Cumpleaños
              </NavLink>
            </li>
          </ul>

          {/* <span className="navbar-text d-block mr-3">
            {date.toLocaleTimeString()}
          </span> */}

          <Button
            className="mr-3"
            onClick={toggle}
            variant={presenting ? 'outline-dark' : 'outline-light'}
          >
            {presenting ? <RiStopFill /> : <RiSlideshow2Fill />}
          </Button>

          <Button
            onClick={toggleSettings}
            className={presenting ? 'text-dark px-0' : 'text-light px-0'}
            variant={presenting ? 'link' : 'link'}
          >
            <BsFillGearFill />
          </Button>
        </div>
      </nav>
    </>
  );
}
