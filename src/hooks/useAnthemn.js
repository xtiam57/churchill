import { useContext } from 'react';
import { AnthemnsContext } from 'providers/anthemns';

export function useAnthemn() {
  const { anthemns, song, setSong, tags } = useContext(AnthemnsContext);
  return { anthemns, song, setSong, tags };
}
