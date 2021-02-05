import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ToggleButton, ButtonGroup, Button } from 'react-bootstrap';
import { BsMusicNoteList, BsBook } from 'react-icons/bs';
import { MdCast, MdCastConnected } from 'react-icons/md';
import { ANTHEMNS_VIEW_PATH, BIBLE_VIEW_PATH, CAST_VIEW_PATH } from 'values';
import { usePresenter } from 'hooks';

export function Navbar() {
  const location = useLocation();
  const { toggle, presenter } = usePresenter();

  const [radioValue, setRadioValue] = useState(1);

  if (location.pathname === CAST_VIEW_PATH) {
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
                to={BIBLE_VIEW_PATH}
                className="nav-link"
                activeClassName="active"
              >
                <BsBook />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={ANTHEMNS_VIEW_PATH}
                className="nav-link"
                activeClassName="active"
              >
                <BsMusicNoteList />
              </NavLink>
            </li>
          </ul>

          <Button
            onClick={toggle}
            variant={presenter ? 'warning' : 'outline-light'}
          >
            {presenter ? <MdCastConnected /> : <MdCast />}
          </Button>

          {/* <ButtonGroup toggle>
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
          </ButtonGroup> */}
        </div>
      </nav>
    </>
  );
}
