import { useContext } from 'react';
import { AnthemnsContext } from 'providers/anthemns';
import { useIterate } from 'hooks';

export function useMoveAnthemn() {
  const { anthemns, song, setSong } = useContext(AnthemnsContext);
  const [move] = useIterate(song, anthemns);

  const moveToNextAnthemn = () => {
    const anthemnToGo = move(1);
    setSong(anthemnToGo);
    return anthemnToGo;
  };

  const moveToPrevAnthemn = () => {
    const anthemnToGo = move(-1);
    setSong(anthemnToGo);
    return anthemnToGo;
  };

  const moveAnthemn = (inc = 1) => {
    return inc > 0 ? moveToNextAnthemn() : moveToPrevAnthemn();
  };

  return {
    moveToNextAnthemn,
    moveToPrevAnthemn,
    moveAnthemn,
  };
}
