import { useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export function DisplayButton({ value, presenting, onToggle }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault(); // evita que se abra la impresión
        onToggle((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  if (!presenting) {
    return null;
  }

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>ctrl + p</Tooltip>}>
      <Button
        className={value && presenting ? 'mb-4 pulse' : 'mb-4'}
        block
        size="lg"
        variant={value ? 'light' : 'secondary'}
        onClick={() => onToggle((prev) => !prev)}
        disabled={!presenting}
      >
        {value ? 'Proyectar' : 'Mostrar Logo'}
      </Button>
    </OverlayTrigger>
  );
}
