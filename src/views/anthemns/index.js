import React, { useState, useRef, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

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

  function onTypeaheadChange(event) {
    setAnthemnSelection(event);

    if (event.length) {
      const [anthemn] = event;
      setAnthemn(anthemn);
      console.log(anthemn);
      setSlide(anthemn.slides[0]);
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
  };

  const onNextAnthemn = () => {
    const anthemn = moveAnthemn(1);
    setAnthemnSelection([anthemn]);
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
