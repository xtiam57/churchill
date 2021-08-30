import React from 'react';
import { SpinnerStyled } from './styled';

export function Spinner() {
  return (
    <SpinnerStyled>
      <span class="left">
        <span class="anim"></span>
      </span>
      <span class="right">
        <span class="anim"></span>
      </span>
    </SpinnerStyled>
  );
}
