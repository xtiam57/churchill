import React from 'react';
import { Button } from 'react-bootstrap';

export function DisplayButton({ value, presenting, onToggle }) {
  return (
    <Button
      className={value && presenting ? 'mb-4 pulse' : 'mb-4'}
      block
      size="lg"
      variant={value ? 'secondary' : 'warning'}
      onClick={() => onToggle((value) => !value)}
      disabled={!presenting}
    >
      {value ? 'Proyectar' : 'Mostrar Logo'}
    </Button>
  );
}
