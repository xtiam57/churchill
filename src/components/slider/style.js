import styled from 'styled-components';

const SlidePreviewStyled = styled.div`
  background-color: #fff;
  border-radius: 0.2rem;
  border: 1px solid #ced4da;
  bottom: 100px;
  /* box-shadow: 0px 0 10px 0 rgba(0, 0, 0, 0.15); */
  height: calc(768px * 0.18);
  overflow: hidden;
  position: absolute;
  right: 10px;
  width: calc(1024px * 0.18);
  z-index: 3;
  opacity: 0.75;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }

  section {
    width: 100%;
    height: 100%;
    padding: 0.5em;
  }

  p {
    font-size: 10px;
  }

  cite {
    font-size: 7px;
  }
`;

export { SlidePreviewStyled };
