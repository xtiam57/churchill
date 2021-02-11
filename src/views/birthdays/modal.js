import React, { useState } from 'react';
import { Button, Form, Modal, Col } from 'react-bootstrap';

export function BirthdayModal({ show, handleClose, handleSave }) {
  const now = new Date();
  const [name, setName] = useState(null);
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [day, setDay] = useState(now.getDate());
  const [validated] = useState(true);

  const save = () => {
    handleSave({ name, month, day });

    setName(null);
    setMonth(now.getMonth() + 1);
    setDay(now.getDate());
  };

  const close = () => {
    handleClose();

    setName(null);
    setMonth(now.getMonth() + 1);
    setDay(now.getDate());
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
        <Modal.Title>Nuevo Cumpleaños</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Row>
            <Form.Group hasValidation as={Col}>
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.j. Pedro Quispe"
                value={name}
                onChange={({ target }) => setName(target.value)}
                required
                isInvalid
              />
            </Form.Group>
          </Form.Row>
        </Form>

        <Form noValidate>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Mes</Form.Label>
              <Form.Control
                as="select"
                value={month}
                onChange={({ target }) => setMonth(+target.value)}
              >
                <option value={1}>Enero</option>
                <option value={2}>Febrero</option>
                <option value={3}>Marzo</option>
                <option value={4}>Abril</option>
                <option value={5}>Mayo</option>
                <option value={6}>Junio</option>
                <option value={7}>Julio</option>
                <option value={8}>Agosto</option>
                <option value={9}>Septiembre</option>
                <option value={10}>Octubre</option>
                <option value={11}>Noviembre</option>
                <option value={12}>Diciembre</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Día</Form.Label>
              <Form.Control
                as="select"
                value={day}
                onChange={({ target }) => setDay(+target.value)}
              >
                {[...Array.from({ length: 31 }, (_, i) => i + 1)].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={save} disabled={!name}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
