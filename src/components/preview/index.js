import React from 'react';
import { PreviewStyled } from './style';

export function Preview({ children, text, cite, neat = false, ...props }) {
  return (
    <PreviewStyled.Wrapper neat={neat}>
      <PreviewStyled.Main {...props}>
        <p dangerouslySetInnerHTML={{ __html: text }} />
        {cite ? <div>{cite}</div> : null}
      </PreviewStyled.Main>

      {neat ? null : (
        <PreviewStyled.Navigation>{children}</PreviewStyled.Navigation>
      )}
    </PreviewStyled.Wrapper>
  );
}
