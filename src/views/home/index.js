import React, { useState, useRef, useEffect } from 'react';
import { Typeahead, Highlighter } from 'react-bootstrap-typeahead';
import { Button, ButtonGroup, Alert, Form } from 'react-bootstrap';
import {
  ImArrowLeft2,
  ImArrowRight2,
  ImPlay3,
  ImStop2,
  ImLoop,
} from 'react-icons/im';
import useSound from 'use-sound';

import { Slider } from 'components/slider';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { Bookmark } from 'components/bookmark';
import { List } from 'components/list';
import { BookmarkList } from 'components/bookmarkList';

import {
  useAnthemn,
  useMoveAnthemn,
  useMoveSlide,
  useBirthday,
  useKeyDown,
} from 'hooks';
import { Time, getBookmarkedItems, Slide } from 'utils';

const notices = [
  {
    id: 0,
    index: 0,
    type: 'notice',
    title: 'Normas de comportamiento',
    slides: [
      Slide.create({ index: 0, title: null, text: 'lamina 1' }),
      Slide.create({ index: 1, title: null, text: 'lamina 2' }),
    ],
  },
  {
    id: 1,
    index: 1,
    type: 'notice',
    title: 'Prueba de anuncio',
    slides: [
      Slide.create({ index: 0, title: '#1', text: 'lamina 1' }),
      Slide.create({ index: 1, title: '#2', text: 'lamina 2' }),
      Slide.create({ index: 2, title: '#3', text: 'lamina 3' }),
    ],
  },
];

function HomeView() {
  const [showLogo, setShowLogo] = useState(true);

  const [notice, setNotice] = useState(notices[0]);
  const [slide, setSlide] = useState(notice.slides[0]);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const { moveSlide } = useMoveSlide(slide, notice.slides);

  useEffect(() => {
    setSlide(notice.slides[0]);
  }, [notice]);

  const onPrevSlide = () => {
    const slide = moveSlide(-1, loop);
    setSlide(slide);
  };

  const onNextSlide = () => {
    const slide = moveSlide(1, loop);
    setSlide(slide);
  };

  const onPrevNotice = () => {
    //  const notice = moveAnthemn(-1);
    //  setNotice(notice);
  };

  const onNextNotice = () => {
    //  const notice = moveAnthemn(1);
    //  setNotice(notice);
  };

  useKeyDown('ArrowUp', onNextNotice);
  useKeyDown('ArrowDown', onPrevNotice);

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Inicio</h1>

        <Button
          className="mt-3"
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
        >
          {showLogo ? 'Mostrar Anuncio' : 'Mostrar Logo'}
        </Button>

        <List>
          <List.Item>
            <List.Title>Anuncios</List.Title>
          </List.Item>

          {notices.map((item) => (
            <List.Item>
              <List.Action
                active={item.id === notice.id}
                key={item.id}
                onClick={() => setNotice(item)}
              >
                {item.title}
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      <Wrapper direction="column">
        <Alert className="m-0 br-0" variant="secondary">
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se está mostrando el himno al
              público.
            </>
          ) : (
            <>
              Actualmente se está mostrando el himno{' '}
              <strong>{notice.title}</strong> al público.
            </>
          )}
        </Alert>

        <Slider
          live={!showLogo}
          wrapper={notice}
          autoplay={autoplay}
          loop={loop}
          value={slide}
          onChange={setSlide}
        />

        <Controls centered>
          <ButtonGroup className="mx-2">
            {autoplay ? (
              <Button onClick={() => setAutoplay(false)} variant="light">
                <ImStop2 />
              </Button>
            ) : (
              <Button onClick={() => setAutoplay(true)} variant="secondary">
                <ImPlay3 />
              </Button>
            )}
          </ButtonGroup>

          <ButtonGroup>
            <Button onClick={onPrevSlide} variant="secondary">
              <ImArrowLeft2 />
            </Button>
            <Button onClick={onNextSlide} variant="secondary">
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

export default HomeView;
