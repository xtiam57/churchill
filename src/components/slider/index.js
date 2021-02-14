import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';

import { Presenter } from 'components/presenter';
import { useIterate, useKeyDown } from 'hooks';
import { CHANNEL_NAME, SETTINGS_NAME, SETTINGS_INITIAL_STATE } from 'values';

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

export function Slider({
  children = (
    <span>
      Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
      cambiar de página.
    </span>
  ),
  wrapper,
  value = null,
  onChange = () => {},
  live = false,
  autoplay = false,
  loop = false,
  ...rest
}) {
  const [, setMessage] = useBroadcast(null);
  const [settings] = useSettings(SETTINGS_INITIAL_STATE);

  const [slides, setSlides] = useState(wrapper?.slides || []);
  const [slide, setSlide] = useState(slides[0]);
  const [moveSlide] = useIterate(slide, slides);

  const onNextSlide = () => {
    const slideToGo = moveSlide(1, loop);
    setSlide(slideToGo);
  };

  const onPrevSlide = () => {
    const slideToGo = moveSlide(-1, loop);
    setSlide(slideToGo);
  };

  useEffect(() => {
    setSlides(wrapper?.slides);
    setSlide(wrapper?.slides[0]);
  }, [wrapper]);

  useEffect(() => {
    onChange(slide);
  }, [slide, onChange]);

  useEffect(() => {
    if (value) {
      setSlide(value);
    }
  }, [value]);

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
        const slideToGo = moveSlide(1, loop);
        setSlide(slideToGo);
      }, settings.interval || 1000);
    }
    return () => clearInterval(interval);
  }, [autoplay, loop, moveSlide, settings.interval]);

  useKeyDown('ArrowLeft', onPrevSlide);
  useKeyDown('ArrowRight', onNextSlide);

  return (
    <>
      <Presenter live={live} subtext={slide?.subtext} {...settings}>
        {slide?.text}
      </Presenter>

      <div className="text-muted bg-white py-2 px-3 d-flex justify-content-between">
        <small>{children}</small>
        <small>
          {slide?.index + 1}/{slides?.length}
        </small>
      </div>
    </>
  );
}
