import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';

import { Presenter } from 'components/presenter';
import { useMoveSlide, useKeyDown } from 'hooks';
import { CHANNEL_NAME, SETTINGS_NAME, SETTINGS_INITIAL_STATE } from 'values';

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

export function Slider({
  children,
  wrapper,
  extSlide = [null, () => {}],
  live = false,
  ...rest
}) {
  const [, setMessage] = useBroadcast(null);
  const [settings] = useSettings(SETTINGS_INITIAL_STATE);

  const [slides, setSlides] = useState(wrapper?.slides || []);
  const [slide, setSlide] = useState(slides[0]);
  const { moveSlide } = useMoveSlide(slide, slides);

  const [outSlide, setOutSlide] = extSlide;

  useEffect(() => {
    setSlides(wrapper?.slides);
    setSlide(wrapper?.slides[0]);
  }, [wrapper]);

  useEffect(() => {
    setOutSlide(slide);
  }, [slide, setOutSlide]);

  useEffect(() => {
    if (outSlide) {
      setSlide(outSlide);
    }
  }, [outSlide]);

  useEffect(() => {
    setMessage(live ? slide : null);
  }, [slide, live, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  const onNextSlide = () => {
    const slideToGo = moveSlide(1);
    setSlide(slideToGo);
  };

  const onPrevSlide = () => {
    const slideToGo = moveSlide(-1);
    setSlide(slideToGo);
  };

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
