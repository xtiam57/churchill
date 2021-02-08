import { useContext } from 'react';
import { AnthemnsContext } from 'providers/anthemns';

export function useAnthemn() {
  const { anthemns, song, setSong } = useContext(AnthemnsContext);
  return { anthemns, song, setSong };
}
