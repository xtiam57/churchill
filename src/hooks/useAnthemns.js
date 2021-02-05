import { useContext } from 'react';
import { AnthemnsContext } from 'providers/anthemns';

export function useAnthemns() {
  const { anthemns } = useContext(AnthemnsContext);
  return { anthemns };
}
