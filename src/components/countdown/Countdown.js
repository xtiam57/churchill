import { Add, PlayArrow, Remove, Restore, Stop } from '@mui/icons-material';
import { useCountdown } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { CountdownStyled } from './styled';

const useBroadcastCountdown = createPersistedState(BROADCAST.COUNTDOWN);

export function Countdown() {
  const [, setCountdown] = useBroadcastCountdown(BROADCAST.INITIAL_COUNTDOWN);

  const [minutes, setMinutes] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const { time, running, start, stop } = useCountdown(disabled, (msg) =>
    setCountdown(msg)
  );

  const handleIncrease = useCallback(() => {
    setMinutes((prev) => (prev === 1 ? 5 : Math.min(60, prev + 5)));
  }, []);

  const handleDecrease = useCallback(() => {
    setMinutes((prev) => Math.max(1, prev - 5));
  }, []);

  useEffect(() => {
    if (!running) {
      setDisabled(true);
    }
  }, [running]);

  return (
    <CountdownStyled>
      {!disabled && running ? (
        <>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Temporizador</Tooltip>}
          >
            <div className="display">
              <Restore fontSize="small" /> {time}
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Detener</Tooltip>}
          >
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setDisabled(true);
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
          <Button
            size="sm"
            variant="dark"
            className="flat-right"
            onClick={handleDecrease}
          >
            <Remove />
          </Button>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Temporizador</Tooltip>}
          >
            <div className="display">
              <Restore fontSize="small" /> {minutes} min
            </div>
          </OverlayTrigger>

          <div className="btn-group">
            <Button
              size="sm"
              variant="dark"
              className="flat-left"
              onClick={handleIncrease}
            >
              <Add />
            </Button>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Empezar</Tooltip>}
            >
              <Button
                size="sm"
                variant="light"
                onClick={() => {
                  start(minutes, 1);
                  setDisabled(false);
                }}
              >
                <PlayArrow />
              </Button>
            </OverlayTrigger>
          </div>
        </>
      )}
    </CountdownStyled>
  );
}
