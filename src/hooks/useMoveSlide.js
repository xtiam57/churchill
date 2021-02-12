export function useMoveSlide(current, slides) {
  const moveToNextSlide = () => {
    const index = Math.min(current.index + 1, slides.length - 1);
    const slideToGo = slides[index];

    return slideToGo;
  };

  const moveToPrevSlide = () => {
    const index = Math.max(current.index - 1, 0);
    const slideToGo = slides[index];

    return slideToGo;
  };

  const moveSlide = (inc = 1) => {
    return inc > 0 ? moveToNextSlide() : moveToPrevSlide();
  };

  return {
    moveToNextSlide,
    moveToPrevSlide,
    moveSlide,
  };
}
