import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';

const PresenterContext = React.createContext({});

const PresenterProvider = ({ children }) => {
  const [presenting, setPresenting] = useState(false);
  const [monitors, setMonitors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const close = useCallback(async () => {
    const result = await window.electronAPI.closePresenter();
    setPresenting(result);
  }, []);

  const reload = useCallback(async () => {
    await window.electronAPI.reload();
    close();
  }, [close]);

  const toggle = useCallback(async () => {
    if (presenting) {
      return close();
    }

    const displays = await window.electronAPI.getDisplays();

    // Si no hay monitores extra, no hacer nada
    if (displays.length === 1) {
      console.warn('No hay monitores extra');
      return;
    }

    // Si solo hay un monitor extra, inicia directamente
    if (displays.length === 2) {
      const secondDisplay = displays.find(
        (d) => d.bounds.x !== 0 || d.bounds.y !== 0
      );
      const isPresenting = await window.electronAPI.togglePresenter(
        secondDisplay.id
      );
      setPresenting(isPresenting);
      return;
    }

    // Si hay más de un monitor, mostrar modal de selección
    const minX = Math.min(...displays.map((d) => d.bounds.x));
    const minY = Math.min(...displays.map((d) => d.bounds.y));
    const maxX = Math.max(...displays.map((d) => d.bounds.x + d.bounds.width));
    const maxY = Math.max(...displays.map((d) => d.bounds.y + d.bounds.height));

    const virtualWidth = maxX - minX;
    const virtualHeight = maxY - minY;

    const scaleFactor = Math.min(466 / virtualWidth, 150 / virtualHeight);

    const normalizedDisplays = displays.map((display) => ({
      isPrimary: display.bounds.x === 0 && display.bounds.y === 0,
      id: display.id,
      x: (display.bounds.x - minX) * scaleFactor,
      y: (display.bounds.y - minY) * scaleFactor,
      width: display.bounds.width * scaleFactor,
      height: display.bounds.height * scaleFactor,
      originalWidth: display.bounds.width,
      originalHeight: display.bounds.height,
    }));

    setMonitors(normalizedDisplays);
    setShowModal(true);
  }, [close, presenting]);

  const startPresentation = useCallback(async (monitorId) => {
    const isPresenting = await window.electronAPI.togglePresenter(monitorId);
    setPresenting(isPresenting);
    setShowModal(false);
  }, []);

  return (
    <PresenterContext.Provider value={{ toggle, close, reload, presenting }}>
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
                className={`monitor ${monitor.isPrimary ? 'primary' : ''}`}
                style={{
                  width: monitor.width,
                  height: monitor.height,
                  left: monitor.x,
                  top: monitor.y,
                }}
                onClick={() => startPresentation(monitor.id)}
              >
                <strong>Monitor {monitor.id + 1}</strong>
                <small>
                  {monitor.originalWidth}x{monitor.originalHeight}
                </small>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </PresenterContext.Provider>
  );
};

export { PresenterContext, PresenterProvider };
