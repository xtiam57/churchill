import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, Form, Col, InputGroup } from 'react-bootstrap';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Controls } from 'components/controls';
import { Sidebar } from 'components/sidebar';
import { Logo } from 'components/logo';

import { CHANNEL_NAME, SETTINGS_NAME, THEMES } from 'values';

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

function SettingsView() {
  const [showLogo, setShowLogo] = useState(false);
  const [message, setMessage] = useBroadcast(null);
  const [settings, setSettings] = useSettings(THEMES['default']);

  const onChangeColor = ({ target }) => {
    const { name, value } = target;
    setSettings((state) => ({ ...state, [name]: value }));
  };

  const onChangeTheme = ({ target }) => {
    const { value } = target;
    const colors = value !== 'custom' ? THEMES[value] : {};
    setSettings((state) => ({ ...state, theme: value, ...colors }));
  };

  return (
    <Wrapper>
      <Sidebar>
        <h1 className="text-light display-4">Opciones</h1>

        <Button
          className="my-4"
          block
          variant={showLogo ? 'secondary' : 'warning'}
          onClick={() => setShowLogo((value) => !value)}
        >
          {showLogo ? 'Mostrar Texto' : 'Mostrar Logo'}
        </Button>

        <Form.Row>
          <Form.Group as={Col} className="mb-1">
            <Form.Label className="text-muted small mb-0">
              Logo / Modo
            </Form.Label>
            <InputGroup>
              <Form.Control
                as="select"
                size="sm"
                value={settings.logo}
                onChange={({ target }) =>
                  setSettings((state) => ({ ...state, logo: target.value }))
                }
              >
                <option value="default">Iglesia</option>
                <option value="jovenes">Jóvenes</option>
                <option value="damas">Damas</option>
                <option value="ninos">Niños</option>
                <option value="rondalla">Rondalla</option>
                <option value="instituto">Instituto</option>
              </Form.Control>

              <Form.Control
                as="select"
                size="sm"
                value={settings.mode}
                onChange={({ target }) =>
                  setSettings((state) => ({ ...state, mode: target.value }))
                }
              >
                <option value="default">Normal</option>
                <option value="negative">Negativo</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} className="mb-1">
            <Form.Label className="text-muted small mb-0">Tema</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              value={settings.theme}
              onChange={onChangeTheme}
            >
              <option value="default">Predeterminado</option>
              <option value="calvario">Monte Calvario</option>
              <option value="cobalt">Cobalto</option>
              <option value="dracula">Drácula</option>
              <option value="female">Femenino</option>
              <option value="fun">Divertido</option>
              <option value="custom">Personalizado</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        {settings.theme === 'custom' ? (
          <>
            <Form.Row>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">Fondo</Form.Label>
                <Form.Control
                  size="sm"
                  type="color"
                  name="background"
                  value={settings.background}
                  onChange={onChangeColor}
                  disabled={settings.theme !== 'custom'}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">Texto</Form.Label>
                <Form.Control
                  type="color"
                  size="sm"
                  name="textColor"
                  value={settings.textColor}
                  onChange={onChangeColor}
                  disabled={settings.theme !== 'custom'}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">Citas</Form.Label>
                <Form.Control
                  size="sm"
                  type="color"
                  name="subtextColor"
                  value={settings.subtextColor}
                  onChange={onChangeColor}
                  disabled={settings.theme !== 'custom'}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">
                  Títulos
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="color"
                  name="titleColor"
                  value={settings.titleColor}
                  onChange={onChangeColor}
                  disabled={settings.theme !== 'custom'}
                />
              </Form.Group>
            </Form.Row>
          </>
        ) : null}
      </Sidebar>

      <Wrapper centered direction="column" {...settings}>
        {showLogo ? (
          <Logo width="65%" height="65%" {...settings} />
        ) : (
          <Presenter subtext="Fusce lectus libero" {...settings}>{`
            <strong>Nulla bibendum dignissim</strong>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare
            metus dignissim augue fermentum dictum. Mauris facilisis ultrices
            nibh, ut convallis felis placerat non.
          `}</Presenter>
        )}
      </Wrapper>
    </Wrapper>
  );
}

export default SettingsView;
