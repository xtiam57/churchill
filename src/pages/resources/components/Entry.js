import { Close } from '@mui/icons-material';
import { Button, Col, Form } from 'react-bootstrap';
import { toBase64 } from 'utils';
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
      <div className="w-100 d-flex" style={{ gap: '0.5rem' }}>
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
      </div>

      <div className="d-flex justify-content-between align-items-center flex-column">
        <div className="number">{index + 1}</div>

        <Button
          size="sm"
          variant="outline-danger"
          style={{
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
      </div>
    </EntryStyled>
  );
}
