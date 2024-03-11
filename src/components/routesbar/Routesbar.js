import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { routes } from 'router';
import { RoutesbarStyled } from './styled';

export function Routesbar() {
  return (
    <RoutesbarStyled>
      <ul>
        {routes
          .filter((route) => route.menu)
          .map((route, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={route.path}
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
