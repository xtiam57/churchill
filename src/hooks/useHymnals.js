import { useIterate } from 'hooks';
import { HymnalsContext } from 'providers';
import { useContext } from 'react';
import { MOVEMENT } from 'values';

export function useHymnals() {
  const { hymnals, current, setCurrent, tags } = useContext(HymnalsContext);
  const [move] = useIterate(current, hymnals);

  const moveToNextHymnal = () => {
    const anthemnToGo = move(MOVEMENT.NEXT);
    setCurrent(anthemnToGo);
    return anthemnToGo;
  };

  const moveToPrevHymnal = () => {
    const anthemnToGo = move(MOVEMENT.PREV);
    setCurrent(anthemnToGo);
    return anthemnToGo;
  };

  const moveHymnal = (action = MOVEMENT.NEXT) => {
    return action === MOVEMENT.NEXT ? moveToNextHymnal() : moveToPrevHymnal();
  };

  return {
    hymnals,
    current,
    setCurrent,
    tags,
    moveHymnal,
  };
}
