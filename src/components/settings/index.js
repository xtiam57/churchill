import React from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, Form, Col } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

import { Sidebar } from 'components/sidebar';
import { Logo } from 'components/logo';
import { Preview } from 'components/preview';

import { useSettingsSidebar } from 'hooks';

import {
  SETTINGS_NAME,
  THEMES,
  SETTINGS_INITIAL_STATE,
  FONT_FAMILIES_OPTIONS,
  THEMES_OPTIONS,
  BACKGROUNDS_OPTIONS,
  LOGO_OPTIONS,
  TIME_INTERVAL_OPTIONS,
} from 'values';

const useSettings = createPersistedState(SETTINGS_NAME);

export function Settings() {
  const { toggleSettings, showingSettings } = useSettingsSidebar();
  const [settings, setSettings] = useSettings(SETTINGS_INITIAL_STATE);

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
    <Sidebar closable className={`bg-light ${showingSettings ? '' : 'closed'}`}>
      <h1 className="display-4">Opciones</h1>

      <Button
        className="p-0 text-dark"
        variant="link"
        style={{ position: 'absolute', top: 13, right: 15 }}
        onClick={toggleSettings}
      >
        <MdClose />
      </Button>

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">Fuente</Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="font"
            value={settings?.font}
            onChange={onChangeValue}
          >
            {FONT_FAMILIES_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">
            Tamaño del Texto (
            {Number.parseFloat(settings?.fontscale * 100).toFixed(0)}
            %)
          </Form.Label>
          <Form.Control
            type="range"
            min="0.05"
            max="2"
            step="0.05"
            name="fontscale"
            value={settings?.fontscale}
            onChange={onChangeNumericValue}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">Tema</Form.Label>
          <Form.Control
            size="sm"
            as="select"
            value={settings?.theme}
            name="theme"
            onChange={onChangeTheme}
          >
            {THEMES_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      {settings?.theme === 'custom' ? (
        <>
          <Form.Row>
            <Form.Group as={Col} className="mb-1">
              <Form.Label className=" small mb-1">Fondo</Form.Label>
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
              <Form.Label className=" small mb-1">Texto</Form.Label>
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
              <Form.Label className=" small mb-1">Citas</Form.Label>
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
              <Form.Label className=" small mb-1">Títulos</Form.Label>
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
      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">Fondo</Form.Label>
          <Form.Control
            size="sm"
            as="select"
            value={settings?.image}
            name="image"
            onChange={onChangeValue}
          >
            {BACKGROUNDS_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      {settings?.image ? (
        <Form.Row>
          <Form.Group as={Col} className="mb-1">
            <Form.Label className=" small mb-1">
              Difuminado del Fondo (
              {Number.parseFloat(settings?.blur).toFixed(1)})
            </Form.Label>
            <Form.Control
              type="range"
              min="0"
              max="20"
              step="1"
              name="blur"
              value={settings?.blur}
              onChange={onChangeNumericValue}
            />
          </Form.Group>
        </Form.Row>
      ) : null}

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">Logo </Form.Label>

          <Form.Control
            as="select"
            size="sm"
            name="logo"
            value={settings?.logo}
            onChange={onChangeValue}
          >
            {LOGO_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">Modo</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            value={settings?.mode}
            name="mode"
            onChange={onChangeValue}
          >
            <option value="default">Normal</option>
            <option value="#ffffff">Negativo</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Preview className="my-2" {...settings}>
        <Logo width="80%" height="80%" {...settings} />
      </Preview>

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">
            Intervalo entre Anuncios
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="interval"
            value={settings?.interval}
            onChange={onChangeNumericValue}
          >
            {TIME_INTERVAL_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Button
        block
        className="mt-3"
        onClick={() => setSettings(SETTINGS_INITIAL_STATE)}
      >
        Reiniciar
      </Button>
    </Sidebar>
  );
}
