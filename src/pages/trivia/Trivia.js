import React, { useState, useRef, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, ButtonGroup } from 'react-bootstrap';
import {
  ImPause2,
  ImPlay3,
  ImArrowLeft2,
  ImArrowRight2,
  ImLoop,
} from 'react-icons/im';

import {
  Slider,
  Sidebar,
  Wrapper,
  Controls,
  List,
  Title,
  DisplayButton,
  Alert,
} from 'components';
import { useKeyUp, useIterate, usePresenter } from 'hooks';
import { BROADCAST, MOVEMENT } from 'values';

import { QUESTIONS } from './data';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function TriviaPage() {
  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const [current, setCurrent] = useState(() => {
    QUESTIONS[0].shuffle();
    return QUESTIONS[0];
  });
  const [autoplay, setAutoplay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [moveNotice] = useIterate(current, QUESTIONS);
  const { presenting } = usePresenter();

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const handlePrevSlide = () => sliderRef.current.prev();

  const handleNextSlide = () => sliderRef.current.next();

  const handleNextNotice = () => {
    const trivia = moveNotice(MOVEMENT.NEXT);
    trivia.shuffle();
    setCurrent(trivia);
  };

  const handlePrevNotice = () => {
    const trivia = moveNotice(MOVEMENT.PREV);
    trivia.shuffle();
    setCurrent(trivia);
  };

  useKeyUp('ArrowUp', handlePrevNotice);
  useKeyUp('ArrowDown', handleNextNotice);
  useKeyUp('Space', () => setAutoplay((state) => !state));

  return (
    <Wrapper>
      <Sidebar>
        <Title>Trivia</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <List className="mb-4">
          <List.Item>
            <List.Title>Niveles de dificultad</List.Title>
          </List.Item>

          {QUESTIONS.map((item) => (
            <List.Item key={item.id}>
              <List.Action
                active={item.id === current.id}
                onClick={() => {
                  item.shuffle();
                  setCurrent(item);
                }}
              >
                {item.title}
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      {presenting ? <Alert presenting={!showLogo} label="preguntas" /> : null}

      <Wrapper direction="column" {...settings}>
        <Slider
          ref={sliderRef}
          live={!showLogo}
          wrapper={current}
          autoplay={autoplay}
          loop={loop}
          grayscale={presenting && showLogo}
        >
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de página, y <strong>&uarr;</strong> y <strong>&darr;</strong>{' '}
          para cambiar de pregunta.
        </Slider>
        <Controls centered>
          <ButtonGroup className="mx-2">
            {autoplay ? (
              <Button onClick={() => setAutoplay(false)} variant="light">
                <ImPause2 />
              </Button>
            ) : (
              <Button onClick={() => setAutoplay(true)} variant="secondary">
                <ImPlay3 />
              </Button>
            )}
          </ButtonGroup>

          <ButtonGroup>
            <Button onClick={handlePrevSlide} variant="secondary">
              <ImArrowLeft2 />
            </Button>
            <Button onClick={handleNextSlide} variant="secondary">
              <ImArrowRight2 />
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mx-2">
            <Button
              onClick={() => setLoop((state) => !state)}
              variant={loop ? 'light' : 'secondary'}
            >
              <ImLoop />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
