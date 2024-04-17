import { Button } from 'react-bootstrap';

export function DisplayButton({ value, presenting, onToggle }) {
  if (!presenting) {
    return null;
  }

  return (
    <Button
      className={value && presenting ? 'mb-4 pulse' : 'mb-4'}
      block
      size="lg"
      variant={value ? 'light' : 'secondary'}
      onClick={() => onToggle((value) => !value)}
      disabled={!presenting}
    >
      {value ? 'Proyectar' : 'Mostrar Logo'}
    </Button>
  );
}
