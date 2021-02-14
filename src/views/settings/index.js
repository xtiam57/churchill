import React, { useState, useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, Form, Col, InputGroup } from 'react-bootstrap';

import { Wrapper } from 'components/wrapper';
import { Presenter } from 'components/presenter';
import { Sidebar } from 'components/sidebar';
import { Logo } from 'components/logo';

import {
  CHANNEL_NAME,
  SETTINGS_NAME,
  THEMES,
  TEST_SLIDE,
  SETTINGS_INITIAL_STATE,
} from 'values';

const useBroadcast = createPersistedState(CHANNEL_NAME);
const useSettings = createPersistedState(SETTINGS_NAME);

function SettingsView() {
  const [showLogo, setShowLogo] = useState(true);
  const [, setMessage] = useBroadcast(null);
  const [settings, setSettings] = useSettings(SETTINGS_INITIAL_STATE);

  useEffect(() => {
    setMessage(showLogo ? null : TEST_SLIDE);
  }, [showLogo, setMessage]);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  const onChangeValue = ({ target }) => {
    const { name, value } = target;

    setSettings((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onChangeNumericValue = ({ target }) => {
    const { name, value } = target;

    setSettings((state) => ({
      ...state,
      [name]: +value,
    }));
  };

  const onChangeTheme = ({ target }) => {
    const { value } = target;
    const data = value !== 'custom' ? THEMES[value] : {};

    setSettings((state) => ({
      ...state,
      theme: value,
      ...data,
    }));
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
          <Form.Group as={Col} xs={8} className="mb-1">
            <Form.Label className="text-muted small mb-0">Fuente</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              name="font"
              value={settings?.font}
              onChange={onChangeValue}
            >
              <option value="">Predeterminada</option>
              <option value="Arial">Arial</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Courier New">Courier New</option>
              <option value="Garamond">Garamond</option>
              <option value="Georgia">Georgia</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Times New Roman">Times New Roman</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} xs={4} className="mb-1">
            <Form.Label className="text-muted small mb-0">Escala</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              name="fontscale"
              value={settings?.fontscale}
              onChange={onChangeNumericValue}
            >
              <option value="0.3">x0.3</option>
              <option value="0.5">x0.5</option>
              <option value="0.6">x0.6</option>
              <option value="0.7">x0.7</option>
              <option value="0.8">x0.8</option>
              <option value="0.9">x0.9</option>
              <option value="1">x1</option>
              <option value="1.1">x1.1</option>
              <option value="1.15">x1.15</option>
              <option value="1.2">x1.2</option>
              <option value="1.25">x1.25</option>
              <option value="1.5">x1.5</option>
              <option value="1.75">x1.75</option>
              <option value="2">x2</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} className="mb-1">
            <Form.Label className="text-muted small mb-0">
              Intervalo para Autoplay
            </Form.Label>
            <Form.Control
              size="sm"
              as="select"
              name="interval"
              value={settings?.interval}
              onChange={onChangeNumericValue}
            >
              <option value="1000">1 segundo</option>
              <option value="2000">2 segundos</option>
              <option value="3000">3 segundos</option>
              <option value="5000">5 segundos</option>
              <option value="10000">10 segundos</option>
              <option value="15000">15 segundos</option>
              <option value="20000">20 segundos</option>
              <option value="60000">1 minuto</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} className="mb-1">
            <Form.Label className="text-muted small mb-0">
              Logo / Modo
            </Form.Label>
            <InputGroup>
              <Form.Control
                as="select"
                size="sm"
                name="logo"
                value={settings?.logo}
                onChange={onChangeValue}
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
                value={settings?.mode}
                name="mode"
                onChange={onChangeValue}
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
              value={settings?.theme}
              name="theme"
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

        {settings?.theme === 'custom' ? (
          <>
            <Form.Row>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">Fondo</Form.Label>
                <Form.Control
                  size="sm"
                  type="color"
                  name="background"
                  value={settings?.background}
                  onChange={onChangeValue}
                  disabled={settings?.theme !== 'custom'}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">Texto</Form.Label>
                <Form.Control
                  type="color"
                  size="sm"
                  name="textcolor"
                  value={settings?.textcolor}
                  onChange={onChangeValue}
                  disabled={settings?.theme !== 'custom'}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">Citas</Form.Label>
                <Form.Control
                  size="sm"
                  type="color"
                  name="subtextcolor"
                  value={settings?.subtextcolor}
                  onChange={onChangeValue}
                  disabled={settings?.theme !== 'custom'}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-1">
                <Form.Label className="text-muted small mb-0">
                  Títulos
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="color"
                  name="titlecolor"
                  value={settings?.titlecolor}
                  onChange={onChangeValue}
                  disabled={settings?.theme !== 'custom'}
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
          <Presenter subtext={TEST_SLIDE.subtext} {...settings}>
            {TEST_SLIDE.text}
          </Presenter>
        )}
      </Wrapper>
    </Wrapper>
  );
}

export default SettingsView;
