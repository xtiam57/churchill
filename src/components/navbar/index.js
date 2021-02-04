import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import { BsMusicNoteList, BsBook } from 'react-icons/bs';

export function Navbar() {
  const [radioValue, setRadioValue] = useState(1);
  const location = useLocation();

  if (location.pathname === '/proyeccion') {
    return null;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Churchill
          </Link>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to="/biblia"
                className="nav-link"
                activeClassName="active"
              >
                <BsBook />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/himnos"
                className="nav-link"
                activeClassName="active"
              >
                <BsMusicNoteList />
              </NavLink>
            </li>
          </ul>

          <ButtonGroup toggle>
            <ToggleButton
              type="radio"
              name="radio"
              variant="outline-light"
              value={1}
              checked={radioValue === 1}
              onChange={(e) => setRadioValue(+e.currentTarget.value)}
            >
              Logo
            </ToggleButton>
            <ToggleButton
              type="radio"
              name="radio"
              variant="outline-light"
              value={2}
              checked={radioValue === 2}
              onChange={(e) => setRadioValue(+e.currentTarget.value)}
            >
              Proyectar
            </ToggleButton>
          </ButtonGroup>
        </div>
      </nav>
    </>
  );
}
