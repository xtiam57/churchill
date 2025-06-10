import { Add, FolderCopy, Refresh } from '@mui/icons-material';
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
import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { ResourceModal } from './modal';

const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useResourceOrder = createPersistedState('RESOURCE_ORDER');

const FOLDER_PATH = 'Churchill\\Recursos';

export default function MiscPage() {
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [resources, setResources] = useState([]);
  const [resourceOrder, setResourceOrder] = useResourceOrder([]);
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [current, setCurrent] = useState(null);
  const { presenting } = usePresenter();
  const [isLoading, setIsLoading] = useState(true);

  const applyOrder = useCallback(
    (resources) => {
      if (!resourceOrder.length) {
        return resources;
      }
      // Ordena según RESOURCE_ORDER, los nuevos al final
      const ordered = resourceOrder
        .map((id) => resources.find((r) => r.id === id))
        .filter(Boolean);
      const rest = resources.filter((r) => !resourceOrder.includes(r.id));
      return [...ordered, ...rest];
    },
    [resourceOrder]
  );

  const handleLoad = useCallback(() => {
    setIsLoading(true);

    window.electronAPI?.getResources(FOLDER_PATH).then((images) => {
      if (images?.length) {
        const ordered = applyOrder(images);
        setResources(ordered);
        setCurrent((prev) => (prev === null ? ordered[0] : prev));
      }
      setIsLoading(false);
    });
  }, [applyOrder]);

  const handleSave = useCallback(
    (data) => {
      setShowModal(false);

      console.log('Saving resource:', data);

      try {
        window.electronAPI?.saveResource(
          FOLDER_PATH,
          `${data.title}.${data.extension}`,
          data.base64
        );
        handleLoad();
      } catch (error) {
        console.error('Error saving resource:', error);
      }
    },
    [handleLoad, setShowModal]
  );

  const handleDelete = useCallback(
    async (data) => {
      const fileName = `${data.title}.${data.extension}`;
      try {
        const result = await window.electronAPI?.deleteResource(
          FOLDER_PATH,
          fileName
        );
        if (result.success) {
          setResources((state) => {
            const newState = state.filter((item) => item.id !== data.id);
            setCurrent(newState[0] || null);
            return newState;
          });
          // Quitar el id eliminado del orden
          setResourceOrder((order) => order.filter((id) => id !== data.id));
        }
      } catch (e) {
        console.error('Error deleting resource:', e);
      }
    },
    [setResourceOrder]
  );

  const handleOpenFolder = useCallback(() => {
    window.electronAPI?.openDirectory(FOLDER_PATH);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(resources);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setResources(reordered);
    setResourceOrder(reordered.map((r) => r.id));
  };

  useEffect(() => {
    setMessage(showLogo ? null : current);
  }, [current, showLogo, setMessage]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <Wrapper>
      <Sidebar>
        <Title>Recursos</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <div
          className="d-flex align-items-center mb-2"
          style={{ gap: '.5rem' }}
        >
          <div style={{ flex: 1 }}>
            <Button
              block
              size="lg"
              variant="success"
              onClick={() => setShowModal(true)}
            >
              <Add /> Agregar
            </Button>{' '}
          </div>

          <div>
            <OverlayTrigger
              placement="top"
              size="lg"
              overlay={<Tooltip>Recargar recursos</Tooltip>}
            >
              <Button size="lg" variant="outline-light" onClick={handleLoad}>
                <Refresh />
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
          <small>Abrir directorio de recursos</small>
        </Button>

        <List>
          {resources.length ? (
            <List.Item className="mb-1">
              <List.Title>listado de recursos</List.Title>
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
                    <small className="text-secondary">
                      Cargando recursos...
                    </small>
                  ) : (
                    resources.map((resource, index) => (
                      <Draggable
                        key={resource.id}
                        draggableId={resource.id}
                        index={index}
                      >
                        {(providedDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <List.Image
                              onClick={() => setCurrent(resource)}
                              onDelete={() => handleDelete(resource)}
                              src={resource.bg}
                              title={resource.title}
                              description={resource.createdAt}
                              active={current?.id === resource.id}
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
      </Wrapper>

      <ResourceModal
        show={!!showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        resource={typeof showModal === 'boolean' ? undefined : showModal}
      />
    </Wrapper>
  );
}
