import {
  Add,
  Delete,
  East,
  Pause,
  PlayArrow,
  Repeat,
  West,
} from '@mui/icons-material';
import {
  Controls,
  DisplayButton,
  List,
  Presenter,
  Sidebar,
  Title,
  Wrapper,
} from 'components';
import { useDragReorder, usePresenter } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { generateGUID } from 'utils';
import { BROADCAST } from 'values';
import { AddResourceModal } from './AddResourceModal';
import { PlaylistItemRow } from './PlaylistItemRow';
import { usePlaylistPlayer } from './usePlaylistPlayer';

const useSettings = createPersistedState(BROADCAST.SETTINGS);
const usePlaylists = createPersistedState('PLAYLISTS');
const useSelectedPlaylist = createPersistedState('SELECTED_PLAYLIST');

export default function PlaylistPage() {
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [playlists, setPlaylists] = usePlaylists([]);
  const [selectedId, setSelectedId] = useSelectedPlaylist(null);
  const [showLogo, setShowLogo] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const { presenting } = usePresenter();

  const playlist = playlists.find((p) => p.id === selectedId) || playlists[0] || null;

  const [items, setItems] = useState(playlist?.items ?? []);

  useEffect(() => {
    setItems(playlist?.items ?? []);
  }, [playlist]);

  useEffect(() => {
    if (!playlists.length) {
      return;
    }

    if (!playlists.some((p) => p.id === selectedId)) {
      setSelectedId(playlists[0].id);
    }
  }, [playlists, selectedId, setSelectedId]);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const updatePlaylist = (id, updater) => {
    setPlaylists((state) => state.map((p) => (p.id === id ? updater(p) : p)));
  };

  const handleCreateList = () => {
    const name = newListName.trim();

    if (!name) {
      return;
    }

    const list = { id: generateGUID(), name, loop: false, items: [] };

    setPlaylists((state) => [...state, list]);
    setSelectedId(list.id);
    setNewListName('');
  };

  const handleRenameList = (name) => {
    if (!playlist) {
      return;
    }

    updatePlaylist(playlist.id, (p) => ({ ...p, name }));
  };

  const handleDeleteList = () => {
    if (!playlist) {
      return;
    }

    setPlaylists((state) => state.filter((p) => p.id !== playlist.id));
    setSelectedId(null);
  };

  const handleToggleLoop = () => {
    if (!playlist) {
      return;
    }

    updatePlaylist(playlist.id, (p) => ({ ...p, loop: !p.loop }));
  };

  const handleAddItem = (resource) => {
    if (!playlist) {
      return;
    }

    const item = { entryId: generateGUID(), enabled: true, ...resource };

    updatePlaylist(playlist.id, (p) => ({ ...p, items: [...p.items, item] }));
  };

  const handleToggleItem = (entryId) => {
    if (!playlist) {
      return;
    }

    updatePlaylist(playlist.id, (p) => ({
      ...p,
      items: p.items.map((item) =>
        item.entryId === entryId ? { ...item, enabled: !item.enabled } : item
      ),
    }));
  };

  const handleDeleteItem = (entryId) => {
    if (!playlist) {
      return;
    }

    updatePlaylist(playlist.id, (p) => ({
      ...p,
      items: p.items.filter((item) => item.entryId !== entryId),
    }));
  };

  const { isDraggingOver, getItemProps } = useDragReorder({
    items,
    onChange: setItems,
    onDrop: (ordered) =>
      playlist && updatePlaylist(playlist.id, (p) => ({ ...p, items: ordered })),
  });

  const activeItems = useMemo(
    () =>
      items
        .filter((item) => item.enabled)
        .map((item) => ({ ...item, id: item.entryId })),
    [items]
  );

  const player = usePlaylistPlayer({
    items: activeItems,
    loop: playlist?.loop ?? false,
    interval: settings.interval,
    live: !showLogo,
  });

  return (
    <Wrapper>
      <Sidebar>
        <Title>Presentación</Title>

        <div className="d-flex align-items-center mb-4" style={{ gap: '.5rem' }}>
          <Form.Control
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Nombre de la nueva lista"
          />
          <Button
            variant="success"
            onClick={handleCreateList}
            disabled={!newListName.trim()}
          >
            <Add />
          </Button>
        </div>

        <DisplayButton
          value={showLogo}
          presenting={presenting && !!player.current}
          onToggle={setShowLogo}
        />

        <div className="d-flex align-items-center mb-2" style={{ gap: '.5rem' }}>
          <Form.Control
            as="select"
            value={playlist?.id ?? ''}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {!playlists.length && <option value="">Sin listas</option>}
            {playlists.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Form.Control>

          {playlist ? (
            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar lista</Tooltip>}>
              <Button variant="outline-light" onClick={handleDeleteList}>
                <Delete fontSize="small" />
              </Button>
            </OverlayTrigger>
          ) : null}
        </div>

        {playlist ? (
          <Form.Control
            className="mb-4"
            value={playlist.name}
            onChange={(e) => handleRenameList(e.target.value)}
            placeholder="Nombre de la lista"
          />
        ) : null}

        {playlist ? (
          <>
            <Button
              block
              size="lg"
              variant="success"
              className="mb-4"
              onClick={() => setShowAddModal(true)}
            >
              <Add /> Agregar recurso
            </Button>

            <List>
              {items.length ? (
                <List.Item className="mb-1">
                  <List.Title>{playlist.name}</List.Title>
                </List.Item>
              ) : null}

              <div
                style={{
                  borderRadius: '0.5rem',
                  padding: isDraggingOver ? '.5rem' : 0,
                  backgroundColor: isDraggingOver ? '#111111' : 'transparent',
                }}
              >
                {items.length ? (
                  items.map((item, index) => (
                    <div key={item.entryId} {...getItemProps(index)}>
                      <PlaylistItemRow
                        item={item}
                        active={player.current?.id === item.entryId}
                        onSelect={() => player.goto(item.entryId)}
                        onToggle={() => handleToggleItem(item.entryId)}
                        onDelete={() => handleDeleteItem(item.entryId)}
                      />
                    </div>
                  ))
                ) : (
                  <small className="text-secondary">
                    Esta lista no tiene recursos. Agrega un versículo, video o
                    imagen.
                  </small>
                )}
              </div>
            </List>
          </>
        ) : (
          <small className="text-secondary">
            Crea una lista para empezar a agregar recursos.
          </small>
        )}
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        {player.current?.type === 'video' ? (
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
              ref={player.videoRef}
              src={player.current.path}
              controls
              preload="metadata"
              onPlay={() => player.handleControls('play')}
              onPause={() => player.handleControls('pause')}
              onSeeked={() => player.handleControls('seek')}
              onEnded={player.next}
              style={{
                objectFit: 'contain',
                background: '#111',
              }}
            />
          </div>
        ) : (
          <Presenter
            id={player.current?.id ?? 'PLAYLIST_404'}
            live={!showLogo}
            text={
              !player.current
                ? playlist
                  ? 'No hay recursos activos en esta lista.'
                  : 'Crea una lista para comenzar.'
                : undefined
            }
            subtext={player.current?.subtext}
            processedText={player.current?.processedText}
            bg={player.current?.bg}
            grayscale={presenting && showLogo}
            {...settings}
          />
        )}

        <Controls centered>
          <ButtonGroup className="mx-2">
            {player.playing ? (
              <OverlayTrigger placement="top" overlay={<Tooltip>Pausar</Tooltip>}>
                <Button onClick={player.togglePlay} variant="secondary">
                  <Pause />
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger placement="top" overlay={<Tooltip>Reproducir</Tooltip>}>
                <Button
                  onClick={player.togglePlay}
                  variant="dark"
                  disabled={!activeItems.length}
                >
                  <PlayArrow />
                </Button>
              </OverlayTrigger>
            )}
          </ButtonGroup>

          <ButtonGroup>
            <OverlayTrigger placement="top" overlay={<Tooltip>Anterior</Tooltip>}>
              <Button onClick={player.prev} variant="primary">
                <West />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>Siguiente</Tooltip>}>
              <Button onClick={player.next}>
                <East />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>

          <ButtonGroup className="mx-2">
            <OverlayTrigger placement="top" overlay={<Tooltip>Repetir lista</Tooltip>}>
              <Button
                onClick={handleToggleLoop}
                variant={playlist?.loop ? 'secondary' : 'dark'}
                disabled={!playlist}
              >
                <Repeat />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Controls>
      </Wrapper>

      <AddResourceModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAddItem}
        existingItems={items}
      />
    </Wrapper>
  );
}
