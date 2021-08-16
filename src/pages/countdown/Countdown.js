import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { ImStop2, ImPlay3 } from 'react-icons/im';
import { BsClock } from 'react-icons/bs';

import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { Presenter } from 'components/presenter';
import { List } from 'components/list';

import { useCountdown, usePresenter } from 'hooks';
import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function StopwatchPage() {
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [showLogo, setShowLogo] = useState(true);
  const { time, start, stop } = useCountdown(showLogo, (msg) => {
    setMessage(msg);
  });
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { presenting } = usePresenter();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (form.checkValidity()) {
      start(minutes, seconds + 1);
    }
  };

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Temp.</h1>

        <Button
          className={showLogo && presenting ? 'my-3 pulse' : 'my-3'}
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
          disabled={!presenting}
        >
          {showLogo ? 'Proyectar' : 'Mostrar Logo'}
        </Button>

        <Form noValidate validated={true} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group hasValidation as={Col}>
              <Form.Label className="text-warning text-small">
                Minutos
              </Form.Label>
              <Form.Control
                type="number"
                value={minutes}
                onChange={({ target }) => setMinutes(+target.value)}
                required
                min="0"
                max="59"
                step="1"
              />
            </Form.Group>

            <Form.Group hasValidation as={Col}>
              <Form.Label className="text-warning text-small">
                Segundos
              </Form.Label>
              <Form.Control
                type="number"
                value={seconds}
                onChange={({ target }) => setSeconds(+target.value)}
                required
                min="0"
                max="59"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col>
              <Button type="submit" className="mb-3" block variant="primary">
                <ImPlay3 /> Iniciar
              </Button>
            </Col>
          </Form.Row>
        </Form>

        <List className="mb-4">
          <List.Item>
            <List.Title>predefinidos en segundos</List.Title>
          </List.Item>

          <Row>
            <List.Item as={Col}>
              <List.Action onClick={() => start(0, 11)}>
                <BsClock /> 00:10
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(0, 31)}>
                <BsClock /> 00:30
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(0, 46)}>
                <BsClock /> 00:45
              </List.Action>
            </List.Item>
          </Row>

          <List.Item className="mt-3">
            <List.Title>predefinidos en minutos</List.Title>
          </List.Item>

          <Row>
            <List.Item as={Col}>
              <List.Action onClick={() => start(1, 1)}>
                <BsClock /> 01:00
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(2, 1)}>
                <BsClock /> 02:00
              </List.Action>
            </List.Item>

            <List.Item as={Col}>
              <List.Action onClick={() => start(5, 1)}>
                <BsClock /> 05:00
              </List.Action>
            </List.Item>
          </Row>

          <Row>
            <List.Item as={Col}>
              <List.Action onClick={() => start(10, 1)}>
                <BsClock /> 10:00
              </List.Action>
            </List.Item>
            <List.Item as={Col}>
              <List.Action onClick={() => start(30, 1)}>
                <BsClock /> 30:00
              </List.Action>
            </List.Item>
            <List.Item as={Col}>
              <List.Action onClick={() => start(45, 1)}>
                <BsClock /> 45:00
              </List.Action>
            </List.Item>
          </Row>
        </List>
      </Sidebar>

      <Wrapper direction="column" {...settings}>
        <Presenter
          id="TEMP"
          live={!showLogo}
          grayscale={presenting && showLogo}
          text={`<strong class="fs-xxl">${time}</strong>`}
          {...settings}
        />

        <Controls centered>
          <Button onClick={() => stop()} variant="secondary">
            <ImStop2 />
          </Button>
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
