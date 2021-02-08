import React from 'react';
import { PresenterStyled } from './style';

export function Presenter({ children, subtext = null, ...rest }) {
  return (
    <PresenterStyled {...rest}>
      <p
        className={subtext ? '' : 'mb-0'}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      {subtext ? <cite>{subtext}</cite> : null}
    </PresenterStyled>
  );
}
