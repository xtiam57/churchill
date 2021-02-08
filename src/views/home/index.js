import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, Form, Col } from 'react-bootstrap';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';

import { CHANNEL_NAME, SETTINGS_NAME } from 'values';

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

function HomeView() {
  const [message, setMessage] = useBroadcast(null);
  const [settings, setSettings] = useSettings({
    logo: 'default', // jovenes | damas | rondalla | niños
    mode: 'default', // negative
    theme: 'default', // cobalto | dracula
    background: '#fff',
    textColor: '#000',
    titleColor: '#007bff',
    subtextColor: '#007bff',
  });

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Inicio</h1>
      </Sidebar>

      <Wrapper direction="column">
        <Presenter>Welcome!</Presenter>
        <Controls centered>controls</Controls>
      </Wrapper>
    </Wrapper>
  );
}

export default HomeView;
