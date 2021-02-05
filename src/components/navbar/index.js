import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsMusicNoteList, BsBook } from 'react-icons/bs';
import { RiSlideshow2Fill, RiStopFill } from 'react-icons/ri';
import { ANTHEMNS_VIEW_PATH, BIBLE_VIEW_PATH, CAST_VIEW_PATH } from 'values';
import { usePresenter } from 'hooks';

export function Navbar() {
  const location = useLocation();
  const { toggle, presenting } = usePresenter();

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
          </ul>

          <Button
            onClick={toggle}
            variant={presenting ? 'warning' : 'outline-light'}
          >
            {presenting ? <RiStopFill /> : <RiSlideshow2Fill />}
          </Button>
        </div>
      </nav>
    </>
  );
}
