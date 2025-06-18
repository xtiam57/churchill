import { useEffect, useState, useCallback } from 'react';
import {
  Alert,
  DisplayButton,
  List,
  Presenter,
  Sidebar,
  Title,
  Wrapper,
  Controls,
} from 'components';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  Refresh,
  FolderCopy,
  PlayArrow,
  Pause,
  Stop,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { BROADCAST } from 'values';
import createPersistedState from 'use-persisted-state';
import { usePresenter } from 'hooks';
const useBroadcast = createPersistedState(BROADCAST.CHANNEL);

const useSettings = createPersistedState(BROADCAST.SETTINGS);
const VIDEOS_PATH = 'Churchill/Recursos';

export default function VideosPage() {
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(null);
  const [showLogo, setShowLogo] = useState(true);
  const { presenting } = usePresenter();
  const [isLoading, setIsLoading] = useState(true);

  // Cargar video

  const handleLoad = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await window.electronAPI?.getVideos(VIDEOS_PATH);

      setVideos(result);
    } catch {
      setMessage(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);
  console.log(current);

  // Proyectar video o mostrar logo
  useEffect(() => {
    if (showLogo) {
      setMessage(null);
      // Enviar mensaje para mostrar logo (vacía el canal)
      /*window.electronAPI.sendBroadcastMessage({});*/
    } else if (current) {
      setMessage(current);
    }
  }, [showLogo, current, setMessage]);

  // Controles de reproducción
  const handleControl = (action, time) => {
    window.electronAPI.sendVideoControl({ action, time });
  };

  // Abrir carpeta de videos
  const handleOpenFolder = () => {
    window.electronAPI.invoke('open-directory', VIDEOS_PATH);
  };

  return (
    <Wrapper>
      <Sidebar>
        <Title>Videos</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting && current}
          onToggle={setShowLogo}
        />

        <div
          className="d-flex align-items-center mb-2"
          style={{ gap: '.5rem' }}
        >
          <div style={{ flex: 1 }}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Recargar videos</Tooltip>}
            >
              <Button block size="lg" variant="success" onClick={handleLoad}>
                <Refresh /> Recargar
              </Button>
            </OverlayTrigger>
          </div>
        </div>

        <Button
          variant="link"
          className="text-muted p-0 text-small mb-4"
          onClick={handleOpenFolder}
        >
          <FolderCopy fontSize="small" />{' '}
          <small>Abrir directorio de videos</small>
        </Button>

        <List>
          {videos.length ? (
            <List.Item className="mb-1">
              <List.Title>Listado de videos</List.Title>
            </List.Item>
          ) : null}

          {isLoading ? (
            <small className="text-secondary">Cargando videos...</small>
          ) : (
            videos.map((video) => (
              <List.Image
                key={video.id}
                onClick={() => setCurrent(video)}
                src={null}
                title={video.title}
                description={video.createdAt}
                active={current?.id === video.id}
                icon={<PlayArrow />}
                disabled={!showLogo && presenting}
              />
            ))
          )}
        </List>
      </Sidebar>
      {presenting ? (
        <Alert
          presenting={!showLogo}
          label={current?.title ?? 'No hay recursos que mostrar.'}
        />
      ) : null}

      <Wrapper direction="column" {...settings}>
        {current ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <video
              src={`file:///${encodeURI(current.filePath.replace(/\\/g, '/'))}`}
              controls
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                marginBottom: 8,
                background: '#000',
              }}
            />
          </div>
        ) : (
          <Presenter
            id={current?.id ?? 'MISC_404'}
            live={!showLogo}
            bg={current?.filePath}
            type="resource"
            text={!!current ? undefined : 'No hay recursos que mostrar.'}
            grayscale={presenting && showLogo}
            {...settings}
          />
        )}
        <Controls>
          <div className="d-flex justify-content-center">
            <div>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Reproducir</Tooltip>}
              >
                <Button
                  variant="success"
                  onClick={() => handleControl('play')}
                  className="me-1"
                  disabled={showLogo}
                >
                  <PlayArrow />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Pause</Tooltip>}
              >
                <Button
                  variant="warning"
                  onClick={() => handleControl('pause')}
                  className="me-1"
                  disabled={showLogo}
                >
                  <Pause />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={<Tooltip>Stop</Tooltip>}>
                <Button
                  variant="danger"
                  onClick={() => handleControl('stop')}
                  className="me-1"
                  disabled={showLogo}
                >
                  <Stop />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Adelantar</Tooltip>}
              >
                <Button
                  variant="info"
                  onClick={() => {
                    const min = prompt(
                      'Minuto a saltar (ej: 1.5 para 1:30):',
                      '0'
                    );
                    if (min !== null)
                      handleControl('seek', parseFloat(min) * 60);
                  }}
                  disabled={showLogo}
                >
                  <KeyboardDoubleArrowRight />
                </Button>
              </OverlayTrigger>
            </div>
          </div>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
