import { ArrowDropDown, ArrowDropUp, Close } from '@mui/icons-material';
import { Button, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toBase64 } from 'utils';
import { SETTINGS_OPTIONS } from 'values';
import { EntryStyled } from './styled';

export function Entry({
  index,
  lastIndex,
  onDelete,
  onChangeValue,
  onMoveUp,
  onMoveDown,
  ...rest
}) {
  return (
    <EntryStyled {...rest}>
      <div className="number">{index + 1}</div>

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
        onClick={() => onDelete(index)}
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
            checked={rest.active}
            onChange={() => onChangeValue('active', !rest.active, index)}
          />
        </div>

        <div
          className="d-flex flex-column justify-content-center"
          style={{ flexGrow: 1 }}
        >
          <Form.Row>
            <Form.Group as={Col} className="mb-0">
              <Form.Control
                as="input"
                size="sm"
                value={rest.name}
                name="name"
                placeholder={
                  rest.type === 'POSTER'
                    ? 'Identificador del poster...'
                    : 'Describe que actividad tiene la Iglesia...'
                }
                disabled={!rest.active}
                onChange={({ target }) => {
                  const { name, value } = target;
                  onChangeValue(name, value, index);
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            {rest.type === 'SCHEDULE' ? (
              <>
                <Form.Group as={Col} xs={6} className="mb-0 mt-2">
                  <Form.Control
                    as="select"
                    size="sm"
                    value={rest.day}
                    name="day"
                    disabled={!rest.active}
                    onChange={({ target }) => {
                      const { name, value } = target;
                      onChangeValue(name, value, index);
                    }}
                  >
                    {SETTINGS_OPTIONS.DAYS.map(({ value, label, divider }) =>
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
                  <Form.Control
                    size="sm"
                    as="select"
                    name="hour"
                    disabled={!rest.active}
                    value={rest.hour}
                    onChange={({ target }) => {
                      const { name, value } = target;
                      onChangeValue(name, value, index);
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
                  <Form.Control
                    as="select"
                    size="sm"
                    value={rest.hourSuffix}
                    name="hourSuffix"
                    disabled={!rest.active}
                    onChange={({ target }) => {
                      const { name, value } = target;
                      onChangeValue(name, value, index);
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </Form.Control>
                </Form.Group>
              </>
            ) : rest.type === 'EVENT' ? (
              <>
                <Form.Group as={Col} xs={6} className="mb-0 mt-2">
                  <Form.Control
                    as="input"
                    type="date"
                    size="sm"
                    value={rest.date}
                    name="date"
                    disabled={!rest.active}
                    onChange={({ target }) => {
                      const { name, value } = target;
                      onChangeValue(name, value, index);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={3} className="mb-0 mt-2">
                  <Form.Control
                    size="sm"
                    as="select"
                    name="hour"
                    disabled={!rest.active}
                    value={rest.hour}
                    onChange={({ target }) => {
                      const { name, value } = target;
                      onChangeValue(name, value, index);
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
                  <Form.Control
                    as="select"
                    size="sm"
                    value={rest.hourSuffix}
                    name="hourSuffix"
                    disabled={!rest.active}
                    onChange={({ target }) => {
                      const { name, value } = target;
                      onChangeValue(name, value, index);
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
              <Form.Control
                size="sm"
                as="select"
                value={rest.repeat}
                name="repeat"
                disabled={!rest.active}
                onChange={({ target }) => {
                  const { name, value } = target;
                  onChangeValue(name, +value, index);
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
              {rest.background ? (
                <div
                  className="d-flex align-items-center w-100"
                  style={{ gap: '0.5rem' }}
                >
                  <img src={rest.background} alt="" className="rounded image" />

                  <Button
                    size="sm"
                    className="m-0"
                    variant="outline-danger"
                    disabled={!rest.active}
                    style={{ height: 38 }}
                    onClick={() => onChangeValue('background', null, index)}
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
                  disabled={!rest.active}
                  onChange={({ target }) => {
                    toBase64(target.files[0]).then((img) => {
                      onChangeValue('background', img, index);
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
            variant={rest.type === 'SCHEDULE' ? 'light' : 'link'}
            disabled={!rest.active}
            onClick={() => onChangeValue('type', 'SCHEDULE', index)}
          >
            Horario
          </Button>
          <Button
            block
            size="sm"
            className="m-0"
            variant={rest.type === 'EVENT' ? 'secondary' : 'link'}
            disabled={!rest.active}
            onClick={() => onChangeValue('type', 'EVENT', index)}
          >
            Evento
          </Button>
          <Button
            block
            size="sm"
            className="m-0"
            variant={rest.type === 'POSTER' ? 'primary' : 'link'}
            disabled={!rest.active}
            onClick={() => onChangeValue('type', 'POSTER', index)}
          >
            Poster
          </Button>
        </div>

        <div className="sorting d-flex flex-column justify-content-center">
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Mover hacia arriba</Tooltip>}
          >
            <Button
              variant="secondary"
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
            >
              <ArrowDropUp fontSize="small" />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Mover hacia abajo</Tooltip>}
          >
            <Button
              variant="secondary"
              onClick={() => onMoveDown(index)}
              disabled={index === lastIndex}
            >
              <ArrowDropDown fontSize="small" />
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    </EntryStyled>
  );
}
