import { Add } from '@mui/icons-material';
import {
  Alert,
  DisplayButton,
  List,
  Presenter,
  Sidebar,
  Title,
  Wrapper,
} from 'components';
import { usePresenter } from 'hooks';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useResources = createPersistedState(BROADCAST.RESOURCES);

export default function MiscPage() {
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [resources, setResources] = useResources(BROADCAST.INITIAL_RESOURCES);
  const [showLogo, setShowLogo] = useState(true);
  const [current, setCurrent] = useState(null);
  const { presenting } = usePresenter();

  console.log('resources', resources);

  useEffect(() => {
    setMessage(showLogo ? null : current);
  }, [current, showLogo, setMessage]);

  return (
    <Wrapper>
      <Sidebar>
        <Title>Recursos</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <Button
          block
          size="lg"
          variant="success"
          className="mb-4"
          onClick={() => {}}
        >
          <Add /> Agregar
        </Button>

        <List>
          <List.Item className="mb-1">
            <List.Title>listado de recursos</List.Title>
          </List.Item>

          {resources.map((resource) => (
            <List.Image
              key={resource.id}
              onClick={() => setCurrent(resource)}
              onEdit={() => {}}
              src={resource.bg}
              title={resource.title}
              description={resource.description}
              active={current?.id === resource.id}
            />
          ))}
        </List>
      </Sidebar>

      {presenting ? (
        <Alert presenting={!showLogo} label={current?.title} />
      ) : null}

      <Wrapper direction="column" {...settings}>
        <Presenter
          id={current?.id}
          live={!showLogo}
          bg={current?.bg}
          grayscale={presenting && showLogo}
          {...settings}
        />

        {/* <Controls centered>
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
        </Controls> */}
      </Wrapper>
    </Wrapper>
  );
}
