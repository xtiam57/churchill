import { AlarmAdd, Close } from '@mui/icons-material';
import { Sidebar } from 'components';
import { useSettingsSidebar } from 'hooks';
import { Button, Col, Form } from 'react-bootstrap';
import createPersistedState from 'use-persisted-state';
import { toBase64 } from 'utils';
import { BROADCAST, SETTINGS_OPTIONS } from 'values';

const useSchedule = createPersistedState(BROADCAST.SCHEDULES_AND_EVENTS);

export function Schedule() {
  const { toggleSchedule, showingSchedule, setRefreshSchedules } =
    useSettingsSidebar();

  const [schedules, setSchedules] = useSchedule(
    BROADCAST.INITIAL_SCHEDULES_AND_EVENTS
  );

  const handleSchedulesChangeValue = (name, value, index) => {
    schedules[index][name] = value;
    setSchedules([...schedules]);
    setRefreshSchedules([...schedules]);
  };

  const handleAdd = () => {
    schedules.push({
      name: '',
      day: 'Domingo',
      hour: '01:00',
      hourSuffix: 'AM',
      type: 'SCHEDULE',
      background: null,
      date: null,
      active: true,
      repeat: 0,
    });
    setSchedules([...schedules]);
    setRefreshSchedules([...schedules]);
  };

  const handleDelete = (index) => {
    schedules.splice(index, 1);
    setSchedules([...schedules]);
    setRefreshSchedules([...schedules]);
  };

  return (
    <Sidebar
      light
      closable
      className={showingSchedule ? '' : 'closed'}
      size={600}
      offset={320 + 55}
    >
      <h1 className="display-4">
        Anuncios{' '}
        {/* <small className="text-muted">
          ({schedules?.filter((s) => s.active).length}/{schedules?.length})
        </small> */}
      </h1>

      <p className="text-muted">
        La resolución recomendada para las imagenes de fondo es de{' '}
        <strong>1920x1080</strong> o <strong>1280×720</strong>.
      </p>

      <Button
        className="p-0 text-dark"
        variant="link"
        style={{ position: 'absolute', top: 13, right: 10 }}
        onClick={toggleSchedule}
      >
        <Close />
      </Button>

      <div>
        {schedules?.map((schedule, index) => (
          <div
            key={index}
            className="p-2"
            style={{
              backgroundColor: schedule.active ? '#fff' : '#f2f3f5',
              border: schedule.active
                ? 'solid 2px var(--primary)'
                : 'dotted 2px #dee2e6',
              marginBottom: index === schedules.length - 1 ? '0' : '0.5rem',
              borderRadius: '0.25rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgb(222, 226, 230)',
                width: 26,
                height: 26,
                fontSize: '0.7rem',
                position: 'absolute',
                top: 4,
                left: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '0.25rem',
              }}
            >
              {index + 1}
            </div>

            <Button
              size="sm"
              variant="outline-danger"
              style={{
                position: 'absolute',
                bottom: 4,
                left: 4,
                width: 26,
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => handleDelete(index)}
            >
              <Close
                style={{
                  fontSize: '.9rem',
                }}
              />
            </Button>

            <div className="w-100 d-flex" style={{ gap: '0.5rem' }}>
              <div className="d-flex align-items-center pl-2">
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
              </div>

              <div
                className="d-flex flex-column justify-content-center"
                style={{ flexGrow: 1 }}
              >
                <Form.Row>
                  <Form.Group as={Col} className="mb-0">
                    {/* <Form.Label className=" small mb-1">Descripción</Form.Label> */}
                    <Form.Control
                      as="input"
                      size="sm"
                      value={schedule.name}
                      name="name"
                      placeholder={
                        schedule.type === 'POSTER'
                          ? 'Identificador del poster...'
                          : 'Describe que actividad tiene la Iglesia...'
                      }
                      disabled={!schedule.active}
                      onChange={({ target }) => {
                        const { name, value } = target;
                        handleSchedulesChangeValue(name, value, index);
                      }}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  {schedule.type === 'SCHEDULE' ? (
                    <>
                      <Form.Group as={Col} xs={6} className="mb-0 mt-2">
                        {/* <Form.Label className=" small mb-1">Día</Form.Label> */}
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
                            ({ value, label, divider }) =>
                              divider ? (
                                <hr key={value} />
                              ) : (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              )
                          )}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col} xs={3} className="mb-0 mt-2">
                        {/* <Form.Label className=" small mb-1">Hora</Form.Label> */}
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

                      <Form.Group as={Col} xs={3} className="mb-0 mt-2">
                        {/* <Form.Label className=" small mb-1">Horario</Form.Label> */}
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
                    </>
                  ) : schedule.type === 'EVENT' ? (
                    <>
                      <Form.Group as={Col} xs={6} className="mb-0 mt-2">
                        {/* <Form.Label className=" small mb-1">Día</Form.Label> */}
                        <Form.Control
                          as="input"
                          type="date"
                          size="sm"
                          value={schedule.date}
                          name="date"
                          disabled={!schedule.active}
                          onChange={({ target }) => {
                            const { name, value } = target;
                            handleSchedulesChangeValue(name, value, index);
                          }}
                        />
                      </Form.Group>

                      <Form.Group as={Col} xs={3} className="mb-0 mt-2">
                        {/* <Form.Label className=" small mb-1">Hora</Form.Label> */}
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

                      <Form.Group as={Col} xs={3} className="mb-0 mt-2">
                        {/* <Form.Label className=" small mb-1">Horario</Form.Label> */}
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
                    </>
                  ) : null}
                </Form.Row>

                <Form.Row className="mt-2">
                  <Form.Group as={Col} xs={12} className="mb-0">
                    {/* <Form.Label className=" small mb-1">
                      Repetir cada...
                    </Form.Label> */}
                    <Form.Control
                      size="sm"
                      as="select"
                      value={schedule.repeat}
                      name="repeat"
                      disabled={!schedule.active}
                      onChange={({ target }) => {
                        const { name, value } = target;
                        handleSchedulesChangeValue(name, +value, index);
                      }}
                    >
                      {SETTINGS_OPTIONS.REPEAT_EVERY.map(
                        ({ value, label, divider }) =>
                          divider ? (
                            <hr key={value} />
                          ) : (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          )
                      )}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} xs={12} className="mb-0 mt-2">
                    {schedule.background ? (
                      <div
                        className="d-flex align-items-center w-100"
                        style={{ gap: '0.5rem' }}
                      >
                        <img
                          src={schedule.background}
                          alt=""
                          style={{
                            filter: schedule.active ? 'none' : 'grayscale(1)',
                            objectFit: 'cover',
                            flexGrow: 1,
                            height: 38,
                            border: '1px solid #ced4da',
                          }}
                          className="rounded"
                        />

                        <Button
                          size="sm"
                          className="m-0"
                          variant="outline-danger"
                          disabled={!schedule.active}
                          style={{ height: 38 }}
                          onClick={() =>
                            handleSchedulesChangeValue(
                              'background',
                              null,
                              index
                            )
                          }
                        >
                          Eliminar
                        </Button>
                      </div>
                    ) : (
                      <Form.File
                        id="background"
                        label="Selecciona una imagen de fondo..."
                        accept="image/png, image/jpeg"
                        size="sm"
                        custom
                        className="super-custom"
                        disabled={!schedule.active}
                        onChange={({ target }) => {
                          toBase64(target.files[0]).then((img) => {
                            handleSchedulesChangeValue(
                              'background',
                              img,
                              index
                            );
                          });
                        }}
                      />
                    )}
                  </Form.Group>
                </Form.Row>
              </div>

              <div className="d-flex flex-column justify-content-center">
                <Button
                  block
                  size="sm"
                  className="m-0"
                  variant={schedule.type === 'SCHEDULE' ? 'light' : 'link'}
                  disabled={!schedule.active}
                  onClick={() =>
                    handleSchedulesChangeValue('type', 'SCHEDULE', index)
                  }
                >
                  Horario
                </Button>
                <Button
                  block
                  size="sm"
                  className="m-0"
                  variant={schedule.type === 'EVENT' ? 'secondary' : 'link'}
                  disabled={!schedule.active}
                  onClick={() =>
                    handleSchedulesChangeValue('type', 'EVENT', index)
                  }
                >
                  Evento
                </Button>
                <Button
                  block
                  size="sm"
                  className="m-0"
                  variant={schedule.type === 'POSTER' ? 'primary' : 'link'}
                  disabled={!schedule.active}
                  onClick={() =>
                    handleSchedulesChangeValue('type', 'POSTER', index)
                  }
                >
                  Poster
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        block
        size="lg"
        className="m-0 mt-3"
        variant="success"
        onClick={handleAdd}
      >
        <AlarmAdd /> Agregar
      </Button>
    </Sidebar>
  );
}
