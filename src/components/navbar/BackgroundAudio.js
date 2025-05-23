import { useContext, useRef, useState, useEffect } from 'react';
import useSound from 'use-sound';
import { Close, PlayArrow, Stop } from '@mui/icons-material';
import {
  Badge,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import { BackgroundAudioContext } from 'providers/BackgroundAudioProvider';
import { Sidebar } from 'components/sidebar';

export function BackgroundAudio() {
  const {
    localUrl,
    setIsReady,
    index,
    setIndex,
    playlist,
    showOptions,
    setShowOptions,
  } = useContext(BackgroundAudioContext);

  const playAllRef = useRef(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [pendingIndex, setPendingIndex] = useState(null);

  const [play, { stop, isPlaying }] = useSound(localUrl, {
    volume: 1,
    playbackRate: 1,
    interrupt: true,
    html5: true,
    onload: () => setIsReady(true),
    onloaderror: (err) => {
      console.error('Error cargando audio ' + localUrl, err);
      setIsReady(false);
    },
    onend: () => {
      if (playAllRef.current && playlist.length > 0) {
        setIndex((i) => (i + 1) % playlist.length);
        setShouldPlay(true); // Para que siga reproduciendo automáticamente
      } else {
        setShouldPlay(false);
      }
    },
  });

  // Efecto para reproducir solo cuando el usuario lo indique
  useEffect(() => {
    if (shouldPlay && localUrl) {
      stop(); // Detén cualquier reproducción previa antes de reproducir
      setTimeout(() => play(), 50); // Pequeño delay para evitar solapamientos
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay, localUrl]);

  // Si hay un pendingIndex, primero detenemos, luego cambiamos el índice y reproducimos
  useEffect(() => {
    if (pendingIndex !== null) {
      stop();
      setIndex(pendingIndex);
      setShouldPlay(true);
      setPendingIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingIndex]);

  if (!localUrl) return <p>No hay pistas disponibles</p>;

  // Botón para reproducir todas en bucle
  const handlePlayAll = () => {
    playAllRef.current = true;
    stop();
    setShouldPlay(false);
    setTimeout(() => setShouldPlay(true), 50); // Reinicia la reproducción
  };

  // Botón para detener todo y salir del modo bucle
  const handleStopAll = () => {
    playAllRef.current = false;
    stop();
    setShouldPlay(false);
  };

  // Reproducir pista individual (no activa el bucle)
  const handlePlay = (idx) => {
    playAllRef.current = false;
    stop();
    setShouldPlay(false);
    setPendingIndex(idx); // Esto asegura que primero se detenga, luego cambie el índice y luego reproduzca
  };

  return (
    <Sidebar
      light
      closable
      className={showOptions ? '' : 'closed'}
      size={600}
      offset={320 + 55}
    >
      <h1 className="display-4">Fondos Musicales</h1>
      <p className="text-muted">
        Agrega su pista en formato <i>.mp3</i> en la carpeta{' '}
        <strong>Documentos/Pistas/fondosMusicales</strong>
      </p>
      <hr />
      <div className="mb-3 d-flex gap-2">
        {!isPlaying ? (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Reproducir todas</Tooltip>}
          >
            <Button onClick={handlePlayAll} variant="success">
              <PlayArrow /> Reproducir todas
            </Button>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Detener</Tooltip>}
          >
            <Button onClick={handleStopAll} variant="light">
              <Stop /> Detener
            </Button>
          </OverlayTrigger>
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        <ListGroup>
          {playlist.map((track, idx) => (
            <ListGroup.Item
              key={track}
              action
              active={index === idx}
              className="d-flex justify-content-between align-items-start"
              onClick={() => handlePlay(idx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {idx + 1}. {track.replace('.mp3', '')}
                </div>
                {isPlaying && index === idx && (
                  <span className="text-success">Reproduciendo</span>
                )}
              </div>
              <Badge bg={index === idx ? 'success' : 'primary'} pill>
                {index === idx && isPlaying ? <Stop /> : <PlayArrow />}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Button
        className="p-0 text-dark"
        variant="link"
        style={{ position: 'absolute', top: 13, right: 10 }}
        onClick={() => setShowOptions(false)}
      >
        <Close />
      </Button>
    </Sidebar>
  );
}
