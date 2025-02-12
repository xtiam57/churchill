import { PresenterContext } from 'providers';
import { useContext } from 'react';

export function usePresenter() {
  const { toggle, close, reload, presenting } = useContext(PresenterContext);
  return { toggle, close, reload, presenting };
}
