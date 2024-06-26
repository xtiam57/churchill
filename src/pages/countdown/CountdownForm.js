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
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label className="text-white text-small">Minutos</Form.Label>
          <Form.Control
            className="text-center"
            type="number"
            value={minutes}
            onChange={({ target }) => setMinutes(+target.value)}
            required
            min="0"
            max="59"
            step="1"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="text-white text-small">Segundos</Form.Label>
          <Form.Control
            className="text-center"
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
          <Button
            type="submit"
            className="mb-4"
            size="lg"
            block
            variant="primary"
            disabled={
              seconds > 59 ||
              minutes > 59 ||
              (seconds === 0 && minutes === 0) ||
              seconds % 1 !== 0 ||
              minutes % 1 !== 0
            }
          >
            <PlayArrow /> Iniciar
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
