import {
  Close,
  ExpandLess,
  ExpandMore,
  FolderCopy,
  Pause,
  PlayArrow,
  Refresh,
  Shuffle,
  ShuffleOn,
  SkipNext,
} from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import styled from 'styled-components';
import { AudioWaves } from './AudioWaves';

const MiniPlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 55px;
  color: #20232a;
  z-index: 4;
  width: 300px;
  max-height: 40vh;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);

  /* Estado inicial: oculto debajo */
  transform: translate3d(0px, 100%, 0px);
  visibility: hidden;
  transition: transform 0.5s ease 0s, visibility 0.5s ease 0s;

  &.open {
    transform: translate3d(0px, 0px, 0px);
    visibility: visible;
  }

  &.hidden {
    transform: translate3d(0px, 100%, 0px);
    visibility: hidden;
  }

  &.closing {
    transform: translate3d(0px, 100%, 0px);
    visibility: hidden;
  }
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  position: relative;
  min-height: 60px;
  background-color: var(--primary);
  ${(props) =>
    props.expanded &&
    `
    border-bottom: 1px solid rgba(32, 35, 42, 0.15);
  `}
`;

const PlayPauseButton = styled(Button)`
  width: 63px !important;
  height: 63px !important;
  min-width: 63px !important;
  padding: 0 !important;
  border: 1px solid rgba(32, 35, 42, 0.3) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 60px;
  overflow: hidden;
  width: 0; /* Fuerza que el flex respete el ancho disponible */
`;

const TitleContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px; /* Altura fija para evitar saltos */
`;

const MarqueeTitle = styled.div`
  font-size: 18px;
  white-space: nowrap;
  flex: 1;
  position: relative;
  color: #fff;
  animation: ${(props) =>
    props.shouldAnimate ? 'marqueeScroll 15s linear infinite' : 'none'};

  @keyframes marqueeScroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  flex-wrap: nowrap;
  min-height: 28px;
`;

const PlaylistContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
  max-height: calc(
    40vh - 160px
  ); /* 40vh total - header (~60px) - controls (~60px) */

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray);
    border-radius: 14px;
    border: 4px solid #fff;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(32, 35, 42, 0.15);
  background-color: rgba(248, 249, 250, 0.6);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const ControlButton = styled(Button)`
  padding: 4px 6px !important;
  min-width: auto !important;
  font-size: 0.8rem !important;
`;

const ExpandButton = styled(Button)`
  padding: 0px 6px !important;
  min-width: auto !important;
  font-size: 0.5rem !important;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  &.expanded {
    border-radius: 0 !important;
  }
`;

// Componente para cada pista de audio en la lista expandida
const TrackItem = ({ track, index, currentIndex, isPlaying, onClick }) => (
  <ListGroup.Item
    action
    active={currentIndex === index}
    className="d-flex justify-content-between align-items-start"
    onClick={onClick}
    style={{
      cursor: 'pointer',
      backgroundColor:
        currentIndex === index ? 'rgba(255, 181, 153, 0.3)' : 'transparent',
      color: '#20232a',
      border: 'none',
      borderBottom: '1px solid rgba(32, 35, 42, 0.15)',
    }}
  >
    <div className="ms-2 me-auto">
      <div
        className={currentIndex === index ? 'fw-bold' : ''}
        style={{
          fontSize: '14px',
          fontWeight: currentIndex === index ? 'bold' : 'normal',
        }}
      >
        {track.name}
      </div>
      {isPlaying && currentIndex === index && (
        <div
          className="d-flex align-items-center"
          style={{ fontSize: '12px', color: 'var(--secondary)' }}
        >
          <span>Reproduciendo</span>
        </div>
      )}
    </div>
    <Badge bg={currentIndex === index ? 'secondary' : 'secondary'} pill>
      {currentIndex === index && isPlaying ? <Pause /> : <PlayArrow />}
    </Badge>
  </ListGroup.Item>
);

export function MiniPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  shuffleMode,
  onToggleShuffle,
  currentIndex,
  playlist = [],
  onTrackSelect,
  folder,
  onClose,
  isVisible,
  refreshPlaylist,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleClose = useCallback(() => {
    onClose?.();
    // Pausar la canción si está reproduciéndose
    if (isPlaying) {
      onPlayPause?.();
    }
  }, [isPlaying, onPlayPause, onClose]);

  // Actualizar el estado cuando se vuelve visible
  useEffect(() => {
    if (isVisible && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isVisible, hasBeenVisible]);

  // Si nunca ha sido visible y no hay track, no mostrar nada
  if (!hasBeenVisible && !currentTrack) {
    return null;
  }

  // Determinar las clases CSS según el estado
  const getContainerClasses = () => {
    const classes = [];
    if (isVisible) classes.push('open');
    if (!isVisible) classes.push('hidden');
    return classes.join(' ');
  };

  return (
    <MiniPlayerContainer
      expanded={isExpanded}
      className={getContainerClasses()}
    >
      {/* Header del reproductor */}
      <PlayerHeader expanded={isExpanded}>
        {/* Botón de play/pause grande a la izquierda */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{isPlaying ? 'Pausar' : 'Reproducir'}</Tooltip>}
        >
          <PlayPauseButton
            variant={isPlaying ? 'secondary' : 'dark'}
            onClick={onPlayPause}
            disabled={!currentTrack}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </PlayPauseButton>
        </OverlayTrigger>

        {/* Área de contenido a la derecha */}
        <ContentArea>
          {/* Título de la canción con efecto marquee */}
          <TitleContainer>
            {/* Título con marquee */}
            <MarqueeTitle shouldAnimate={isPlaying}>
              {currentTrack?.name || 'Sin título'}
            </MarqueeTitle>
          </TitleContainer>

          {/* Fila de controles */}
          <ControlsRow>
            <AudioWaves isPlaying={isPlaying} />

            {/* Controles principales a la izquierda */}
            <Controls>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Siguiente canción</Tooltip>}
              >
                <ControlButton variant="dark" size="sm" onClick={onNext}>
                  <SkipNext fontSize="small" />
                </ControlButton>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Cerrar reproductor</Tooltip>}
              >
                <ControlButton
                  variant="secondary"
                  size="sm"
                  onClick={handleClose}
                >
                  <Close fontSize="small" />
                </ControlButton>
              </OverlayTrigger>
            </Controls>
          </ControlsRow>
        </ContentArea>
      </PlayerHeader>

      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            {isExpanded ? 'Contraer lista' : 'Ver lista completa'}
          </Tooltip>
        }
      >
        <ExpandButton
          block
          variant="light"
          size="sm"
          className={isExpanded ? 'expanded' : ''}
          onClick={handleToggleExpand}
        >
          {isExpanded ? (
            <ExpandMore fontSize="small" />
          ) : (
            <ExpandLess fontSize="small" />
          )}
        </ExpandButton>
      </OverlayTrigger>

      {/* Controles adicionales cuando está expandido */}
      {isExpanded && (
        <HeaderControls className="bg-dark">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                {shuffleMode
                  ? 'Desactivar modo aleatorio'
                  : 'Activar modo aleatorio'}
              </Tooltip>
            }
          >
            <ControlButton
              variant={shuffleMode ? 'secondary' : 'light'}
              size="sm"
              onClick={onToggleShuffle}
            >
              {shuffleMode ? (
                <ShuffleOn fontSize="small" />
              ) : (
                <Shuffle fontSize="small" />
              )}
            </ControlButton>
          </OverlayTrigger>

          <div className="d-flex align-items-center" style={{ gap: '8px' }}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Abrir directorio de canciones</Tooltip>}
            >
              <ControlButton
                variant="success"
                size="sm"
                onClick={() => folder?.open()}
              >
                <FolderCopy fontSize="small" />
              </ControlButton>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Refrescar lista de canciones</Tooltip>}
            >
              <ControlButton
                variant="outline-light"
                size="sm"
                onClick={refreshPlaylist}
              >
                <Refresh fontSize="small" />
              </ControlButton>
            </OverlayTrigger>
          </div>
        </HeaderControls>
      )}

      {/* Lista de canciones cuando está expandido */}
      {isExpanded && (
        <PlaylistContainer>
          {playlist.length === 0 ? (
            <div
              className="text-center p-4"
              style={{ color: '#20232a', opacity: 0.7 }}
            >
              <p className="m-0">No hay pistas de audio disponibles.</p>
            </div>
          ) : (
            <ListGroup variant="flush">
              {playlist.map((track, idx) => (
                <TrackItem
                  key={track.name}
                  track={track}
                  index={idx}
                  currentIndex={currentIndex}
                  isPlaying={isPlaying}
                  onClick={() => onTrackSelect?.(idx)}
                />
              ))}
            </ListGroup>
          )}
        </PlaylistContainer>
      )}
    </MiniPlayerContainer>
  );
}
