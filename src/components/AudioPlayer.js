import { PlayArrow, Stop, VolumeMute, VolumeUp } from '@mui/icons-material';
import { Controls } from 'components';
import { useFolder } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useSound from 'use-sound';
import { Storage } from 'utils';

export const createKey = ({ id, type }) => `${type}_${id}_config`;

export default function AudioPlayer({ url, current, children }) {
  const folder = useFolder();

  const [isMP3Loaded, setIsMP3Loaded] = useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [volume, setVolume] = useState(1);
  const [play, { stop, isPlaying, sound }] = useSound(url, {
    volume,
    playbackRate,
    interrupt: true,
    onload: () => setIsMP3Loaded(true),
    onloaderror: () => setIsMP3Loaded(false),
  });
  const [trackProgress, setTrackProgress] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    if (!isPlaying) {
      setTrackProgress(0);
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress((state) => state + 1);
    }, [1000]);
  };

  const handleOpenPath = (e) => {
    e.preventDefault();
    folder.open();
  };

  const handleSave = (target) => {
    Storage.set(createKey(current), {
      volume,
      playbackRate,
      [target.name]: +target.value,
    });
  };

  return (
    <>
      {' '}
      {isMP3Loaded ? (
        <div className="p-2 bg-gray d-flex align-items-center">
          <Form.Control
            custom
            type="range"
            name="position"
            value={trackProgress}
            min="0"
            max={Math.floor(sound?.duration())}
            step="1"
            onChange={({ target }) => {
              sound?.seek(+target.value);
              setTrackProgress(+target.value);
            }}
          />
        </div>
      ) : (
        <div className="py-2 px-3 bg-warning d-flex align-items-center">
          <small>
            <strong>Este himno NO tiene pista.</strong> Agrega su pista en
            formato <i>.mp3</i> en la carpeta{' '}
            <strong className="pointer text-underline" onClick={handleOpenPath}>
              /pistas
            </strong>{' '}
            con el nombre <strong>{current.reference}.mp3</strong>
          </small>
        </div>
      )}
      <Controls>
        <div className="d-flex align-items-center">
          {isMP3Loaded && (
            <div className="d-flex align-items-center">
              <Form.Control
                custom
                type="range"
                name="playbackRate"
                value={playbackRate}
                min="0.5"
                max="2"
                step="0.05"
                style={{ width: '80px' }}
                className="mx-2 volume-control"
                onChange={({ target }) => {
                  setPlaybackRate(() => {
                    handleSave(target);
                    return +target.value;
                  });
                  if (isPlaying) {
                    play();
                    setTrackProgress(0);
                  }
                }}
              />
              <small className="text-light">
                x{Number.parseFloat(playbackRate).toFixed(2)}
              </small>
            </div>
          )}
        </div>

        <div className="d-flex">
          {isMP3Loaded && (
            <div className="mr-2">
              {isPlaying ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Detener</Tooltip>}
                >
                  <Button onClick={() => stop()} variant="light">
                    <Stop />
                  </Button>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Reproducir</Tooltip>}
                >
                  <Button
                    onClick={() => {
                      play();
                      startTimer();
                      sound?.seek(trackProgress);
                    }}
                    variant="secondary"
                  >
                    <PlayArrow />
                  </Button>
                </OverlayTrigger>
              )}
            </div>
          )}
        </div>

        {isMP3Loaded ? (
          <div className="d-flex">
            <VolumeMute fontSize="small" />
            <Form.Control
              custom
              type="range"
              name="volume"
              value={volume}
              min="0"
              max="1"
              step="0.05"
              className="mx-2 volume-control"
              onChange={({ target }) => {
                setVolume(() => {
                  handleSave(target);
                  return +target.value;
                });
              }}
            />
            <VolumeUp fontSize="small" />
          </div>
        ) : (
          <div />
        )}
        {children}
      </Controls>
    </>
  );
}
