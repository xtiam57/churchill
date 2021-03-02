import { MOVEMENT } from 'values';

export function useIterate(current, list) {
  const len = list.length;
  const lastIndex = len - 1;

  const next = (loop = false) => {
    if (!current.hasOwnProperty('index') || current.index === null) {
      current['index'] = list.findIndex(({ id }) => id === current.id);
    }

    let index = Math.min(current.index + 1, lastIndex);

    if (loop && current.index + 1 >= len) {
      index = 0;
    }

    const value = list[index];

    if (!value.hasOwnProperty('index') || value.index === null) {
      value['index'] = index;
    }

    return value;
  };

  const previous = (loop = false) => {
    if (!current.hasOwnProperty('index') || current.index === null) {
      current['index'] = list.findIndex(({ id }) => id === current.id);
    }

    let index = Math.max(current.index - 1, 0);

    if (loop && current.index - 1 < 0) {
      index = lastIndex;
    }

    const value = list[index];

    if (!value.hasOwnProperty('index') || value.index === null) {
      value['index'] = index;
    }

    return value;
  };

  const move = (action = MOVEMENT.NEXT, loop = false) => {
    return action === MOVEMENT.NEXT ? next(loop) : previous(loop);
  };

  return [move, previous, next];
}
