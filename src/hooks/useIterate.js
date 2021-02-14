export function useIterate(current, pages) {
  const next = (loop = false) => {
    let index = Math.min(current.index + 1, pages.length - 1);

    if (loop) {
      if (current.index + 1 >= pages.length) {
        index = 0;
      }
    }

    const page = pages[index];
    return page;
  };

  const previous = (loop = false) => {
    let index = Math.max(current.index - 1, 0);

    if (loop) {
      if (current.index - 1 < 0) {
        index = pages.length - 1;
      }
    }

    const page = pages[index];
    return page;
  };

  const move = (inc = 1, loop = false) => {
    return inc > 0 ? next(loop) : previous(loop);
  };

  return [move, previous, next];
}
