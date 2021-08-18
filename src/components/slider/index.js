import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import createPersistedState from 'use-persisted-state';

import { Presenter } from 'components/presenter';
import { useIterate, useKeyUp } from 'hooks';
import { BROADCAST, MOVEMENT } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export const Slider = forwardRef(
  (
    {
      children = (
        <span>
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de página.
        </span>
      ),
      wrapper,
      live = false,
      autoplay = false,
      loop = false,
      grayscale = false,
    },
    ref
  ) => {
    const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
    const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);

    const [slides, setSlides] = useState(wrapper?.slides || []);
    const [slide, setSlide] = useState(slides[0]);
    const [moveSlide] = useIterate(slide, slides);
    const next = moveSlide(MOVEMENT.NEXT, loop);

    const onNextSlide = () => {
      const slideToGo = moveSlide(MOVEMENT.NEXT, loop);
      setSlide(slideToGo);
    };

    const onPrevSlide = () => {
      const slideToGo = moveSlide(MOVEMENT.PREV, loop);
      setSlide(slideToGo);
    };

    useImperativeHandle(ref, () => ({
      next: onNextSlide,
      prev: onPrevSlide,
    }));

    useEffect(() => {
      setSlides(wrapper?.slides);
      setSlide(wrapper?.slides[0]);
    }, [wrapper]);

    useEffect(() => {
      setMessage(live ? slide : null);
    }, [slide, live, setMessage]);

    useEffect(() => {
      return () => setMessage(null);
    }, []);

    useEffect(() => {
      let interval = null;
      if (autoplay) {
        interval = setInterval(() => {
          const slideToGo = moveSlide(MOVEMENT.NEXT, loop);
          setSlide(slideToGo);
        }, settings.interval || 1000);
      }
      return () => clearInterval(interval);
    }, [autoplay, loop, moveSlide, settings.interval]);

    useKeyUp('ArrowLeft', onPrevSlide);
    useKeyUp('ArrowRight', onNextSlide);

    return (
      <>
        <Presenter
          live={live}
          id={slide?.id || slide?.index}
          text={slide?.text}
          subtext={slide?.subtext}
          grayscale={grayscale}
          {...settings}
        />

        {/* {settings?.preview ? (
          <SlidePreviewStyled className={next.id === slide.id ? 'hide' : ''}>
            <Presenter
              id={next?.id || next?.index}
              text={next?.text}
              subtext={next?.subtext}
            />
          </SlidePreviewStyled>
        ) : null} */}

        <div className="text-light bg-dark py-2 px-3 d-flex justify-content-between">
          <small>{children}</small>
          <small>
            {slide?.index + 1}/{slides?.length}
          </small>
        </div>
      </>
    );
  }
);
