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
                className="nav-link text-white"
                activeClassName="active"
                title={route.label}
              >
                {route.icon}
                {/* {route.showLabel && <span> {route.label}</span>} */}
              </NavLink>
            </li>
          ))}
      </ul>
    </RoutesbarStyled>
  );
}
