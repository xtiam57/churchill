import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { PATHS, routes } from 'router';
import { RoutesbarStyled } from './styled';

export function Routesbar() {
  const location = useLocation();

  if (location.pathname === PATHS.CAST_PAGE) {
    return null;
  }

  return (
    <RoutesbarStyled>
      <ul>
        {routes
          .filter((route) => route.menu)
          .map((route, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={route.path}
                exact={route.exact}
                className="nav-link text-dark"
                activeClassName="active"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id={route.key}>{route.label}</Tooltip>}
                >
                  {route.icon}
                </OverlayTrigger>
              </NavLink>
            </li>
          ))}
      </ul>
    </RoutesbarStyled>
  );
}
