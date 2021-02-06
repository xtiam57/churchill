import React, { useState, useRef, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import useSound from 'use-sound';

import { Presenter } from 'components/presenter';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';

import {
  useAnthemns,
  useAnthemn,
  useMoveAnthemn,
  useMoveSlide,
  usePresenter,
  useChannel,
} from 'hooks';
import { Controls } from 'components/controls';

export default function AnthemnsView() {
  const { anthemns } = useAnthemns();
  const { anthemn, setAnthemn } = useAnthemn();
  const { moveSlide, slide, setSlide } = useMoveSlide();
  const { moveAnthemn } = useMoveAnthemn();
  const { setLastBroadcast } = usePresenter();

  const [showLogo, setShowLogo] = useState(true);
  const [anthemnSelection, setAnthemnSelection] = useState([anthemn]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const channel = useChannel();
  const ref = useRef();

  const [url, setUrl] = useState(`himnos/${anthemn.number}.mp3`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop, pause, sound }] = useSound(url, {
    interrupt: false,
    onload: () => {
      console.log('loaded', sound);
    },
  });

  useEffect(() => {
    return () => {
      setLastBroadcast(null);
      channel.postMessage(null);
      channel.close();
    };
  }, [channel, setLastBroadcast]);

  useEffect(() => {
    const value = showLogo ? null : slide;

    setLastBroadcast(value);
    channel.postMessage(value);
  }, [slide, channel, setLastBroadcast, showLogo]);

  useEffect(() => {
    sound?.on('play', () => setIsPlaying(true));
    sound?.on('stop', () => setIsPlaying(false));
    sound?.on('end', () => setIsPlaying(false));
    sound?.on('pause', () => setIsPlaying(false));
  }, [sound]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  function onTypeaheadChange(event) {
    setAnthemnSelection(event);

    if (event.length) {
      const [anthemn] = event;
      setAnthemn(anthemn);
      setSlide(anthemn.slides[0]);
      stop();
      setUrl(`himnos/${anthemn.number}.mp3`);
      ref.current.blur();
    }
  }

  const onPrevVerse = () => {
    const slide = moveSlide(-1);
  };

  const onNextVerse = () => {
    const slide = moveSlide(1);
  };

  const onPrevAnthemn = () => {
    const anthemn = moveAnthemn(-1);
    setAnthemnSelection([anthemn]);
    stop();
    setUrl(`himnos/${anthemn.number}.mp3`);
  };

  const onNextAnthemn = () => {
    const anthemn = moveAnthemn(1);
    setAnthemnSelection([anthemn]);
    stop();
    setUrl(`himnos/${anthemn.number}.mp3`);
  };

  const onFocusTypeahead = () => {
    ref.current.focus();
  };

  const toggleLogo = () => {
    setShowLogo((value) => !value);
  };

  return (
    <Wrapper>
      <Sidebar>
        {sound ? 'cancion' : 'no cancion'}
        {isPlaying ? (
          <>
            <Button onClick={() => pause()}>Pause</Button>
            <Button onClick={() => stop()}>Stop</Button>
          </>
        ) : (
          <Button onClick={() => play()}>Play</Button>
        )}
        <Typeahead
          emptyLabel="No existe esa opcion."
          highlightOnlyResult={true}
          id="combo"
          labelKey="title"
          minLength={0}
          onChange={onTypeaheadChange}
          onFocus={(e) => e.target.select()}
          options={anthemns}
          paginate={true}
          paginationText="Ver más opciones..."
          placeholder="Selecciona un versículo..."
          ref={ref}
          selected={anthemnSelection}
          size="large"
        />
      </Sidebar>

      <Wrapper direction="column">
        <Alert className="m-0" variant={showLogo ? 'secondary ' : 'warning'}>
          <div className="d-flex align-items-center justify-content-between">
            {showLogo ? (
              <span>
                Actualmente <strong>NO</strong> se está mostrando el himno al
                público.
              </span>
            ) : (
              <span>
                Actualmente se está mostrando el himno{' '}
                <strong>{anthemn.title}</strong> al público.
              </span>
            )}
            <Button
              size="sm"
              variant={showLogo ? 'secondary' : 'warning'}
              onClick={toggleLogo}
            >
              {showLogo ? 'Mostrar' : 'No Mostrar'}
            </Button>
          </div>
        </Alert>

        <Presenter live={!showLogo}>{slide.text}</Presenter>

        <Controls
          onKeyLeft={onPrevVerse}
          onKeyRight={onNextVerse}
          onKeyUp={onNextAnthemn}
          onKeyDown={onPrevAnthemn}
          onKeyF1={onFocusTypeahead}
        >
          <ButtonGroup>
            <Button onClick={onPrevVerse} variant="secondary">
              <ImArrowLeft2 />
            </Button>

            <Button onClick={onNextVerse} variant="secondary">
              <ImArrowRight2 />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
