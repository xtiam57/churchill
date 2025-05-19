import {
  ImageAspectRatio,
  PlayArrow,
  Restore,
  SettingsOverscan,
  Stop,
} from '@mui/icons-material';
import { useCountdown } from 'hooks';
import { useEffect, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { CountdownStyled } from './styled';

const useBroadcastCountdown = createPersistedState(BROADCAST.COUNTDOWN);
const useBroadcastIsFullCountdown = createPersistedState(
  BROADCAST.FULL_COUNTDOWN
);

export function Countdown({ presenting }) {
  const [, setCountdown] = useBroadcastCountdown(BROADCAST.INITIAL_COUNTDOWN);
  const [isFullCountdown, setFullCountdown] =
    useBroadcastIsFullCountdown(false);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const { time, running, start, stop, message } = useCountdown(disabled);

  useEffect(() => {
    if (!running) {
      setDisabled(true);
      setFullCountdown(false);
    }
  }, [running]);

  useEffect(() => {
    setCountdown(message);
  }, [message]);

  return (
    <CountdownStyled>
      {!disabled && running ? (
        <>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Temporizador</Tooltip>}
          >
            <div className="display">
              <Restore fontSize="small" />{' '}
              <div className="text-light pl-1">{time}</div>
            </div>
          </OverlayTrigger>

          {presenting && (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>{isFullCountdown ? 'Reducir' : 'Expandir'}</Tooltip>
              }
            >
              <Button
                size="sm"
                variant={isFullCountdown ? 'light' : 'dark'}
                onClick={() => setFullCountdown((value) => !value)}
                className="flat-left flat-right"
              >
                {isFullCountdown ? (
                  <ImageAspectRatio fontSize="small" />
                ) : (
                  <SettingsOverscan fontSize="small" />
                )}
              </Button>
            </OverlayTrigger>
          )}

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Detener</Tooltip>}
          >
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setDisabled(true);
                setFullCountdown(false);
                stop();
              }}
              className="flat-left"
            >
              <Stop />
            </Button>
          </OverlayTrigger>
        </>
      ) : (
        <>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Temporizador</Tooltip>}
          >
            <div className="display time">
              <Restore fontSize="small" />
            </div>
          </OverlayTrigger>

          <Form.Control
            type="number"
            value={minutes}
            onChange={({ target }) => setMinutes(+target.value)}
            required
            min="0"
            max="59"
            step="1"
            className="flat-left flat-right text-center"
          />

          <div className="display small">min</div>

          <Form.Control
            type="number"
            value={seconds}
            onChange={({ target }) => setSeconds(+target.value)}
            required
            min="0"
            max="59"
            step="1"
            className="flat-left flat-right text-center"
          />

          <div className="display pl-0">seg</div>

          {/* Play */}
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Empezar</Tooltip>}
          >
            <Button
              size="sm"
              variant="light"
              className="flat-left"
              disabled={
                seconds > 59 ||
                minutes > 59 ||
                (seconds === 0 && minutes === 0) ||
                seconds % 1 !== 0 ||
                minutes % 1 !== 0
              }
              onClick={() => {
                start(minutes, seconds + 1);
                setDisabled(false);
              }}
            >
              <PlayArrow />
            </Button>
          </OverlayTrigger>
        </>
      )}
    </CountdownStyled>
  );
}
