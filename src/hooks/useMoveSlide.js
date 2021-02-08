import { useContext } from 'react';
import { AnthemnsContext } from 'providers/anthemns';

export function useMoveSlide() {
  const { song, slide, setSlide } = useContext(AnthemnsContext);
  const { slides, length } = song;

  const moveToNextSlide = () => {
    const index = Math.min(slide.index + 1, length - 1);
    const slideToGo = slides[index];

    setSlide(slideToGo);

    return slideToGo;
  };

  const moveToPrevSlide = () => {
    const index = Math.max(slide.index - 1, 0);
    const slideToGo = slides[index];

    setSlide(slideToGo);

    return slideToGo;
  };

  const moveSlide = (inc = 1) => {
    return inc > 0 ? moveToNextSlide() : moveToPrevSlide();
  };

  return {
    moveToNextSlide,
    moveToPrevSlide,
    moveSlide,
    setSlide,
    slide,
  };
}
