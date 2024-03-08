import { useCountdown } from 'hooks';
import { useCallback, useState } from 'react';
import { ImMinus, ImPlay3, ImPlus, ImStop2 } from 'react-icons/im';
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
          <div className="display">{time}</div>
          <button
            title="Detener temporizador"
            onClick={() => {
              setDisabled(true);
              stop();
            }}
            className="btn btn-danger btn-sm flat-left"
          >
            <ImStop2 />
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-dark btn-sm flat-right"
            onClick={handleDecrease}
            title="Decrementar temporizador"
          >
            <ImMinus />
          </button>
          <div className="display">{minutes} min</div>
          <div className="btn-group">
            <button
              className="btn btn-dark btn-sm flat-left"
              onClick={handleIncrease}
              title="Incrementar temporizador"
            >
              <ImPlus />
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                start(minutes, 0);
                setDisabled(false);
              }}
              title="Empezar temporizador"
            >
              <ImPlay3 />
            </button>
          </div>
        </>
      )}
    </CountdownStyled>
  );
}
