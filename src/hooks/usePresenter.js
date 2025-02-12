import { PresenterContext } from 'providers';
import { useContext } from 'react';

export function usePresenter() {
  const { toggle, close, reload, presenter, presenting, fetchMonitors } =
    useContext(PresenterContext);
  return { toggle, close, reload, presenter, presenting, fetchMonitors };
}
