import { useIterate } from 'hooks';
import { HymnalContext } from 'providers';
import { useContext } from 'react';
import { MOVEMENT } from 'values';

export function useHymnal() {
  const { hymnal, current, setCurrent, tags, books } =
    useContext(HymnalContext);
  const [move] = useIterate(current, hymnal);

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
    hymnal,
    current,
    setCurrent,
    tags,
    books,
    moveHymnal,
  };
}
