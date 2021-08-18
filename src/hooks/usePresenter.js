import { useContext } from 'react';
import { PresenterContext } from 'providers';

export function usePresenter() {
  const { toggle, close, reload, presenter, presenting } =
    useContext(PresenterContext);
  return { toggle, close, reload, presenter, presenting };
}
