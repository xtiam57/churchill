import { useContext } from 'react';
import { AnthemnsContext } from 'providers';
import { useIterate } from 'hooks';
import { MOVEMENT } from 'values';

export function useAnthemn() {
  const { anthemns, current, setCurrent, tags } = useContext(AnthemnsContext);
  const [move] = useIterate(current, anthemns);

  const moveToNextAnthemn = () => {
    const anthemnToGo = move(MOVEMENT.NEXT);
    setCurrent(anthemnToGo);
    return anthemnToGo;
  };

  const moveToPrevAnthemn = () => {
    const anthemnToGo = move(MOVEMENT.PREV);
    setCurrent(anthemnToGo);
    return anthemnToGo;
  };

  const moveAnthemn = (action = MOVEMENT.NEXT) => {
    return action === MOVEMENT.NEXT ? moveToNextAnthemn() : moveToPrevAnthemn();
  };

  return {
    anthemns,
    current,
    setCurrent,
    tags,
    moveAnthemn,
  };
}
