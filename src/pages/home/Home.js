import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import {
  ImArrowLeft2,
  ImArrowRight2,
  ImLoop,
  ImPause2,
  ImPlay3,
} from 'react-icons/im';
import createPersistedState from 'use-persisted-state';

import {
  Alert,
  Controls,
  DisplayButton,
  List,
  Sidebar,
  Slider,
  Title,
  Wrapper,
} from 'components';
import { useBirthday, useIterate, useKeyUp, usePresenter } from 'hooks';
import { Slide } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';
import { getNotices } from './data';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function HomePage() {
  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const { current } = useBirthday();
  const [notices, setNotices] = useState(getNotices(current));
  const [notice, setNotice] = useState(notices[0]);
  const [autoplay, setAutoplay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [moveNotice] = useIterate(notice, notices);
  const { presenting } = usePresenter();

  useEffect(() => {
    if (notice.id === 1) {
      const notices = getNotices(current);
      setNotice(notices[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  useEffect(() => {
    setNotices((notices) => {
      const index = notices.findIndex((n) => n.title === 'Horarios');

      const schedules =
        settings?.schedules?.filter((entry) => entry.active) || [];

      notices[index] = {
        ...notices[index],
        slides: schedules.map((entry) =>
          Slide.create({
            text: `
                ${entry.name ? `${entry.name}/n` : ''}
                <b>${entry.day} ${entry.daySuffix ? entry.daySuffix : ''}</b>/n
                <strong class="fs-xl" style="line-height:1">
                  ${entry.hour} ${entry.hourSuffix}
                </strong>
              `,
          })
        ),
      };
      return [...notices];
    });
  }, [settings]);

  const handlePrevSlide = () => sliderRef.current.prev();

  const handleNextSlide = () => sliderRef.current.next();

  const handleNextNotice = () => {
    const notice = moveNotice(MOVEMENT.NEXT);
    setNotice(notice);
  };

  const handlePrevNotice = () => {
    const notice = moveNotice(MOVEMENT.PREV);
    setNotice(notice);
  };

  useKeyUp('ArrowUp', handlePrevNotice);
  useKeyUp('ArrowDown', handleNextNotice);
  useKeyUp('Space', () => setAutoplay((state) => !state));

  return (
    <Wrapper>
      <Sidebar>
        <Title>Inicio</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <List className="mb-4">
          <List.Item>
            <List.Title>Anuncios</List.Title>
          </List.Item>

          {notices.map((item) => (
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

      {presenting ? (
        <Alert presenting={!showLogo} label={notice?.title} />
      ) : null}

      <Wrapper direction="column" {...settings}>
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
