import { Logo, LogoPreview, Sidebar, TextPreview } from 'components';
import { usePresenter, useSettingsSidebar } from 'hooks';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { BsDownload, BsHeartFill, BsUpload } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import createPersistedState from 'use-persisted-state';
import { Storage } from 'utils';
import { BROADCAST, SETTINGS_OPTIONS, THEMES } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function Settings() {
  const { toggleSettings, showingSettings } = useSettingsSidebar();
  const [settings, setSettings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [file, setFile] = useState(null);
  const { reload } = usePresenter();

  const handleChangeValue = ({ target }) => {
    const { name, value } = target;

    setSettings((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleChangeNumericValue = ({ target }) => {
    const { name, value } = target;

    setSettings((state) => ({
      ...state,
      [name]: +value,
    }));
  };

  const handleChangeTheme = ({ target }) => {
    const { value } = target;
    const data = value !== 'custom' ? THEMES[value] : {};

    setSettings((state) => ({
      ...state,
      theme: value,
      ...data,
    }));
  };

  const handleExport = () => {
    Storage.download();
  };

  const handleImport = () => {
    Storage.upload(file, () => {
      reload();
    });
  };

  const handleRandomBackground = (e) => {
    e.preventDefault();
    const min = 0;
    const max = SETTINGS_OPTIONS.BACKGROUNDS.length;
    const index = Math.floor(Math.random() * (max - min) + min);

    setSettings((state) => ({
      ...state,
      image: SETTINGS_OPTIONS.BACKGROUNDS[index].value,
    }));
  };

  // useClickOutside(ref, () => {
  //   if (showingSettings) {
  //     closeSettings();
  //   }
  // });

  return (
    <Sidebar light closable className={showingSettings ? '' : 'closed'}>
      <h1 className="display-4">Ajustes</h1>
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
            onChange={handleChangeValue}
          >
            {SETTINGS_OPTIONS.FONT_FAMILIES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
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
            onChange={handleChangeTheme}
          >
            {SETTINGS_OPTIONS.THEMES.map(({ value, label }) => (
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
                onChange={handleChangeValue}
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
                onChange={handleChangeValue}
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
                onChange={handleChangeValue}
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
                onChange={handleChangeValue}
                disabled={settings?.theme !== 'custom'}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="mb-1">
              <Form.Label className=" small mb-1">Palabras de Jesús</Form.Label>
              <Form.Control
                size="sm"
                type="color"
                name="jesus"
                value={settings?.jesus}
                onChange={handleChangeValue}
                disabled={settings?.theme !== 'custom'}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-1">
              <Form.Label className=" small mb-1">Opciones (Trivia)</Form.Label>
              <Form.Control
                size="sm"
                type="color"
                name="optionscolor"
                value={settings?.optionscolor}
                onChange={handleChangeValue}
                disabled={settings?.theme !== 'custom'}
              />
            </Form.Group>
          </Form.Row>
        </>
      ) : null}

      <TextPreview className="my-2" {...settings} />

      <hr />

      <Form.Row>
        <Form.Group as={Col} className="mb-2">
          <Form.Label className="small my-2 d-flex justify-content-between">
            Fondo
            <a href=" " onClick={handleRandomBackground}>
              (Aleatorio)
            </a>
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            value={settings?.image}
            name="image"
            onChange={handleChangeValue}
          >
            {SETTINGS_OPTIONS.BACKGROUNDS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      {settings?.image ? (
        <Form.Row>
          <Form.Group as={Col} className="mb-0">
            <Form.Label className="small mb-1">
              Difuminado del Fondo (
              {Number.parseFloat(settings?.blur).toFixed(1)})
            </Form.Label>
            <Form.Control
              custom
              type="range"
              min="0"
              max="20"
              step="1"
              name="blur"
              value={settings?.blur}
              onChange={handleChangeNumericValue}
            />
          </Form.Group>
        </Form.Row>
      ) : (
        <Form.Row>
          <Form.Group as={Col} className="mb-0">
            <Form.Label className=" small mb-1">Fondo</Form.Label>
            <Form.Control
              size="sm"
              type="color"
              name="background"
              value={settings?.background}
              onChange={handleChangeValue}
            />
          </Form.Group>
          <Col />
        </Form.Row>
      )}

      <hr />

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">Logo </Form.Label>

          <Form.Control
            as="select"
            size="sm"
            name="logo"
            value={settings?.logo}
            onChange={handleChangeValue}
          >
            {SETTINGS_OPTIONS.LOGOS.map(({ value, label }) => (
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
            onChange={handleChangeValue}
          >
            <option value="default">Normal</option>
            <option value="#ffffff">Negativo</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <LogoPreview className="my-2" {...settings}>
        <Logo width="80%" height="80%" {...settings} />
      </LogoPreview>

      <hr />

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">
            Tiempo de predicación (semáforo)
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="preachtime"
            value={settings?.preachtime}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.PREACH_TIME.map(({ value, label }) => (
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
            Tiempo restante para la luz amarilla
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="preachyellow"
            value={settings?.preachyellow}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.PREACH_YELLOW.map(({ value, label }) => (
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
            Tiempo restante para la luz roja
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="preachred"
            value={settings?.preachred}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.PREACH_RED.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <hr />

      <Form.Row>
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">
            Intervalo entre "Anuncios" (Inicio)
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="interval"
            value={settings?.interval}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.TIME_INTERVALS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} className="mb-2">
          <Form.Label className=" small mb-1">
            Intervalo entre "Preguntas" (Trivia)
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="triviainterval"
            value={settings?.triviainterval}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.TRIVIA_TIME_INTERVALS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} className="mb-0">
          <Form.Label className=" small mb-1">
            Rango para detectar cumpleaños
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="birthdaytimeframe"
            value={settings?.birthdaytimeframe}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.BIRTHDAYS_TIME_INTERVALS.map(
              ({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      {/* <Form.Row className="mt-3">
        <Form.Group as={Col} className="mb-1">
          <Form.Check
            type="switch"
            id="preview"
            label="Mostrar miniatura de la siguiente página."
            name="preview"
            checked={settings?.preview}
            onChange={() => {
              setSettings((state) => ({
                ...state,
                preview: !state.preview,
              }));
            }}
          />
        </Form.Group>
      </Form.Row> */}

      <hr />

      <Form.Row className="mt-2">
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">
            Exportar datos del usuario
          </Form.Label>
          <Button variant="outline-primary" block onClick={handleExport}>
            <BsDownload /> Exportar
          </Button>
        </Form.Group>
      </Form.Row>

      <Form.Row className="mt-2">
        <Form.Group as={Col} className="mb-1">
          <Form.Label className=" small mb-1">
            Importar datos del usuario
          </Form.Label>
          <Form.File
            id="import"
            label={file ? file.name : 'Selecciona un archivo...'}
            accept=".json"
            custom
            onChange={({ target }) => setFile(target.files[0])}
          />
          <InputGroup.Prepend></InputGroup.Prepend>
        </Form.Group>
      </Form.Row>

      {file ? (
        <Form.Row>
          <Form.Group as={Col} className="mb-1">
            <Button
              variant="outline-primary"
              block
              onClick={handleImport}
              disabled={!file}
            >
              <BsUpload /> Importar
            </Button>
          </Form.Group>
        </Form.Row>
      ) : null}

      {/* <Button
        block
        className="mt-3"
        onClick={() => setSettings(BROADCAST.INITIAL_SETTINGS)}
      >
        Reiniciar
      </Button> */}

      <hr />

      <small className="d-block text-center text-muted mt-4">
        Hecho con <BsHeartFill className="text-danger pulse" /> para Dios y su
        Iglesia. <br />
        Por Christiam Mena (@xtiam57). <br />
        <a href="mailto:christiam.mena@gmail.com">christiam.mena@gmail.com</a>
      </small>
    </Sidebar>
  );
}
