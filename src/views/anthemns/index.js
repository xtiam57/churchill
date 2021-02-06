import React, { useState, useRef, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import {
  Button,
  ButtonGroup,
  Alert,
  ButtonToolbar,
  Form,
} from 'react-bootstrap';
import {
  ImArrowLeft2,
  ImArrowRight2,
  ImPlay3,
  ImStop2,
  ImVolumeHigh,
  ImMinus,
  ImVolumeMute,
} from 'react-icons/im';
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
import { msToTime } from 'utils';

const createAnthemnPath = (number) => `himnos/${number}.mp3`;

export default function AnthemnsView() {
  const { anthemns } = useAnthemns();
  const { anthemn, setAnthemn } = useAnthemn();
  const { moveSlide, slide, setSlide } = useMoveSlide();
  const { moveAnthemn } = useMoveAnthemn();
  const { setLastBroadcast } = usePresenter();

  const [showLogo, setShowLogo] = useState(true);
  const [anthemnSelection, setAnthemnSelection] = useState([anthemn]);
  const channel = useChannel();
  const ref = useRef();

  const [url, setUrl] = useState(createAnthemnPath(anthemn.number));
  const [isLoaded, setIsLoaded] = useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [volume, setVolume] = useState(1);
  const [play, { stop, duration, isPlaying }] = useSound(url, {
    volume,
    playbackRate,
    interrupt: true,
    onload: () => setIsLoaded(true),
    onloaderror: () => setIsLoaded(false),
  });

  useEffect(() => {
    stop();
    setUrl(createAnthemnPath(anthemn.number));
    setSlide(anthemn.slides[0]);
  }, [anthemn, setSlide, stop]);

  useEffect(() => {
    return () => {
      setLastBroadcast(null);
    };
  }, [setLastBroadcast]);

  useEffect(() => {
    return () => {
      channel.postMessage(null);
      channel.close();
    };
  }, [channel]);

  useEffect(() => {
    const value = showLogo ? null : slide;
    setLastBroadcast(value);
    channel.postMessage(value);
  }, [slide, channel, setLastBroadcast, showLogo]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  function onTypeaheadChange(event) {
    setAnthemnSelection(event);

    if (event.length) {
      const [anthemn] = event;
      setAnthemn(anthemn);
      ref.current.blur();
    }
  }

  const onPrevSlide = () => moveSlide(-1);

  const onNextSlide = () => moveSlide(1);

  const onPrevAnthemn = () => {
    const anthemn = moveAnthemn(-1);
    setAnthemnSelection([anthemn]);
  };

  const onNextAnthemn = () => {
    const anthemn = moveAnthemn(1);
    setAnthemnSelection([anthemn]);
  };

  const onTogglePlay = () => {
    if (isLoaded) {
      isPlaying ? stop() : play();
    }
  };

  const onFocusTypeahead = () => ref.current.focus();

  const toggleLogo = () => setShowLogo((value) => !value);

  return (
    <Wrapper>
      <Sidebar>
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
          onKeyLeft={onPrevSlide}
          onKeyRight={onNextSlide}
          onKeyUp={onNextAnthemn}
          onKeyDown={onPrevAnthemn}
          onKeyF1={onFocusTypeahead}
          onKeySpace={onTogglePlay}
        >
          {isLoaded ? (
            <div className="d-flex">
              <ImVolumeMute />
              <Form.Control
                type="range"
                value={volume}
                min="0"
                max="1"
                step="0.05"
                className="mx-2"
                onChange={(e) => setVolume(+e.target.value)}
              />
              <ImVolumeHigh />
            </div>
          ) : null}

          {isLoaded ? null : (
            <small>
              <span className="text-warning">
                Este himno <strong>NO</strong> dispone de pista.
              </span>{' '}
              Puedes agregar un archivo <i>.mp3</i> en la carpeta{' '}
              <strong>/himnos</strong>.
            </small>
          )}

          <div className="d-flex">
            {isLoaded ? (
              <>
                {/* <small className="navbar-text text-light">
                  Duración: {msToTime(duration)}
                </small> */}

                <ButtonGroup className="mx-2">
                  {isPlaying ? (
                    <Button onClick={() => stop()} variant="light">
                      <ImStop2 />
                    </Button>
                  ) : (
                    <Button onClick={() => play()} variant="secondary">
                      <ImPlay3 />
                    </Button>
                  )}
                </ButtonGroup>
              </>
            ) : null}

            <ButtonGroup>
              <Button onClick={onPrevSlide} variant="secondary">
                <ImArrowLeft2 />
              </Button>

              <Button onClick={onNextSlide} variant="secondary">
                <ImArrowRight2 />
              </Button>
            </ButtonGroup>
          </div>

          {isLoaded ? (
            <>
              {' '}
              <div className="d-flex">
                <Form.Control
                  type="range"
                  value={playbackRate}
                  min="0.5"
                  max="2"
                  step="0.1"
                  className="mx-2"
                  style={{ width: '80px' }}
                  onChange={(e) => {
                    setPlaybackRate(+e.target.value);
                    if (isPlaying) {
                      play();
                    }
                  }}
                />
                <small className="navbar-text">
                  x{Number.parseFloat(playbackRate).toFixed(1)}
                </small>
              </div>
            </>
          ) : null}
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
