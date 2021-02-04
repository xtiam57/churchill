import { useContext } from 'react';
import { ViewContext } from 'providers/view';

export function useView() {
  const { view, setView } = useContext(ViewContext);
  return { view, setView };
}
