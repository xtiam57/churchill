import { East, Pause, PlayArrow, Repeat, West } from '@mui/icons-material';
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
import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
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
            //  ${entry.daySuffix ? entry.daySuffix : ''}
            text: `
                ${entry.name ? `${entry.name}/n` : ''}
                <b>${entry.day}</b>/n
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
        <Title>Anuncios</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <List className="mb-4">
          <List.Item>
            <List.Title>Listado</List.Title>
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
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Pausar cambio automático</Tooltip>}
              >
                <Button onClick={() => setAutoplay(false)} variant="secondary">
                  <Pause />
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Empezar cambio automático</Tooltip>}
              >
                <Button onClick={() => setAutoplay(true)} variant="dark">
                  <PlayArrow />
                </Button>
              </OverlayTrigger>
            )}
          </ButtonGroup>

          <ButtonGroup>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Página anterior</Tooltip>}
            >
              <Button onClick={handlePrevSlide} variant="primary">
                <West />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Página siguiente</Tooltip>}
            >
              <Button onClick={handleNextSlide} variant="primary">
                <East />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>

          <ButtonGroup className="mx-2">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Repetir</Tooltip>}
            >
              <Button
                onClick={() => setLoop((state) => !state)}
                variant={loop ? 'secondary' : 'dark'}
              >
                <Repeat />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
