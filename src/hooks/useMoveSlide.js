export function useMoveSlide(current, slides) {
  const moveToNextSlide = (loop = false) => {
    let index = Math.min(current.index + 1, slides.length - 1);

    if (loop) {
      if (current.index + 1 >= slides.length) {
        index = 0;
      }
    }

    const slideToGo = slides[index];

    return slideToGo;
  };

  const moveToPrevSlide = (loop = false) => {
    let index = Math.max(current.index - 1, 0);

    if (loop) {
      if (current.index - 1 < 0) {
        index = slides.length - 1;
      }
    }

    const slideToGo = slides[index];

    return slideToGo;
  };

  const moveSlide = (inc = 1, loop = false) => {
    return inc > 0 ? moveToNextSlide(loop) : moveToPrevSlide(loop);
  };

  return {
    moveToNextSlide,
    moveToPrevSlide,
    moveSlide,
  };
}
