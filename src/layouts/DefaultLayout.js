import { Route } from 'react-router-dom';

export function DefaultLayout({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}
