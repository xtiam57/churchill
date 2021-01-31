import React from 'react';
import { WrapperStyled } from './style';

export function Wrapper({ children, ...props }) {
  return <WrapperStyled {...props}>{children}</WrapperStyled>;
}
