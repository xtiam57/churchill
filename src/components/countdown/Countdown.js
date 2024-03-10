import { Add, PlayArrow, Remove, Restore, Stop } from '@mui/icons-material';
import { useCountdown } from 'hooks';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { CountdownStyled } from './styled';

const useBroadcastCountdown = createPersistedState(BROADCAST.COUNTDOWN);

export function Countdown() {
  const [, setCountdown] = useBroadcastCountdown(BROADCAST.INITIAL_COUNTDOWN);

  const [minutes, setMinutes] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const { time, start, stop } = useCountdown(disabled, (msg) =>
    setCountdown(msg)
  );

  const handleIncrease = useCallback(() => {
    setMinutes((prev) => (prev === 1 ? 5 : Math.min(60, prev + 5)));
  }, []);

  const handleDecrease = useCallback(() => {
    setMinutes((prev) => Math.max(1, prev - 5));
  }, []);

  return (
    <CountdownStyled title="Temporizador">
      {!disabled ? (
        <>
          <div className="display">
            <Restore fontSize="small" /> {time}
          </div>
          <Button
            size="sm"
            variant="danger"
            title="Detener temporizador"
            onClick={() => {
              setDisabled(true);
              stop();
            }}
            className="flat-left"
          >
            <Stop />
          </Button>
        </>
      ) : (
        <>
          <Button
            size="sm"
            variant="dark"
            className="flat-right"
            onClick={handleDecrease}
            title="Decrementar temporizador"
          >
            <Remove />
          </Button>
          <div className="display">
            <Restore fontSize="small" /> {minutes} min
          </div>
          <div className="btn-group">
            <Button
              size="sm"
              variant="dark"
              className="flat-left"
              onClick={handleIncrease}
              title="Incrementar temporizador"
            >
              <Add />
            </Button>
            <Button
              size="sm"
              variant="light"
              onClick={() => {
                start(minutes, 0);
                setDisabled(false);
              }}
              title="Empezar temporizador"
            >
              <PlayArrow />
            </Button>
          </div>
        </>
      )}
    </CountdownStyled>
  );
}
