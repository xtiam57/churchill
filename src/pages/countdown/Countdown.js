import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button } from 'react-bootstrap';
import * as ImIcons from 'react-icons/im';

import { Sidebar } from 'components/sidebar';
import { Wrapper } from 'components/wrapper';
import { Controls } from 'components/controls';
import { Presenter } from 'components/presenter';
import { List } from 'components/list';

import { useCountdown, usePresenter } from 'hooks';
import { BROADCAST } from 'values';

import { CountdonwModal } from './modal';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);

export default function StopwatchPage() {
  const [, setMessage] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [showLogo, setShowLogo] = useState(true);
  const { time, start } = useCountdown((time) => {
    setMessage({
      id: 'TEMP',
      text: `<strong class="fs-xxl">${time}</strong>`,
      type: 'temp',
    });
  });
  const [showModal, setShowModal] = useState(false);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const { presenting } = usePresenter();

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  useEffect(() => {
    if (!presenting) {
      setShowLogo(true);
    }
  }, [presenting]);

  const onSave = ({ minutes, seconds, formatted }) => {
    setShowModal(false);
    start(minutes, seconds);
  };

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Temp</h1>

        <Button
          className={showLogo && presenting ? 'my-3 pulse' : 'my-3'}
          block
          size="lg"
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
          disabled={!presenting}
        >
          {showLogo ? 'Mostrar Temporizador' : 'Mostrar Logo'}
        </Button>

        <List className="mb-4">
          <List.Item>
            <List.Title>Predefinidos</List.Title>
          </List.Item>

          <List.Item>
            <List.Action onClick={() => start(0, 30)}>00:30</List.Action>
          </List.Item>
          <List.Item>
            <List.Action onClick={() => start(1, 0)}>01:00</List.Action>
          </List.Item>
          <List.Item>
            <List.Action onClick={() => start(2, 0)}>02:00</List.Action>
          </List.Item>
          <List.Item>
            <List.Action onClick={() => start(5, 0)}>05:00</List.Action>
          </List.Item>
          <List.Item>
            <List.Action onClick={() => start(10, 0)}>10:00</List.Action>
          </List.Item>
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
          <Button onClick={() => setShowModal(true)} variant="secondary">
            <ImIcons.ImPlus />
          </Button>

          <Button onClick={() => start(0, 0)} variant="secondary">
            <ImIcons.ImStop2 />
          </Button>

          <CountdonwModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSave={onSave}
          />
        </Controls>
      </Wrapper>
    </Wrapper>
  );
}
