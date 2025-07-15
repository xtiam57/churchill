import { Corner } from 'components';
import { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';

const useMessagePreacher = createPersistedState(BROADCAST.PREACHER_MESSAGE);
const usePointsPreacher = createPersistedState(BROADCAST.PREACHER_POINTS);
const useTimePreacher = createPersistedState(BROADCAST.PREACHER_TIME);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

function PreacherScreen() {
  const [messagep, setMessagep] = useMessagePreacher('');
  const [points] = usePointsPreacher('');
  const [time] = useTimePreacher(null);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (messagep) {
      const timer = setTimeout(() => {
        setMessagep('');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [messagep, setMessagep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#222',
        color: '#fff',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
      }}
    >
      {messagep && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '4rem',
            color: 'red',
            fontWeight: 'bold',
            zIndex: 2,
            pointerEvents: 'none',
          }}
          className="scale-up-center"
        >
          {messagep}
        </div>
      )}

      <div>
        {points && (
          <div>
            <strong>Puntos importantes:</strong>
            <ul style={{ fontSize: '2rem', marginTop: '1rem' }}>
              {points
                .split('\n')
                .map((pt, idx) => pt.trim() && <li key={idx}>{pt}</li>)}
            </ul>
          </div>
        )}
        {time && (
          <Corner id={time.id} text={time.processedText} {...settings} />
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          fontSize: '2rem',
          color: '#fff',
          opacity: 0.8,
          textAlign: 'left',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        Hora actual: {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default PreacherScreen;
