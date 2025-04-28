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
import { useIterate, useKeyUp, usePresenter } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { generateGUID } from 'utils';
import { BROADCAST, MOVEMENT } from 'values';
import { QUESTIONS } from '../trivia/data';
import { EntryContainer } from './components/EntryContainer';
import { EntryList } from './components/EntryList';

const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useResources = createPersistedState(BROADCAST.RESOURCES);

export default function ResourcesPage() {
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

  const [resources, setResources] = useResources(BROADCAST.INITIAL_RESOURCES);

  const handleResourcesChangeValue = (name, value, index) => {
    resources[index][name] = value;
    setResources([...resources]);
  };

  const handleAdd = () => {
    resources.push({
      id: generateGUID(),
      name: '',
      day: 'Domingo',
      hour: '01:00',
      hourSuffix: 'AM',
      type: 'SCHEDULE',
      background: null,
      date: null,
      active: true,
      repeat: 0,
    });

    setResources([...resources]);
  };

  const handleDelete = (index) => {
    resources.splice(index, 1);
    setResources([...resources]);
  };

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
        <Title>Recursos</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <List className="mb-4">
          <List.Item>
            <List.Title>listado</List.Title>
          </List.Item>

          <EntryContainer>
            <EntryList
              onDelete={handleDelete}
              onChangeValue={handleResourcesChangeValue}
              resources={resources}
            />
          </EntryContainer>
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
              <Button onClick={handleNextSlide}>
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
