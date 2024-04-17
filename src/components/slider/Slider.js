import { Presenter } from 'components';
import { useIterate, useKeyUp } from 'hooks';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import { BROADCAST, MOVEMENT } from 'values';
import { SummaryStyled } from './styled';

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
      marquee,
    },
    ref
  ) => {
    const type = wrapper?.type;
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      let interval = null;
      if (autoplay) {
        interval = setInterval(() => {
          const slideToGo = moveSlide(MOVEMENT.NEXT, loop);
          setSlide(slideToGo);
        }, (type === 'trivia' ? settings.triviainterval : settings.interval) || 20000);
      }
      return () => clearInterval(interval);
    }, [
      autoplay,
      loop,
      moveSlide,
      settings.interval,
      settings.triviainterval,
      type,
    ]);

    useKeyUp('ArrowLeft', onPrevSlide);
    useKeyUp('ArrowRight', onNextSlide);

    return (
      <>
        <Presenter
          live={live}
          id={slide?.id || slide?.index}
          text={slide?.text}
          subtext={slide?.subtext}
          bg={slide?.bg}
          grayscale={grayscale}
          leftshadow={loop ? true : slide?.index !== 0}
          rightshadow={loop ? true : next.id !== slide.id}
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

        <SummaryStyled className="text-white bg-dark py-2 px-3">
          <small className="text-nowrap">{children}</small>

          {marquee ? (
            <div className="marquee small">
              <p className="m-0">{marquee}</p>
            </div>
          ) : (
            <div />
          )}

          <small className="text-nowrap text-right">
            {slide?.index + 1}/{slides?.length}
            {slides?.length > 1 ? (
              <>
                {' '}
                &middot;{' '}
                <strong className="text-light">
                  {Math.round(
                    (((slide.index + 1) / slides.length) * 100 +
                      Number.EPSILON) *
                      100
                  ) / 100}
                  %
                </strong>
              </>
            ) : null}
          </small>
        </SummaryStyled>
      </>
    );
  }
);
