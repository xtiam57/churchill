import React from 'react';
import Controls from 'components/scripturesControls';
import { PreviewStyled } from './style';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

export function Preview({ children, cite, type = 'scriptures', ...props }) {
  return (
    <PreviewStyled.Wrapper>
      <PreviewStyled.Main {...props}>
        <p dangerouslySetInnerHTML={{ __html: children }} />
        {cite ? <div>{cite}</div> : null}
      </PreviewStyled.Main>

      <PreviewStyled.Navigation>
        <FaChevronCircleLeft />
        <FaChevronCircleRight />

        <Controls />
      </PreviewStyled.Navigation>
    </PreviewStyled.Wrapper>
  );
}
