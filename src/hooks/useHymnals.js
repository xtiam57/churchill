import { useIterate } from 'hooks';
import { HymnalsContext } from 'providers';
import { useContext } from 'react';
import { MOVEMENT } from 'values';

export function useHymnals() {
  const { hymnals, current, setCurrent, tags } = useContext(HymnalsContext);
  const [move] = useIterate(current, hymnals);

  const moveToNextHymnal = () => {
    const hymnalToGo = move(MOVEMENT.NEXT);
    setCurrent(hymnalToGo);
    return hymnalToGo;
  };

  const moveToPrevHymnal = () => {
    const hymnalToGo = move(MOVEMENT.PREV);
    setCurrent(hymnalToGo);
    return hymnalToGo;
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
