import { useContext } from 'react';
import { AnthemnsContext } from 'providers/anthemns';

export function useAnthemn() {
  const { anthemn, setAnthemn } = useContext(AnthemnsContext);
  return { anthemn, setAnthemn };
}
