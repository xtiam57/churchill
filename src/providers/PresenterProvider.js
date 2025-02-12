import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const PresenterContext = React.createContext({});

const PresenterProvider = ({ children }) => {
  const [presenting, setPresenting] = useState(false);
  const [monitors, setMonitors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [scale, setScale] = useState(1);

  const fetchMonitors = useCallback(async () => {
    const displays = await window.electronAPI.getDisplays();

    // Encontrar el tamaño total del espacio virtual de pantallas
    const minX = Math.min(...displays.map((d) => d.bounds.x));
    const minY = Math.min(...displays.map((d) => d.bounds.y));
    const maxX = Math.max(...displays.map((d) => d.bounds.x + d.bounds.width));
    const maxY = Math.max(...displays.map((d) => d.bounds.y + d.bounds.height));

    const virtualWidth = maxX - minX;
    const virtualHeight = maxY - minY;

    // Escalar para que quepa en un contenedor de 466x466
    const scaleFactor = Math.min(466 / virtualWidth, 466 / virtualHeight);
    setScale(scaleFactor);

    // Normalizar coordenadas para que empiecen desde (0,0)
    const normalizedDisplays = displays.map((display) => ({
      id: display.id,
      x: (display.bounds.x - minX) * scaleFactor,
      y: (display.bounds.y - minY) * scaleFactor,
      width: display.bounds.width * scaleFactor,
      height: display.bounds.height * scaleFactor,
      originalWidth: display.bounds.width,
      originalHeight: display.bounds.height,
    }));

    setMonitors(normalizedDisplays);
    console.log(displays, normalizedDisplays);
    setShowModal(true);
  }, []);

  const close = useCallback(async () => {
    const result = await window.electronAPI.closePresenter();
    setPresenting(result);
  }, []);

  const reload = useCallback(async () => {
    await window.electronAPI.reload();
    close();
  }, [close]);

  const toggle = useCallback(async (monitorId) => {
    const isPresenting = await window.electronAPI.togglePresenter(monitorId);
    setPresenting(isPresenting);
    setShowModal(false);
  }, []);

  return (
    <PresenterContext.Provider
      value={{ fetchMonitors, toggle, close, reload, presenting }}
    >
      {children}

      <Modal
        size="md"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Selecciona un monitor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="monitor-container">
            {monitors.map((monitor) => (
              <div
                key={monitor.id}
                className="monitor"
                style={{
                  width: monitor.width,
                  height: monitor.height,
                  left: monitor.x,
                  top: monitor.y,
                }}
                onClick={() => toggle(monitor.id)}
              >
                Monitor {monitor.id + 1}
                <small>
                  {monitor.originalWidth}x{monitor.originalHeight}
                </small>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </PresenterContext.Provider>
  );
};

export { PresenterContext, PresenterProvider };
