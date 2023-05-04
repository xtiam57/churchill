import { useCallback, useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';

const DEFAULT_ALERTS = [
  'Madre/padre de NOMBRE, presentarse en cuna.',
  'Madre/padre de NOMBRE, acercarse al audio.',
  'Dueño del carro CARACTERISTICA, acercarse a la entrada.',
  'Dueño del carro con placa PLACA, acercarse a la entrada.',
  'Hermano NOMBRE, acercarse a la parte de atrás del auditorio.',
  'Hermana NOMBRE, acercarse a la parte de atrás del auditorio.',
  'Recuerde llevar a su hij@ a su respectivo salón.',
];

export function AlertMessageModal({ show, handleClose, handleSave }) {
  const [message, setMessage] = useState('');
  const [validated] = useState(true);

  const save = useCallback(() => {
    handleSave({ message });
  }, [handleSave, message]);

  const close = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const fill = useCallback((message) => {
    setMessage(message);
  }, []);

  return (
    <Modal
      size="md"
      centered
      show={show}
      onHide={close}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Aviso en pantalla</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group mb-3">
          {DEFAULT_ALERTS.map((al, index) => (
            <a
              key={index}
              href=" "
              className="list-group-item list-group-item-action"
              onClick={(e) => {
                e.preventDefault();
                fill(al);
              }}
            >
              <small>{al}</small>
            </a>
          ))}
        </ul>

        <Form noValidate validated={validated}>
          <Form.Row>
            <Form.Group hasValidation as={Col}>
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="e.j. Madre del bebé Matías presentarse en cuna."
                value={message}
                onChange={({ target }) => setMessage(target.value)}
                required
                isInvalid
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={save} disabled={!message}>
          Mostrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
