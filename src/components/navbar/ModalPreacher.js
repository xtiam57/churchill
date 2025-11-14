import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PlayArrow, Restore, Stop } from '@mui/icons-material';
import createPersistedState from 'use-persisted-state';
import { CountdownStyled } from 'components/countdown/styled';
import { useCountdown } from 'hooks';
import { BROADCAST } from 'values';

// Separación de cada dato
const useMessagePreacher = createPersistedState(BROADCAST.PREACHER_MESSAGE);
const usePointsPreacher = createPersistedState(BROADCAST.PREACHER_POINTS);
const useTimePreacher = createPersistedState(BROADCAST.PREACHER_TIME);

export function ModalPreacher({ show, handleClose }) {
  // Estados persistentes
  const [messagep, setMessagep] = useMessagePreacher('');
  const [points, setPoints] = usePointsPreacher('');
  const [timePreacher, setTimePreacher] = useTimePreacher(45);

  // Estados locales independientes para cada form
  const [messageInput, setMessageInput] = useState('');
  const [pointsInput, setPointsInput] = useState('');
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);

  const [disabled, setDisabled] = useState(true);
  const { time, running, start, stop, message } = useCountdown(disabled);

  useEffect(() => {
    setTimePreacher(message);
  }, [message]);

  // Handlers independientes
  const handleMessageInputChange = (e) => setMessageInput(e.target.value);
  const handlePointsInputChange = (e) => setPointsInput(e.target.value);

  const handleSendMessage = () => setMessagep(messageInput);
  const handleSendPoints = () => setPoints(pointsInput);

  const handleMinutesChange = (e) => setMinutes(+e.target.value);
  const handleSecondsChange = (e) => setSeconds(+e.target.value);

  const handleStartTimer = () => {
    start(minutes, seconds + 1);
    setDisabled(false);
  };

  const handleStopTimer = () => {
    stop();
    setDisabled(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Información para el predicador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Mensaje</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                value={messageInput}
                onChange={handleMessageInputChange}
                placeholder="Escribe el mensaje"
              />
              <Button variant="primary" onClick={handleSendMessage}>
                Enviar
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Puntos importantes del pastor</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                as="textarea"
                rows={3}
                value={pointsInput}
                onChange={handlePointsInputChange}
                placeholder="Escribe los puntos importantes"
              />
              <Button variant="primary" onClick={handleSendPoints}>
                Enviar
              </Button>
            </div>
          </Form.Group>

          <CountdownStyled>
            {running && !disabled ? (
              <>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Temporizador</Tooltip>}
                >
                  <div className="display">
                    <Restore fontSize="small" />
                    <div className="text-light pl-1">{time}</div>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Detener</Tooltip>}
                >
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={handleStopTimer}
                    className="flat-left"
                  >
                    <Stop />
                  </Button>
                </OverlayTrigger>
              </>
            ) : (
              <>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Temporizador</Tooltip>}
                >
                  <div className="display time">
                    <Restore fontSize="small" />
                  </div>
                </OverlayTrigger>

                <Form.Control
                  type="number"
                  value={minutes}
                  onChange={handleMinutesChange}
                  min="0"
                  max="59"
                  className="flat-left flat-right text-center"
                />
                <div className="display small">min</div>

                <Form.Control
                  type="number"
                  value={seconds}
                  onChange={handleSecondsChange}
                  min="0"
                  max="59"
                  className="flat-left flat-right text-center"
                />
                <div className="display pl-0">seg</div>

                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Empezar</Tooltip>}
                >
                  <Button
                    size="sm"
                    variant="light"
                    className="flat-left"
                    disabled={
                      seconds > 59 ||
                      minutes > 59 ||
                      (seconds === 0 && minutes === 0) ||
                      seconds % 1 !== 0 ||
                      minutes % 1 !== 0
                    }
                    onClick={handleStartTimer}
                  >
                    <PlayArrow />
                  </Button>
                </OverlayTrigger>
              </>
            )}
          </CountdownStyled>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
