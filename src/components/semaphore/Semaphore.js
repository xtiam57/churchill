import { PlayArrow, Stop } from '@mui/icons-material';
import { useSemaphore } from 'hooks';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { SemaphoreStyled } from './styled';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function Semaphore() {
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { time, start, stop, minutes, running } = useSemaphore();

  let color = 'green';
  const yellowTime = settings.preachyellow || 10;
  const redTime = settings.preachred ? settings.preachred - 1 : 0;

  if (minutes > redTime && minutes <= yellowTime - 1) {
    color = 'yellow';
  }

  if (minutes <= redTime) {
    color = 'red';
  }

  return (
    <SemaphoreStyled title="Semáforo de predicación">
      {running ? (
        <div
          className="controls"
          onClick={() => stop()}
          title="Detener semáforo"
        >
          <Stop />
        </div>
      ) : (
        <div className="controls" onClick={() => start(settings.preachtime, 0)}>
          <PlayArrow />
        </div>
      )}

      <div className="display">
        <span className={color}></span> {time}
      </div>
    </SemaphoreStyled>
  );
}
