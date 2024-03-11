import {
  CalendarMonth,
  Close,
  Download,
  Favorite,
  FileUpload,
} from '@mui/icons-material';
import { Logo, LogoPreview, Sidebar, TextPreview } from 'components';
import { usePresenter, useSettingsSidebar } from 'hooks';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { Storage } from 'utils';
import { BROADCAST, SETTINGS_OPTIONS, THEMES } from 'values';

const useSettings = createPersistedState(BROADCAST.SETTINGS);

export function Settings() {
  const { toggleSettings, showingSettings } = useSettingsSidebar();
  const [settings, setSettings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [file, setFile] = useState(null);
  const { reload } = usePresenter();
  const [expanded, setExpanded] = useState(false);

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

  const handleSchedulesChangeValue = (name, value, index) => {
    settings.schedules[index][name] = value;

    setSettings((state) => ({
      ...state,
      schedules: [...settings.schedules],
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

  return (
    <Sidebar
      light
      closable
      className={showingSettings ? '' : 'closed'}
      size={620}
      offset={310 + 45}
    >
      <h1 className="display-4">Ajustes</h1>
      <Button
        className="p-0 text-dark"
        variant="link"
        style={{ position: 'absolute', top: 13, right: 10 }}
        onClick={toggleSettings}
      >
        <Close />
      </Button>

      <Row>
        {/* Logo */}
        <Col xs={6}>
          <Form.Row className="mb-2">
            <Form.Group as={Col} className="m-0">
              <Form.Label className="small mb-1">Logo </Form.Label>

              <Form.Control
                as="select"
                size="sm"
                name="logo"
                value={settings?.logo}
                onChange={handleChangeValue}
              >
                {SETTINGS_OPTIONS.LOGOS.map(({ value, label, divider }) => (
                  <React.Fragment key={value}>
                    {divider ? <hr /> : <option value={value}>{label}</option>}
                  </React.Fragment>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} className="m-0">
              <Form.Label className=" small mb-1">Modo</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                value={settings?.color}
                name="color"
                onChange={handleChangeValue}
              >
                <option value="default">Normal</option>
                <option value="#ffffff">Negativo</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <LogoPreview {...settings}>
            <Logo height="70%" {...settings} />
          </LogoPreview>
        </Col>

        {/* Fondo */}
        <Col xs={6}>
          <Form.Row className="mb-2">
            <Form.Group as={Col} className="m-0">
              <Form.Label className="small w-100 mb-1 d-inline-flex justify-content-between">
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
                {SETTINGS_OPTIONS.BACKGROUNDS.map(
                  ({ value, label, divider }) => (
                    <React.Fragment key={value}>
                      {divider ? (
                        <hr />
                      ) : (
                        <option value={value}>{label}</option>
                      )}
                    </React.Fragment>
                  )
                )}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <TextPreview
            className="mb-2"
            hideText
            {...settings}
            blur={settings?.image ? settings?.blur : 0}
          />

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
            </Form.Row>
          )}
        </Col>
      </Row>

      <hr />

      {/* Tema */}
      <Row>
        {/* Nombre y preview */}
        <Col xs={6}>
          <Form.Row className="mb-2">
            <Form.Group as={Col} className="mb-1">
              <Form.Label className=" small mb-1">Tema</Form.Label>
              <Form.Control
                size="sm"
                as="select"
                value={settings?.theme}
                name="theme"
                onChange={handleChangeTheme}
              >
                {SETTINGS_OPTIONS.THEMES.map(({ value, label, divider }) => (
                  <React.Fragment key={value}>
                    {divider ? <hr /> : <option value={value}>{label}</option>}
                  </React.Fragment>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <TextPreview
            {...settings}
            blur={settings?.image ? settings?.blur : 0}
          />
        </Col>

        {/* Colores */}
        <Col xs={6}>
          <Form.Row>
            {/* Fuente */}
            <Form.Group as={Col} xs={12} className="mb-1">
              <Form.Label className=" small mb-1">Fuente</Form.Label>
              <Form.Control
                size="sm"
                as="select"
                name="font"
                value={settings?.font}
                onChange={handleChangeValue}
              >
                {SETTINGS_OPTIONS.FONT_FAMILIES.map(
                  ({ value, label, divider }) => (
                    <React.Fragment key={value}>
                      {divider ? (
                        <hr />
                      ) : (
                        <option value={value}>{label}</option>
                      )}
                    </React.Fragment>
                  )
                )}
              </Form.Control>
            </Form.Group>

            {/* <Form.Group as={Col} xs={6} className="mb-1">
              <Form.Label className=" small mb-1">Fondo</Form.Label>
              <Form.Control
                size="sm"
                type="color"
                name="background"
                value={settings?.background}
                onChange={handleChangeValue}
                disabled={settings?.theme !== 'custom'}
              />
            </Form.Group> */}

            <Form.Group as={Col} xs={6} className="mb-1">
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

            <Form.Group as={Col} xs={6} className="mb-1">
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

            <Form.Group as={Col} xs={6} className="mb-1">
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

            <Form.Group as={Col} xs={6} className="mb-1">
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

            {/* <Form.Group as={Col} xs={6} className="mb-1">
              <Form.Label className=" small mb-1">Opciones (Trivia)</Form.Label>
              <Form.Control
                size="sm"
                type="color"
                name="optionscolor"
                value={settings?.optionscolor}
                onChange={handleChangeValue}
                disabled={settings?.theme !== 'custom'}
              />
            </Form.Group> */}
          </Form.Row>
        </Col>
      </Row>

      <hr />

      <Button
        variant="outline-primary"
        block
        className="mb-3"
        onClick={() => {
          setExpanded((value) => !value);
        }}
      >
        <CalendarMonth fontSize="small" /> Horarios{' '}
        {/* {expanded ? (
          <ExpandLess fontSize="small" />
        ) : (
          <ExpandMore fontSize="small" />
        )} */}
      </Button>

      {expanded ? (
        <Row>
          {settings?.schedules?.map((schedule, index) => (
            <Col key={index} xs={6} className="mb-3">
              <div
                style={{
                  backgroundColor: schedule.active ? '#fff' : '#f2f3f5',
                  borderLeftWidth: '5px !important',
                }}
                className="p-3 border border-primary rounded h-100"
              >
                {index > 0 ? (
                  <Form.Row>
                    <Form.Group as={Col} className="mb-1">
                      <Form.Check
                        className="d-inline-block"
                        type="switch"
                        id={`active-${index}`}
                        name="active"
                        checked={schedule.active}
                        onChange={() =>
                          handleSchedulesChangeValue(
                            'active',
                            !schedule.active,
                            index
                          )
                        }
                      />
                    </Form.Group>
                  </Form.Row>
                ) : null}

                <Form.Row>
                  <Form.Group as={Col} className="mb-1">
                    <Form.Label className=" small mb-1">Descripción</Form.Label>
                    <Form.Control
                      as="input"
                      size="sm"
                      value={schedule.name}
                      name="name"
                      disabled={!schedule.active}
                      onChange={({ target }) => {
                        const { name, value } = target;
                        handleSchedulesChangeValue(name, value, index);
                      }}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} className="mb-1">
                    <Form.Label className=" small mb-1">Día</Form.Label>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={schedule.day}
                      name="day"
                      disabled={!schedule.active}
                      onChange={({ target }) => {
                        const { name, value } = target;
                        handleSchedulesChangeValue(name, value, index);
                      }}
                    >
                      {SETTINGS_OPTIONS.DAYS.map(
                        ({ value, label, divider }) => (
                          <React.Fragment key={value}>
                            {divider ? (
                              <hr />
                            ) : (
                              <option value={value}>{label}</option>
                            )}
                          </React.Fragment>
                        )
                      )}
                    </Form.Control>
                  </Form.Group>

                  {/* <Form.Group as={Col} className="mb-1">
                    <Form.Label className=" small mb-1">Sufijo</Form.Label>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={schedule.daySuffix}
                      name="daySuffix"
                      disabled={!schedule.active}
                      onChange={({ target }) => {
                        const { name, value } = target;
                        handleSchedulesChangeValue(name, value, index);
                      }}
                    >
                      <option value=""></option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </Form.Control>
                  </Form.Group> */}
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} className="mb-1">
                    <Form.Label className=" small mb-1">Hora</Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      name="hour"
                      disabled={!schedule.active}
                      value={schedule.hour}
                      onChange={({ target }) => {
                        const { name, value } = target;
                        handleSchedulesChangeValue(name, value, index);
                      }}
                    >
                      {SETTINGS_OPTIONS.HOURS.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} className="mb-1">
                    <Form.Label className=" small mb-1">Horario</Form.Label>
                    <Form.Control
                      as="select"
                      size="sm"
                      value={schedule.hourSuffix}
                      name="hourSuffix"
                      disabled={!schedule.active}
                      onChange={({ target }) => {
                        const { name, value } = target;
                        handleSchedulesChangeValue(name, value, index);
                      }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </div>
            </Col>
          ))}
        </Row>
      ) : null}

      <hr />

      {/* <Form.Row>
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
            {SETTINGS_OPTIONS.PREACH_TIME.map(({ value, label,divider }) => (
              <React.Fragment key={value}>
                    {divider ? <hr /> : <option value={value}>{label}</option>}
                  </React.Fragment>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row> */}

      {/* <Form.Row>
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
            {SETTINGS_OPTIONS.PREACH_YELLOW.map(({ value, label,divider }) => (
               <React.Fragment key={value}>
                    {divider ? <hr /> : <option value={value}>{label}</option>}
                  </React.Fragment>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row> */}

      {/* <Form.Row>
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
            {SETTINGS_OPTIONS.PREACH_RED.map(({ value, label,divider }) => (
              <React.Fragment key={value}>
                    {divider ? <hr /> : <option value={value}>{label}</option>}
                  </React.Fragment>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row> */}

      {/* Intervalos */}
      <Form.Row>
        <Form.Group as={Col} xs={6} className="mb-1">
          <Form.Label className=" small mb-1">
            Intervalo entre los "Anuncios"
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="interval"
            value={settings?.interval}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.TIME_INTERVALS.map(
              ({ value, label, divider }) => (
                <React.Fragment key={value}>
                  {divider ? <hr /> : <option value={value}>{label}</option>}
                </React.Fragment>
              )
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} xs={6} className="mb-2">
          <Form.Label className=" small mb-1">
            Duración de los "Avisos en pantalla"
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="alertsinterval"
            value={settings?.alertsinterval}
            onChange={handleChangeNumericValue}
          >
            {SETTINGS_OPTIONS.ALERTS_TIME_INTERVALS.map(
              ({ value, label, divider }) => (
                <React.Fragment key={value}>
                  {divider ? <hr /> : <option value={value}>{label}</option>}
                </React.Fragment>
              )
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} xs={6} className="mb-0">
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
              ({ value, label, divider }) => (
                <React.Fragment key={value}>
                  {divider ? <hr /> : <option value={value}>{label}</option>}
                </React.Fragment>
              )
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} xs={6} className="mb-0">
          <Form.Label className=" small mb-1">
            Posición del temporizador
          </Form.Label>
          <Form.Control
            size="sm"
            as="select"
            name="clockposition"
            value={settings?.clockposition}
            onChange={handleChangeValue}
          >
            {SETTINGS_OPTIONS.CLOCK_POSITIONS.map(
              ({ value, label, divider }) => (
                <React.Fragment key={value}>
                  {divider ? <hr /> : <option value={value}>{label}</option>}
                </React.Fragment>
              )
            )}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      {/* <Form.Row>
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
      </Form.Row> */}

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

      <Form.Row>
        <Form.Group as={Col} xs={6} className="m-0">
          <Form.Label className=" small mb-1">
            Exportar datos del usuario
          </Form.Label>
          <Button variant="outline-primary" block onClick={handleExport}>
            <Download /> Exportar
          </Button>
        </Form.Group>

        <Form.Group as={Col} xs={6} className="m-0">
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
              <FileUpload /> Importar
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
        Hecho con <Favorite fontSize="small" className="text-danger pulse" />{' '}
        para Dios y su Iglesia. <br />
        Por Christiam Mena (@xtiam57). <br />
        <a href="mailto:christiam.mena@gmail.com">christiam.mena@gmail.com</a>
      </small>
    </Sidebar>
  );
}
