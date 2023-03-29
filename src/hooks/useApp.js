import { AppContext } from 'providers';
import { useContext } from 'react';

export function useApp() {
  const app = useContext(AppContext);

  return app;
}
