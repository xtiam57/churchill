import { Download } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { PATHS, routes } from 'router';
import { version } from 'version';
import { RoutesbarStyled } from './styled';

export function Routesbar() {
  const location = useLocation();
  const [isNewVersion, setIsNewVersion] = useState(false);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/xtiam57/churchill/refs/heads/main/docs/version.json'
    )
      .then((response) => {
        try {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        } catch (error) {
          console.error('Error fetching version:', error);
        }
      })
      .then((result) => {
        if (result?.version && result?.version !== version) {
          const currentVersion = version?.replaceAll('.', '');
          const newVersion = result.version.replaceAll('.', '');

          if (+newVersion > +currentVersion) {
            console.log('new version', newVersion, currentVersion);
            setIsNewVersion(true);
          }
        }
      });
  }, []);

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

      <div className="text-center">
        {isNewVersion && (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip> Nueva versión disponible</Tooltip>}
          >
            <Button
              onClick={() =>
                window.electronAPI?.openLink(
                  'https://xtiam57.github.io/churchill/'
                )
              }
              variant="secondary"
              className="px-2 bounce"
            >
              <Download />
            </Button>
          </OverlayTrigger>
        )}

        <small
          className="w-100 text-center py-2 d-block"
          style={{ cursor: 'default' }}
          onDoubleClick={async () => await window.electronAPI?.openDevTools()}
        >
          {version}
        </small>
      </div>
    </RoutesbarStyled>
  );
}
