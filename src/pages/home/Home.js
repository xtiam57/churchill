import React, { useState, useRef, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, ButtonGroup } from 'react-bootstrap';
import * as ImIcons from 'react-icons/im';

import { Slider } from 'components/slider';
import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { List } from 'components/list';
import { Info } from 'components/info';

import { useKeyUp, useIterate, usePresenter } from 'hooks';
import { BROADCAST, MOVEMENT } from 'values';
import { NOTICES } from './notices';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function HomePage() {
  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const [notice, setNotice] = useState(NOTICES[0]);
  const [autoplay, setAutoplay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [moveNotice] = useIterate(notice, NOTICES);
  const { presenting } = usePresenter();

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const onPrevSlide = () => sliderRef.current.prev();

  const onNextSlide = () => sliderRef.current.next();

  const onNextNotice = () => {
    const notice = moveNotice(MOVEMENT.NEXT);
    setNotice(notice);
  };

  const onPrevNotice = () => {
    const notice = moveNotice(MOVEMENT.PREV);
    setNotice(notice);
  };

  useKeyUp('ArrowUp', onPrevNotice);
  useKeyUp('ArrowDown', onNextNotice);
  useKeyUp('Space', () => setAutoplay((state) => !state));

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Inicio</h1>

        <Button
          className={showLogo && presenting ? 'my-3 pulse' : 'my-3'}
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
          disabled={!presenting}
        >
          {showLogo ? 'Mostrar Anuncio' : 'Mostrar Logo'}
        </Button>

        <List className="mb-4">
          <List.Item>
            <List.Title>Anuncios</List.Title>
          </List.Item>

          {NOTICES.map((item) => (
            <List.Item key={item.id}>
              <List.Action
                active={item.id === notice.id}
                onClick={() => setNotice(item)}
              >
                {item.title}
              </List.Action>
            </List.Item>
          ))}
        </List>
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        {/* <Info live={!showLogo}>
          {showLogo ? (
            <>
              Actualmente <strong>NO</strong> se está mostrando el anuncio al
              público.
            </>
          ) : (
            <>
              Actualmente se está mostrando el anuncio{' '}
              <strong>{notice.title}</strong> al público.
            </>
          )}
        </Info> */}

        <Slider
          ref={sliderRef}
          live={!showLogo}
          wrapper={notice}
          autoplay={autoplay}
          loop={loop}
          grayscale={presenting && showLogo}
        >
          Usa las teclas <strong>&larr;</strong> y <strong>&rarr;</strong> para
          cambiar de página, y <strong>&uarr;</strong> y <strong>&darr;</strong>{' '}
          para cambiar de anuncio.
        </Slider>

        <Controls centered>
          <ButtonGroup className="mx-2">
            {autoplay ? (
              <Button onClick={() => setAutoplay(false)} variant="light">
                <ImIcons.ImStop2 />
              </Button>
            ) : (
              <Button onClick={() => setAutoplay(true)} variant="secondary">
                <ImIcons.ImPlay3 />
              </Button>
            )}
          </ButtonGroup>

          <ButtonGroup>
            <Button onClick={onPrevSlide} variant="secondary">
              <ImIcons.ImArrowLeft2 />
            </Button>
            <Button onClick={onNextSlide} variant="secondary">
              <ImIcons.ImArrowRight2 />
            </Button>
          </ButtonGroup>

          <ButtonGroup className="mx-2">
            <Button
              onClick={() => setLoop((state) => !state)}
              variant={loop ? 'light' : 'secondary'}
            >
              <ImIcons.ImLoop />
            </Button>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
