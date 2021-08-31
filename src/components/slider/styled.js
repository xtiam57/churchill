import styled from 'styled-components';

export const SummaryStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 10px;
  grid-auto-rows: 1;
`;

export const SlidePreviewStyled = styled.div`
  background-color: #fff;
  border-radius: 0.2rem;
  border: 1px solid #ced4da;
  bottom: 100px;
  /* box-shadow: 0px 0 10px 0 rgba(0, 0, 0, 0.15); */
  height: 138.234px;
  overflow: hidden;
  position: absolute;
  right: 10px;
  width: 184.312px;
  z-index: 1;
  opacity: 0.75;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }

  section {
    width: 100%;
    height: 100%;
    padding: 0.6em;
  }

  p {
    font-size: 11px !important;
  }

  cite {
    font-size: 7px !important;
  }

  transform: scale(1);
  transition: transform 0.2s ease 0s, opacity 0.2s ease 0s;

  &.hide {
    transform: scale(0.3);
    opacity: 0;
  }
`;
