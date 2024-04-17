import { Route, Switch } from 'react-router-dom';

import { DefaultLayout } from 'layouts';
import { routes } from './routes';

export function RouteMapper() {
  return (
    <Switch style={{ gridArea: 'content' }}>
      {routes.map(({ key, layout: Layout = DefaultLayout, ...rest }) => {
        return <Layout key={key} {...rest} />;
      })}
      <Route>
        <h1>Not Found</h1>
      </Route>
    </Switch>
  );
}
