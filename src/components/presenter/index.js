import React from 'react';
import { PresenterStyled } from './style';

export function Presenter({ children, cite, ...rest }) {
  return (
    <PresenterStyled {...rest}>
      <p
        className={cite ? '' : 'mb-0'}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      {cite ? <cite>{cite}</cite> : null}
    </PresenterStyled>
  );
}
