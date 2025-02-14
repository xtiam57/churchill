import {
  East,
  Pause,
  PlayArrow,
  Repeat,
  Settings,
  West,
} from '@mui/icons-material';
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
import { useApp, useBirthday, useIterate, useKeyUp, usePresenter } from 'hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { Slide, combineLists } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';
import { getNotices, getScheduleText } from './data';

const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useSchedule = createPersistedState(BROADCAST.SCHEDULES_AND_EVENTS);

export default function HomePage() {
  const sliderRef = useRef();
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [showLogo, setShowLogo] = useState(true);
  const { current: birthdays } = useBirthday();
  const [notices, setNotices] = useState(getNotices(birthdays));
  const [notice, setNotice] = useState(notices[0]);
  const [autoplay, setAutoplay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [moveNotice] = useIterate(notice, notices);
  const { presenting } = usePresenter();
  const { openSchedule, refreshSchedules } = useApp();

  const schedulesSubs = useMemo(() => {
    const list = refreshSchedules?.filter((entry) => entry.active) || [];

    const subset = list.map((entry, index) => {
      return {
        id: notices.length + index + 1,
        index: notices.length + index,
        tag: 'SCHEDULES_SUBITEM',
        type: 'notice_subitem',
        title: entry.name || 'Sin título',
        slides: [
          Slide.create({
            text: getScheduleText(entry),
            bg: entry.background,
          }),
        ],
      };
    });

    return subset;
  }, [refreshSchedules, notices]);

  useEffect(() => {
    if (notice.id === 1) {
      const notices = getNotices(birthdays);
      setNotice(notices[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthdays]);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  useEffect(() => {
    setNotices((notices) => {
      const index = notices.findIndex((n) => n.tag === 'SCHEDULES');
      const list =
        refreshSchedules?.filter((entry) => entry.active && !entry.repeat) ??
        [];
      const repeatList =
        refreshSchedules?.filter((entry) => entry.active && entry.repeat) ?? [];
      const combined = combineLists(
        list,
        repeatList,
        repeatList.map((entry) => entry.repeat)
      );
      const slides = combined.map((entry) => {
        return Slide.create({
          text: getScheduleText(entry),
          bg: entry.background,
        });
      });

      if (birthdays.count > 0) {
        slides.push(birthdays);
      }

      notices[index] = {
        ...notices[index],
        slides:
          slides.length > 0
            ? slides
            : [
                Slide.create({
                  id: 'BS_404',
                  text: `No hay anuncios que mostrar.`,
                  type: 'notice',
                  count: 0,
                }),
              ],
      };

      // Update current notice if SCHEDULES% is selected
      setNotice((prev) =>
        prev.tag.startsWith('SCHEDULES') ? notices[index] : prev
      );

      return [...notices];
    });
  }, [refreshSchedules, birthdays]);

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
            <List.Title>Mensajes generales</List.Title>
          </List.Item>

          {notices.map((item) =>
            item.tag === 'BIRTHDAYS' && birthdays.count === 0 ? null : (
              <List.Item key={item.id}>
                <List.Action
                  active={item.id === notice.id}
                  onClick={() => setNotice(item)}
                >
                  {item.title}
                </List.Action>

                {item.tag === 'BIRTHDAYS' && (
                  <List.Text>({birthdays.count})</List.Text>
                )}

                {item.openSchedule && (
                  <List.Action
                    style={{ flex: '0 1 20px' }}
                    onClick={() => openSchedule()}
                    className="text-right"
                  >
                    <Settings fontSize="small" />
                  </List.Action>
                )}
              </List.Item>
            )
          )}

          {schedulesSubs.length > 0 && (
            <>
              <List.Item className="mt-4">
                <List.Title>Listado de anuncios</List.Title>
              </List.Item>

              {schedulesSubs.map((item) => (
                <List.Item key={item.id}>
                  <List.Action
                    active={item.id === notice.id}
                    onClick={() => setNotice(item)}
                  >
                    {item.title}
                  </List.Action>
                </List.Item>
              ))}
            </>
          )}
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
