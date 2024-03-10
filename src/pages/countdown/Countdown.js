import { History, Stop } from '@mui/icons-material';
import {
  Alert,
  Controls,
  DisplayButton,
  List,
  Presenter,
  Sidebar,
  Title,
  Wrapper,
} from 'components';
import { useCountdown, usePresenter } from 'hooks';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';
import { CountdownForm } from './CountdownForm';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function StopwatchPage() {
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [showLogo, setShowLogo] = useState(true);
  const { time, start, stop } = useCountdown(showLogo, (msg) =>
    setMessage(msg)
  );
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { presenting } = usePresenter();

  useEffect(() => {
    return () => setMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  return (
    <Wrapper>
      <Sidebar>
        <Title>Temp.</Title>

        <DisplayButton
          value={showLogo}
          presenting={presenting}
          onToggle={setShowLogo}
        />

        <CountdownForm onSubmit={start} />

        <List className="mb-4">
          <List.Item>
            <List.Title>predefinidos en segundos</List.Title>
          </List.Item>

          <Row>
            <List.Item as={Col}>
              <List.Action onClick={() => start(0, 11)}>
                <History /> 00:10
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(0, 31)}>
                <History /> 00:30
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(0, 46)}>
                <History /> 00:45
              </List.Action>
            </List.Item>
          </Row>

          <List.Item className="mt-3">
            <List.Title>predefinidos en minutos</List.Title>
          </List.Item>

          <Row>
            <List.Item as={Col}>
              <List.Action onClick={() => start(1, 1)}>
                <History /> 01:00
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(2, 1)}>
                <History /> 02:00
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(5, 1)}>
                <History /> 05:00
              </List.Action>
            </List.Item>
          </Row>

          <Row>
            <List.Item as={Col}>
              <List.Action onClick={() => start(10, 1)}>
                <History /> 10:00
              </List.Action>
            </List.Item>
            <List.Item as={Col}>
              <List.Action onClick={() => start(30, 1)}>
                <History /> 30:00
              </List.Action>
            </List.Item>
            <List.Item as={Col}>
              <List.Action onClick={() => start(45, 1)}>
                <History /> 45:00
              </List.Action>
            </List.Item>
          </Row>
        </List>
      </Sidebar>

      {presenting ? <Alert presenting={!showLogo} label={time} /> : null}

      <Wrapper direction="column" {...settings}>
        <Presenter
          id="TEMP"
          live={!showLogo}
          grayscale={presenting && showLogo}
          text={`<strong class="fs-timer">${time}</strong>`}
          {...settings}
        />

        <Controls centered>
          <Button onClick={() => stop()} variant="secondary">
            <Stop />
          </Button>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
