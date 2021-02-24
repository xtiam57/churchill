import React from 'react';
import createPersistedState from 'use-persisted-state';
import { Button, Form, Col } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

import { Sidebar } from 'components/sidebar';
import { Logo } from 'components/logo';
import { Preview } from 'components/preview';

import { useSettingsSidebar } from 'hooks';

import { SETTINGS_NAME, THEMES, SETTINGS_INITIAL_STATE } from 'values';

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
            <option value="default">Predeterminado</option>
            <option value="calvario">Monte Calvario</option>
            <option value="cobalt">Cobalto</option>
            <option value="dark">Dark</option>
            <option value="pinguin">Pingüino Emperador</option>
            <option value="female">Femenino</option>
            <option value="fun">Divertido</option>
            <option value="xmas">Navidad</option>
            <option value="custom">Personalizado</option>
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
            <option value="">Color Sólido</option>
            <option value="/christmas.jpg">Arbol de Navidad</option>
            <option value="/dawn.jpg">Amanecer</option>
            <option value="/dusk.jpg">Atardecer</option>
            <option value="/heart.jpg">Corazones</option>
            <option value="/cross.jpg">Cruz</option>
            <option value="/fun.jpg">Divertido</option>
            <option value="/celebration.jpg">Fiesta</option>
            <option value="/wall.jpg">Ladrillos</option>
            <option value="/wood.jpg">Madera</option>
            <option value="/wood-lights.jpg">Madera con luces</option>
            <option value="/green-wood.jpg">Madera Verde</option>
            <option value="/xmas.jpg">Navidad Colorida</option>
            <option value="/blue.jpg">Patrón Azul</option>
            <option value="/black.jpg">Patrón Negro</option>
            <option value="/paper3.jpg">Papel 1</option>
            <option value="/paper2.jpg">Papel 2</option>
            <option value="/paper1.jpg">Papel 3</option>
            <option value="/peru.jpg">Perú</option>
            <option value="/resurrection.jpg">Resurreción</option>
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
            <option value="default">Iglesia</option>
            <option value="jovenes">Jóvenes</option>
            <option value="damas">Damas</option>
            <option value="ninos">Niños</option>
            <option value="rondalla">Rondalla</option>
            <option value="instituto">Instituto</option>
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
