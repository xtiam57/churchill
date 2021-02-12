import { useContext } from 'react';
import { AnthemnsContext } from 'providers/anthemns';

export function useAnthemn() {
  const { anthemns, song, setSong, folder } = useContext(AnthemnsContext);
  return { anthemns, song, setSong, folder };
}
