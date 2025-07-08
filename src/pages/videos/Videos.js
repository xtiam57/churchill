import { Add, PlayArrow, Refresh } from '@mui/icons-material';
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
import { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useVideosOrder = createPersistedState('VIDEOS_ORDER');

export default function VideosPage() {
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [videos, setVideos] = useState([]);
  const [videosOrder, setVideosOrder] = useVideosOrder([]);
  const [showLogo, setShowLogo] = useState(true);
  const [current, setCurrent] = useState(null);
  const { presenting } = usePresenter();
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const applyOrder = useCallback(
    (videos) => {
      if (!videosOrder.length) {
        return videos;
      }
      // Ordena según VIDEOS_ORDER, los nuevos al final
      const ordered = videosOrder
        .map((id) => videos.find((r) => r.id === id))
        .filter(Boolean);
      const rest = videos.filter((r) => !videosOrder.includes(r.id));
      return [...ordered, ...rest];
    },
    [videosOrder]
  );

  const handleLoad = useCallback(() => {
    setIsLoading(true);

    window.electronAPI?.getVideos().then((videos) => {
      if (videos?.length) {
        const ordered = applyOrder(videos);
        setVideos(ordered);
        setCurrent((prev) => (prev === null ? ordered[0] : prev));
      }
      setIsLoading(false);
    });
  }, [applyOrder]);

  const handleDelete = useCallback(
    async (data) => {
      const fileName = `${data.title}.${data.extension}`;
      try {
        const result = await window.electronAPI?.deleteVideo(fileName);
        if (result.success) {
          setVideos((state) => {
            const newState = state.filter((item) => item.id !== data.id);
            setCurrent(newState[0] || null);
            return newState;
          });
          // Quitar el id eliminado del orden
          setVideosOrder((order) => order.filter((id) => id !== data.id));
        }
      } catch (e) {
        console.error('Error deleting video:', e);
      }
    },
    [setVideosOrder]
  );

  const handleOpenFolder = useCallback(async () => {
    const paths = await window.electronAPI.getPaths();
    window.electronAPI?.openDirectory(paths.VIDEOS_PATH);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(videos);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setVideos(reordered);
    setVideosOrder(reordered.map((r) => r.id));
  };

  useEffect(() => {
    if (videoRef.current) {
      window.electronAPI?.setVideoControl({
        action: videoRef.current.paused ? 'pause' : 'play',
        time: videoRef.current.currentTime,
      });

      setMessage(showLogo ? null : current);

      // Fix para actualizar la sync con el reproductor
      window.electronAPI?.setVideoControl({
        action: 'seek',
        time: videoRef.current.currentTime,
      });
    } else {
      setMessage(showLogo ? null : current);
    }
  }, [current, showLogo, setMessage]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const handleControls = useCallback((action) => {
    if (!videoRef.current) {
      return;
    }

    window.electronAPI?.setVideoControl({
      action,
      time: videoRef.current.currentTime,
    });
  }, []);

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
          className="d-flex align-items-center mb-4"
          style={{ gap: '.5rem' }}
        >
          <div style={{ flex: 1 }}>
            <Button
              block
              size="lg"
              variant="success"
              onClick={handleOpenFolder}
            >
              <Add /> Agregar
            </Button>
          </div>

          <div>
            <OverlayTrigger
              placement="top"
              size="lg"
              overlay={<Tooltip>Recargar videos</Tooltip>}
            >
              <Button size="lg" variant="outline-light" onClick={handleLoad}>
                <Refresh />
              </Button>
            </OverlayTrigger>
          </div>
        </div>

        <List>
          {videos.length ? (
            <List.Item className="mb-1">
              <List.Title>Listado de videos</List.Title>
            </List.Item>
          ) : null}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="resources">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    borderRadius: '0.5rem',
                    padding: snapshot.isDraggingOver ? '.5rem' : 0,
                    backgroundColor: snapshot.isDraggingOver
                      ? '#111111'
                      : 'var(--dark)',
                  }}
                >
                  {isLoading ? (
                    <small className="text-secondary">Cargando videos...</small>
                  ) : (
                    videos.map((video, index) => (
                      <Draggable
                        key={video.id}
                        draggableId={video.id}
                        index={index}
                      >
                        {(providedDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <List.Image
                              onClick={() => setCurrent(video)}
                              onDelete={() => handleDelete(video)}
                              title={video.title}
                              description={video.createdAt}
                              active={current?.id === video.id}
                              icon={<PlayArrow />}
                              disabled={!showLogo && presenting}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </List>
      </Sidebar>

      {presenting ? (
        <Alert
          presenting={!showLogo}
          label={current?.title ?? 'No hay videos que mostrar.'}
        />
      ) : null}

      <Wrapper direction="column" {...settings}>
        {current ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center w-100 h-100"
            style={{ outline: 'none' }}
          >
            <style>
              {`
                video::-webkit-media-controls-fullscreen-button {
                  display: none !important;
                }
                video::-moz-media-controls-fullscreen-button {
                  display: none !important;
                }
              `}
            </style>
            <video
              className="d-block w-100 h-100"
              ref={videoRef}
              src={current.path}
              controls
              preload="metadata"
              onPlay={() => handleControls('play')}
              onPause={() => handleControls('pause')}
              onSeeked={() => handleControls('seek')}
              style={{
                objectFit: 'contain',
                background: '#111',
              }}
            />
          </div>
        ) : (
          <Presenter
            id={current?.id ?? 'VID_404'}
            live={!showLogo}
            type="video"
            text={!!current ? undefined : 'No hay videos que mostrar.'}
            grayscale={presenting && showLogo}
            {...settings}
          />
        )}
      </Wrapper>
    </Wrapper>
  );
}
