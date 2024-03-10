import { PlayArrow } from '@mui/icons-material';
import { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

export function CountdownForm({ onSubmit = () => {} }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (form.checkValidity()) {
      onSubmit(minutes, seconds + 1);
    }
  };

  return (
    <Form noValidate validated={true} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group hasValidation as={Col}>
          <Form.Label className="text-warning text-small">Minutos</Form.Label>
          <Form.Control
            type="number"
            value={minutes}
            onChange={({ target }) => setMinutes(+target.value)}
            required
            min="0"
            max="59"
            step="1"
          />
        </Form.Group>

        <Form.Group hasValidation as={Col}>
          <Form.Label className="text-warning text-small">Segundos</Form.Label>
          <Form.Control
            type="number"
            value={seconds}
            onChange={({ target }) => setSeconds(+target.value)}
            required
            min="0"
            max="59"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col>
          <Button type="submit" className="mb-4" block variant="primary">
            <PlayArrow /> Iniciar
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
