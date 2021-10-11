import React from 'react';
import { AlertStyled } from './styled';

export function Alert({ presenting = false, label = '' }) {
  return (
    <AlertStyled presenting={presenting}>
      Proyectando <strong>{presenting ? label : 'Logo'}</strong>
    </AlertStyled>
  );
}
