import React, { useState } from 'react';
import { Button, Form, Modal, Col } from 'react-bootstrap';

export function CountdonwModal({ show, handleClose, handleSave }) {
  const now = new Date();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [validated] = useState(true);

  const save = () => {
    const padMin = `${minutes}`.padStart(2, '0');
    const padSec = `${seconds}`.padStart(2, '0');
    const formatted = `${padMin}:${padSec}`;

    handleSave({ minutes, seconds, formatted });

    setMinutes(0);
    setSeconds(0);
  };

  const close = () => {
    handleClose();

    setMinutes(0);
    setSeconds(0);
  };

  return (
    <Modal
      size="sm"
      centered
      show={show}
      onHide={close}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Nuevo Temporizador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Row>
            <Form.Group hasValidation as={Col}>
              <Form.Label>Minutos</Form.Label>
              <Form.Control
                type="number"
                value={minutes}
                onChange={({ target }) => setMinutes(+target.value)}
                required
                min="0"
                max="59"
                step="1"
                isInvalid
              />
            </Form.Group>

            <Form.Group hasValidation as={Col}>
              <Form.Label>Segundos</Form.Label>
              <Form.Control
                type="number"
                value={seconds}
                onChange={({ target }) => setSeconds(+target.value)}
                required
                min="0"
                max="59"
                isInvalid
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={save}
          disabled={
            minutes === null ||
            minutes === '' ||
            minutes === undefined ||
            seconds === null ||
            seconds === '' ||
            seconds === undefined
          }
        >
          Comenzar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
